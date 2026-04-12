import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Calendar, Github, Briefcase, Layers3, Target, CheckCircle2 } from "lucide-react"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { BackToProjectsLink } from "@/components/back-to-projects-link"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

interface SectionListProps {
  title: string
  items: string[]
  iconColorClass: string
}

function SectionList({ title, items, iconColorClass }: SectionListProps) {
  return (
    <section className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      <h3 className="mb-5 text-2xl font-bold text-[#0B0B0B]">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-xl border border-black/10 bg-[#F8FAFC] p-4">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${iconColorClass}`} />
            <p className="text-sm font-medium leading-7 text-[#393939] md:text-base">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const content = await getPortfolioContent()
  const project = content.projects.find((item) => item.slug === slug)

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
  const { slug } = await params
  const content = await getPortfolioContent()
  const project = content.projects.find((item) => item.slug === slug)

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
      <header className="relative overflow-hidden border-b border-black/10 bg-[#FFFFFF] text-[#0B0B0B]">
        <div className="relative container mx-auto max-w-6xl px-4 py-12 md:py-16">
          <BackToProjectsLink />

          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-[#F8FAFC] px-3 py-1 text-xs font-bold text-[#393939]">
              <Calendar className="h-4 w-4" />
              {project.date}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-[#F8FAFC] px-3 py-1 text-xs font-bold text-[#393939]">
              <CheckCircle2 className="h-4 w-4" />
              {project.status}
            </span>
            <span className={`${project.bgColor} inline-flex rounded-full border border-black/20 px-3 py-1 text-xs font-bold text-white`}>
              {project.projectType}
            </span>
          </div>

          <h1 className="max-w-5xl text-3xl font-black leading-tight md:text-6xl">{project.title}</h1>
          <p className="mt-5 max-w-4xl text-base font-medium leading-relaxed text-[#393939] md:text-xl">{project.summary}</p>

          <div className="mt-8 overflow-hidden rounded-3xl border-[3px] border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
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
              <span key={tag} className="rounded-full border border-black/20 bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-[#111827]">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#161616] md:text-base"
            >
              <Github className="h-5 w-5" />
              View repository on GitHub
            </a>
          </div>
        </div>
      </header>

      <section className="bg-[#FFFFFF]">
        <div className="container mx-auto -mt-10 max-w-6xl px-4 pb-4 md:-mt-12">
          <div className="grid gap-4 rounded-3xl border-[3px] border-black bg-white p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:grid-cols-2 lg:grid-cols-5 md:p-6">
            {snapshot.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="rounded-xl border-2 border-black/10 bg-[#F8FAFC] p-4">
                  <div className="mb-2 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#6B7280]">
                    <Icon className="h-4 w-4 text-[#0B0B0B]" />
                    {item.label}
                  </div>
                  <p className="text-sm font-semibold leading-6 text-[#111827] md:text-base">{item.value}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] pb-4">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
          <h2 className="text-3xl font-bold text-[#0B0B0B] md:text-4xl">Project Context</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
              <h3 className="mb-4 text-2xl font-bold text-[#0B0B0B]">Problem</h3>
              <p className="text-base font-medium leading-8 text-[#393939]">{project.problem}</p>
            </div>
            <div className="rounded-3xl border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
              <h3 className="mb-4 text-2xl font-bold text-[#0B0B0B]">Approach</h3>
              <p className="text-base font-medium leading-8 text-[#393939]">{project.description}</p>
            </div>
          </div>
          <div className="mt-8">
            <SectionList title="Project Goals" items={project.goals} iconColorClass="text-[#2F81F7]" />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] pb-4">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
          <h2 className="text-3xl font-bold text-[#0B0B0B] md:text-4xl">Execution Details</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <SectionList title="My Ownership" items={project.ownership} iconColorClass="text-[#2F81F7]" />
            <SectionList title="Architecture & System Design" items={project.architecture} iconColorClass="text-[#2F81F7]" />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <SectionList title="Constraints I Worked Through" items={project.constraints} iconColorClass="text-[#FF6B7A]" />
            <SectionList title="Reliability & Quality Signals" items={project.qualitySignals} iconColorClass="text-[#10B981]" />
          </div>
        </div>
      </section>

      <section className="bg-[#FFFFFF] pb-16">
        <div className="container mx-auto max-w-6xl px-4 py-10 md:py-12">
          <h2 className="text-3xl font-bold text-[#0B0B0B] md:text-4xl">Outcomes</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <SectionList title="Impact" items={project.impact} iconColorClass="text-[#10B981]" />
            <SectionList title="Hard Problems Solved" items={project.challenges} iconColorClass="text-[#FF6B7A]" />
          </div>
          <div className="mt-8">
            <SectionList title="If I Continue This Project" items={project.nextSteps} iconColorClass="text-[#6366F1]" />
          </div>
        </div>
      </section>
    </main>
  )
}
