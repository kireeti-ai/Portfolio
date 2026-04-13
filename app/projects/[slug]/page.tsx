import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPortfolioContent } from "@/lib/portfolio-content"
import { ProjectDetailContent } from "@/components/project-detail-content"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
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

  return <ProjectDetailContent project={project} />
}
