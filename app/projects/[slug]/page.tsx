import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Github, Briefcase, Layers3, Target, CheckCircle2 } from "lucide-react"
import { getPortfolioContent } from "@/lib/portfolio-content"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

interface SectionListProps {
  title: string
  items: string[]
  iconColorClass: string
}

function SectionList({ title, items, iconColorClass }: SectionListProps) {
  return (
    <section>
      <h3 className="mb-4 text-2xl font-bold text-[#0B0B0B]">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 border-b border-black/10 pb-4">
            <CheckCircle2 className={`mt-1 h-4 w-4 flex-shrink-0 ${iconColorClass}`} />
            <p className="text-sm font-medium leading-7 text-[#393939] md:text-base">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const content = await getPortfolioContent()
  const project = content.projects.find((item) => item.slug === params.slug)

  if (!project) {
    return {
      title: "Project not found",
    }
  }

  return {
    title: `${project.title} | Kireeti`,
    description: project.summary,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const content = await getPortfolioContent()
  const project = content.projects.find((item) => item.slug === params.slug)

  if (!project) {
    notFound()
  }

  const snapshot = [
    { label: "Status", value: project.status, icon: CheckCircle2 },
    { label: "Role", value: project.role, icon: Briefcase },
    { label: "Project Type", value: project.projectType, icon: Layers3 },
    { label: "Timeline", value: project.timeline, icon: Calendar },
    { label: "Primary Focus", value: project.focus, icon: Target },
  ]

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      <header className={`${project.bgColor} relative overflow-hidden text-white`}>
        <div className="absolute inset-0 bg-black/15" />
        <div className="relative container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <Link
            href="/#projects"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/95 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
          </Link>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/60 px-3 py-1 text-xs font-bold">
            <Calendar className="h-4 w-4" />
            {project.date}
          </div>

          <h1 className="max-w-5xl text-3xl font-black leading-tight md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-4xl text-base font-medium leading-relaxed text-white/95 md:text-xl">{project.summary}</p>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/35 bg-black/20">
            <Image
              src={project.coverImage}
              alt={`${project.title} visual`}
              width={1200}
              height={720}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/70 px-3 py-1 text-xs font-semibold text-white">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#161616] md:text-base"
            >
              <Github className="h-5 w-5" />
              View repository on GitHub
            </a>
          </div>
        </div>
      </header>

      <section className="border-y border-black/10 bg-white">
        <div className="container mx-auto grid max-w-6xl gap-7 px-4 py-8 md:grid-cols-2 lg:grid-cols-4">
          {snapshot.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label}>
                <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]">
                  <Icon className="h-4 w-4 text-[#0B0B0B]" />
                  {item.label}
                </div>
                <p className="text-sm font-semibold leading-6 text-[#111827] md:text-base">{item.value}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-[#FFFFFF]">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-3xl font-bold text-[#0B0B0B] md:text-4xl">Project Context</h2>
          <div className="mt-6 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-[#0B0B0B]">Problem</h3>
              <p className="text-base font-medium leading-8 text-[#393939]">{project.problem}</p>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-bold text-[#0B0B0B]">Approach</h3>
              <p className="text-base font-medium leading-8 text-[#393939]">{project.description}</p>
            </div>
          </div>
          <div className="mt-10">
            <SectionList title="Project Goals" items={project.goals} iconColorClass="text-[#2F81F7]" />
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC]">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-3xl font-bold text-[#0B0B0B] md:text-4xl">Execution Details</h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <SectionList title="My Ownership" items={project.ownership} iconColorClass="text-[#2F81F7]" />
            <SectionList title="Architecture & System Design" items={project.architecture} iconColorClass="text-[#2F81F7]" />
          </div>
          <div className="mt-12 grid gap-12 lg:grid-cols-2">
            <SectionList title="Constraints I Worked Through" items={project.constraints} iconColorClass="text-[#FF6B7A]" />
            <SectionList title="Reliability & Quality Signals" items={project.qualitySignals} iconColorClass="text-[#10B981]" />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF]">
        <div className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <h2 className="text-3xl font-bold text-[#0B0B0B] md:text-4xl">Outcomes</h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <SectionList title="Impact" items={project.impact} iconColorClass="text-[#10B981]" />
            <SectionList title="Hard Problems Solved" items={project.challenges} iconColorClass="text-[#FF6B7A]" />
          </div>
          <div className="mt-12">
            <SectionList title="If I Continue This Project" items={project.nextSteps} iconColorClass="text-[#6366F1]" />
          </div>
        </div>
      </section>
    </main>
  )
}
