"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import type { Project } from "@/lib/projects"
import type { AdminSkill, AdminTechnology, PortfolioContentData } from "@/lib/portfolio-types"

interface AdminPanelProps {
  initialContent: PortfolioContentData
}

const listFields: Array<keyof Pick<
  Project,
  "goals" | "ownership" | "constraints" | "architecture" | "qualitySignals" | "impact" | "challenges" | "nextSteps"
>> = ["goals", "ownership", "constraints", "architecture", "qualitySignals", "impact", "challenges", "nextSteps"]

const iconKeyChoices: Project["iconKey"][] = ["brain", "eye", "zap", "utensils", "chart"]
const statusChoices: Project["status"][] = ["In Progress", "Completed"]

function parseCommaSeparated(input: string) {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function parseMultiline(input: string) {
  return input
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

function serializeMultiline(items: string[]) {
  return items.join("\n")
}

function createEmptyProject(index: number): Project {
  return {
    slug: `new-project-${index + 1}`,
    title: "New Project",
    summary: "Short summary of the project.",
    description: "Detailed description of the project.",
    role: "Contributor",
    projectType: "Portfolio Project",
    timeline: "2026",
    focus: "Project focus",
    problem: "Problem statement",
    goals: [],
    ownership: [],
    constraints: [],
    architecture: [],
    qualitySignals: [],
    impact: [],
    challenges: [],
    nextSteps: [],
    tags: [],
    date: "2026",
    status: "In Progress",
    bgColor: "bg-[#6366F1]",
    iconKey: "brain",
    coverImage: "/images/projects/new-project.svg",
    github: "https://github.com/your-repo",
  }
}

export function AdminPanel({ initialContent }: AdminPanelProps) {
  const router = useRouter()
  const [content, setContent] = useState<PortfolioContentData>(initialContent)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0)
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0)
  const [newTechnology, setNewTechnology] = useState("")
  const [newTechnologyColor, setNewTechnologyColor] = useState("bg-[#000000]")
  const [statusMessage, setStatusMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [saving, setSaving] = useState(false)

  const selectedProject = content.projects[selectedProjectIndex]
  const selectedSkill = content.skills[selectedSkillIndex]

  const projectCountLabel = useMemo(() => `${content.projects.length} project(s)`, [content.projects.length])

  function updateProject(updater: (project: Project) => Project) {
    setContent((previous) => {
      const nextProjects = [...previous.projects]
      nextProjects[selectedProjectIndex] = updater(nextProjects[selectedProjectIndex])
      return { ...previous, projects: nextProjects }
    })
  }

  function updateSkill(updater: (skill: AdminSkill) => AdminSkill) {
    setContent((previous) => {
      const nextSkills = [...previous.skills]
      nextSkills[selectedSkillIndex] = updater(nextSkills[selectedSkillIndex])
      return { ...previous, skills: nextSkills }
    })
  }

  async function saveContent() {
    setSaving(true)
    setStatusMessage("")
    setErrorMessage("")

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      })

      const data = (await response.json().catch(() => null)) as PortfolioContentData & { error?: string }
      if (!response.ok) {
        setErrorMessage(data?.error ?? "Failed to save content.")
        return
      }

      setContent(data)
      setStatusMessage("Changes saved.")
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-black bg-white p-5">
          <div>
            <h1 className="text-2xl font-bold text-[#0B0B0B]">Portfolio Admin</h1>
            <p className="text-sm font-medium text-[#393939]">Update projects, technical skills, and tech marquee content.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={saveContent}
              disabled={saving}
              className="rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-[#1F1F1F] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
            <button
              onClick={logout}
              className="rounded-md border-2 border-black px-4 py-2 text-sm font-semibold text-[#0B0B0B]"
            >
              Logout
            </button>
          </div>
        </div>

        {statusMessage ? <p className="text-sm font-semibold text-[#166534]">{statusMessage}</p> : null}
        {errorMessage ? <p className="text-sm font-semibold text-[#B91C1C]">{errorMessage}</p> : null}

        <section className="rounded-2xl border-2 border-black bg-white p-5">
          <h2 className="mb-4 text-xl font-bold text-[#0B0B0B]">Profile & Contact</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="text-sm font-semibold">
              Name
              <input
                value={content.profile.name}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, name: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Role badge
              <input
                value={content.profile.roleBadge}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, roleBadge: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Hero intro
              <input
                value={content.profile.heroIntro}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, heroIntro: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Hero highlight
              <input
                value={content.profile.heroHighlight}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, heroHighlight: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold md:col-span-2">
              Hero subheadline
              <textarea
                value={content.profile.heroSubheadline}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, heroSubheadline: event.target.value } }))
                }
                className="mt-1 min-h-20 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold md:col-span-2">
              Hero description
              <textarea
                value={content.profile.heroDescription}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, heroDescription: event.target.value } }))
                }
                className="mt-1 min-h-20 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold md:col-span-2">
              Hero skills (comma-separated)
              <input
                value={content.profile.heroSkills.join(", ")}
                onChange={(event) =>
                  setContent((previous) => ({
                    ...previous,
                    profile: { ...previous.profile, heroSkills: parseCommaSeparated(event.target.value) },
                  }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold md:col-span-2">
              About description
              <textarea
                value={content.profile.aboutDescription}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, aboutDescription: event.target.value } }))
                }
                className="mt-1 min-h-20 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Education title
              <input
                value={content.profile.educationTitle}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, educationTitle: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Education description
              <input
                value={content.profile.educationDescription}
                onChange={(event) =>
                  setContent((previous) => ({
                    ...previous,
                    profile: { ...previous.profile, educationDescription: event.target.value },
                  }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Certifications title
              <input
                value={content.profile.certificationsTitle}
                onChange={(event) =>
                  setContent((previous) => ({
                    ...previous,
                    profile: { ...previous.profile, certificationsTitle: event.target.value },
                  }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Certifications description
              <input
                value={content.profile.certificationsDescription}
                onChange={(event) =>
                  setContent((previous) => ({
                    ...previous,
                    profile: { ...previous.profile, certificationsDescription: event.target.value },
                  }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold md:col-span-2">
              Opportunities text
              <textarea
                value={content.profile.opportunitiesText}
                onChange={(event) =>
                  setContent((previous) => ({
                    ...previous,
                    profile: { ...previous.profile, opportunitiesText: event.target.value },
                  }))
                }
                className="mt-1 min-h-20 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold md:col-span-2">
              Footer bio
              <textarea
                value={content.profile.footerBio}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, footerBio: event.target.value } }))
                }
                className="mt-1 min-h-20 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Email
              <input
                value={content.profile.email}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, email: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Phone
              <input
                value={content.profile.phone}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, phone: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Location
              <input
                value={content.profile.location}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, location: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              GitHub URL
              <input
                value={content.profile.githubUrl}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, githubUrl: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              LinkedIn URL
              <input
                value={content.profile.linkedinUrl}
                onChange={(event) =>
                  setContent((previous) => ({
                    ...previous,
                    profile: { ...previous.profile, linkedinUrl: event.target.value },
                  }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
            <label className="text-sm font-semibold">
              Resume URL
              <input
                value={content.profile.resumeUrl}
                onChange={(event) =>
                  setContent((previous) => ({ ...previous, profile: { ...previous.profile, resumeUrl: event.target.value } }))
                }
                className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
              />
            </label>
          </div>
        </section>

        <section className="rounded-2xl border-2 border-black bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0B0B0B]">Projects</h2>
            <span className="text-sm font-semibold text-[#393939]">{projectCountLabel}</span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            {content.projects.map((project, index) => (
              <button
                key={`${project.slug}-${index}`}
                onClick={() => setSelectedProjectIndex(index)}
                className={`rounded-md border-2 px-3 py-1 text-xs font-semibold ${index === selectedProjectIndex ? "border-black bg-black text-white" : "border-black/30 bg-white text-[#0B0B0B]"
                  }`}
              >
                {project.title || `Project ${index + 1}`}
              </button>
            ))}
          </div>

          <div className="mb-4 flex gap-2">
            <button
              onClick={() => {
                const nextIndex = content.projects.length
                setContent((previous) => ({ ...previous, projects: [...previous.projects, createEmptyProject(nextIndex)] }))
                setSelectedProjectIndex(nextIndex)
              }}
              className="rounded-md bg-[#111827] px-3 py-2 text-xs font-semibold text-white"
            >
              Add Project
            </button>
            {content.projects.length > 1 ? (
              <button
                onClick={() => {
                  setContent((previous) => {
                    const nextProjects = previous.projects.filter((_, index) => index !== selectedProjectIndex)
                    return { ...previous, projects: nextProjects }
                  })
                  setSelectedProjectIndex((previous) => Math.max(0, previous - 1))
                }}
                className="rounded-md border-2 border-[#B91C1C] px-3 py-2 text-xs font-semibold text-[#B91C1C]"
              >
                Delete selected
              </button>
            ) : null}
          </div>

          {selectedProject ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm font-semibold">
                Slug
                <input
                  value={selectedProject.slug}
                  onChange={(event) => updateProject((project) => ({ ...project, slug: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Title
                <input
                  value={selectedProject.title}
                  onChange={(event) => updateProject((project) => ({ ...project, title: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                Summary
                <textarea
                  value={selectedProject.summary}
                  onChange={(event) => updateProject((project) => ({ ...project, summary: event.target.value }))}
                  className="mt-1 min-h-20 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                Description
                <textarea
                  value={selectedProject.description}
                  onChange={(event) => updateProject((project) => ({ ...project, description: event.target.value }))}
                  className="mt-1 min-h-24 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Date label
                <input
                  value={selectedProject.date}
                  onChange={(event) => updateProject((project) => ({ ...project, date: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Timeline
                <input
                  value={selectedProject.timeline}
                  onChange={(event) => updateProject((project) => ({ ...project, timeline: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Status
                <select
                  value={selectedProject.status}
                  onChange={(event) =>
                    updateProject((project) => ({
                      ...project,
                      status: event.target.value as Project["status"],
                    }))
                  }
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                >
                  {statusChoices.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold">
                Icon key
                <select
                  value={selectedProject.iconKey}
                  onChange={(event) =>
                    updateProject((project) => ({
                      ...project,
                      iconKey: event.target.value as Project["iconKey"],
                    }))
                  }
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                >
                  {iconKeyChoices.map((choice) => (
                    <option key={choice} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold">
                Role
                <input
                  value={selectedProject.role}
                  onChange={(event) => updateProject((project) => ({ ...project, role: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Project Type
                <input
                  value={selectedProject.projectType}
                  onChange={(event) => updateProject((project) => ({ ...project, projectType: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                Focus
                <input
                  value={selectedProject.focus}
                  onChange={(event) => updateProject((project) => ({ ...project, focus: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                Problem
                <textarea
                  value={selectedProject.problem}
                  onChange={(event) => updateProject((project) => ({ ...project, problem: event.target.value }))}
                  className="mt-1 min-h-24 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                Cover image path
                <input
                  value={selectedProject.coverImage}
                  onChange={(event) => updateProject((project) => ({ ...project, coverImage: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                GitHub URL
                <input
                  value={selectedProject.github}
                  onChange={(event) => updateProject((project) => ({ ...project, github: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Card color class
                <input
                  value={selectedProject.bgColor}
                  onChange={(event) => updateProject((project) => ({ ...project, bgColor: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Tags (comma-separated)
                <input
                  value={selectedProject.tags.join(", ")}
                  onChange={(event) => updateProject((project) => ({ ...project, tags: parseCommaSeparated(event.target.value) }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>

              {listFields.map((field) => (
                <label key={field} className="text-sm font-semibold md:col-span-2">
                  {field}
                  <textarea
                    value={serializeMultiline(selectedProject[field])}
                    onChange={(event) =>
                      updateProject((project) => ({
                        ...project,
                        [field]: parseMultiline(event.target.value),
                      }))
                    }
                    className="mt-1 min-h-24 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                  />
                </label>
              ))}
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border-2 border-black bg-white p-5">
          <h2 className="mb-4 text-xl font-bold text-[#0B0B0B]">Technical Skills Cards</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {content.skills.map((skill, index) => (
              <button
                key={`${skill.title}-${index}`}
                onClick={() => setSelectedSkillIndex(index)}
                className={`rounded-md border-2 px-3 py-1 text-xs font-semibold ${index === selectedSkillIndex ? "border-black bg-black text-white" : "border-black/30 bg-white text-[#0B0B0B]"
                  }`}
              >
                {skill.title || `Skill ${index + 1}`}
              </button>
            ))}
          </div>
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => {
                const nextIndex = content.skills.length
                setContent((previous) => ({
                  ...previous,
                  skills: [
                    ...previous.skills,
                    {
                      title: "New Skill",
                      description: "Describe the skill here.",
                      bgColor: "bg-[#6366F1]",
                    },
                  ],
                }))
                setSelectedSkillIndex(nextIndex)
              }}
              className="rounded-md bg-[#111827] px-3 py-2 text-xs font-semibold text-white"
            >
              Add Skill Card
            </button>
            {content.skills.length > 1 ? (
              <button
                onClick={() => {
                  setContent((previous) => ({
                    ...previous,
                    skills: previous.skills.filter((_, index) => index !== selectedSkillIndex),
                  }))
                  setSelectedSkillIndex((previous) => Math.max(0, previous - 1))
                }}
                className="rounded-md border-2 border-[#B91C1C] px-3 py-2 text-xs font-semibold text-[#B91C1C]"
              >
                Delete selected
              </button>
            ) : null}
          </div>

          {selectedSkill ? (
            <div className="grid gap-3 md:grid-cols-2">
              <label className="text-sm font-semibold">
                Title
                <input
                  value={selectedSkill.title}
                  onChange={(event) => updateSkill((skill) => ({ ...skill, title: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold">
                Background class
                <input
                  value={selectedSkill.bgColor}
                  onChange={(event) => updateSkill((skill) => ({ ...skill, bgColor: event.target.value }))}
                  className="mt-1 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
              <label className="text-sm font-semibold md:col-span-2">
                Description
                <textarea
                  value={selectedSkill.description}
                  onChange={(event) => updateSkill((skill) => ({ ...skill, description: event.target.value }))}
                  className="mt-1 min-h-20 w-full rounded-md border-2 border-black px-3 py-2 text-sm"
                />
              </label>
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border-2 border-black bg-white p-5">
          <h2 className="mb-4 text-xl font-bold text-[#0B0B0B]">Tech Marquee</h2>
          <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <input
              value={newTechnology}
              onChange={(event) => setNewTechnology(event.target.value)}
              placeholder="Technology name"
              className="rounded-md border-2 border-black px-3 py-2 text-sm"
            />
            <input
              value={newTechnologyColor}
              onChange={(event) => setNewTechnologyColor(event.target.value)}
              placeholder="Color class (e.g. bg-[#4479A1])"
              className="rounded-md border-2 border-black px-3 py-2 text-sm"
            />
            <button
              onClick={() => {
                if (!newTechnology.trim()) {
                  return
                }

                const item: AdminTechnology = { name: newTechnology.trim(), color: newTechnologyColor.trim() || "bg-[#000000]" }
                setContent((previous) => ({ ...previous, technologies: [...previous.technologies, item] }))
                setNewTechnology("")
              }}
              className="rounded-md bg-[#111827] px-3 py-2 text-xs font-semibold text-white"
            >
              Add
            </button>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {content.technologies.map((item, index) => (
              <div key={`${item.name}-${index}`} className="flex items-center justify-between rounded-md border-2 border-black/20 p-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-block h-3 w-3 rounded-full ${item.color}`} />
                  <span className="text-sm font-semibold text-[#0B0B0B]">{item.name}</span>
                </div>
                <button
                  onClick={() =>
                    setContent((previous) => ({
                      ...previous,
                      technologies: previous.technologies.filter((_, itemIndex) => itemIndex !== index),
                    }))
                  }
                  className="rounded border border-[#B91C1C] px-2 py-1 text-xs font-semibold text-[#B91C1C]"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
