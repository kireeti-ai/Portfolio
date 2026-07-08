import "server-only"

import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import { projects } from "@/lib/projects"
import type { Project } from "@/lib/projects"
import type { AdminSkill, AdminTechnology, PortfolioContentData, ProfileContent } from "@/lib/portfolio-types"

export type PortfolioContent = PortfolioContentData

const defaultContent: PortfolioContent = {
  projects,
  skills: [
    {
      title: "Languages",
      description: "Java, Python, C/C++, JavaScript - Strong foundation in multiple programming paradigms.",
      bgColor: "bg-[#6366F1]",
    },
    {
      title: "Backend Frameworks",
      description: "Spring Boot, Node.js, Express.js, FastAPI - Building scalable and secure REST APIs.",
      bgColor: "bg-[#2F81F7]",
    },
    {
      title: "Frontend",
      description: "React.js - Creating responsive and interactive user interfaces with modern patterns.",
      bgColor: "bg-[#FF6B7A]",
    },
    {
      title: "Databases",
      description: "MySQL, MongoDB (NoSQL), PostgreSQL - Relational and document-based data management.",
      bgColor: "bg-[#10B981]",
    },
    {
      title: "Cloud & DevOps",
      description: "AWS, Azure (ACA, ACR, Blob Storage), Git, GitHub - Cloud deployment and version control.",
      bgColor: "bg-[#F59E0B]",
    },
    {
      title: "ML & AI",
      description: "Pandas, NumPy, Scikit-learn, YOLOv8 - Machine learning and computer vision applications.",
      bgColor: "bg-[#8B5CF6]",
    },
  ],
  technologies: [
    { name: "Java", color: "bg-[#E76F00]" },
    { name: "Python", color: "bg-[#3776AB]" },
    { name: "React", color: "bg-[#61DAFB]" },
    { name: "Node.js", color: "bg-[#339933]" },
    { name: "Spring Boot", color: "bg-[#6DB33F]" },
    { name: "FastAPI", color: "bg-[#009688]" },
    { name: "MongoDB", color: "bg-[#47A248]" },
    { name: "MySQL", color: "bg-[#4479A1]" },
    { name: "AWS", color: "bg-[#FF9900]" },
    { name: "Azure", color: "bg-[#0078D4]" },
    { name: "Docker", color: "bg-[#2496ED]" },
    { name: "Git", color: "bg-[#F05032]" },
  ],
  profile: {
    name: "Kireeti",
    roleBadge: "Backend Engineer · Open to opportunities",
    heroIntro: "I'm",
    heroHighlight: "Kireeti",
    heroSubheadline: "I design scalable APIs and reliable backend systems with clean architecture and performance in mind.",
    heroDescription:
      "Pre-final year B.Tech Computer Science student with hands-on experience in building software products and strong fundamentals in Data Structures & Algorithms, DBMS, Operating Systems, and Computer Networks.",
    heroSkills: ["Node.js", "Java", "PostgreSQL", "AWS"],
    aboutDescription:
      "Pre-final year B.Tech Computer Science student at Amrita Vishwa Vidyapeetham with hands-on experience in software development. Experienced in working with relational and NoSQL database systems and cloud platforms, with an interest in developing scalable, secure, and high-performance software applications.",
    educationTitle: "B.Tech in Computer Science",
    educationDescription: "Amrita Vishwa Vidyapeetham, Coimbatore | Aug 2023 - Present | CGPA: 7.18/10.0",
    certificationsTitle: "Certifications",
    certificationsDescription:
      "Introduction to Deep Learning (Kaggle) | Hands-On Data Warehousing Workshop (Snowflake)",
    opportunitiesText: "Currently looking for internship opportunities in software development and backend engineering roles.",
    footerBio: "Pre-final year B.Tech Computer Science student passionate about building scalable software applications.",
    email: "kireetiv2005@gmail.com",
    phone: "+91-9392509139",
    location: "Coimbatore, India",
    githubUrl: "https://github.com/kireeti-ai",
    linkedinUrl: "https://linkedin.com/in/kireeti-v",
    resumeUrl: "/kireeti_resume.pdf",
  },
}

const contentFilePath = path.join(process.cwd(), "data", "portfolio-content.json")

const validStatuses = new Set<Project["status"]>(["In Progress", "Completed"])
const validIconKeys = new Set<Project["iconKey"]>(["brain", "eye", "zap", "utensils", "chart"])

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isNonEmptyString)
}

function isSkill(value: unknown): value is AdminSkill {
  return (
    isRecord(value) &&
    isNonEmptyString(value.title) &&
    isNonEmptyString(value.description) &&
    isNonEmptyString(value.bgColor)
  )
}

function isTechnology(value: unknown): value is AdminTechnology {
  return isRecord(value) && isNonEmptyString(value.name) && isNonEmptyString(value.color)
}

function isProfile(value: unknown): value is ProfileContent {
  return (
    isRecord(value) &&
    isNonEmptyString(value.name) &&
    isNonEmptyString(value.roleBadge) &&
    isNonEmptyString(value.heroIntro) &&
    isNonEmptyString(value.heroHighlight) &&
    isNonEmptyString(value.heroSubheadline) &&
    isNonEmptyString(value.heroDescription) &&
    isStringArray(value.heroSkills) &&
    isNonEmptyString(value.aboutDescription) &&
    isNonEmptyString(value.educationTitle) &&
    isNonEmptyString(value.educationDescription) &&
    isNonEmptyString(value.certificationsTitle) &&
    isNonEmptyString(value.certificationsDescription) &&
    isNonEmptyString(value.opportunitiesText) &&
    isNonEmptyString(value.footerBio) &&
    isNonEmptyString(value.email) &&
    isNonEmptyString(value.phone) &&
    isNonEmptyString(value.location) &&
    isNonEmptyString(value.githubUrl) &&
    isNonEmptyString(value.linkedinUrl) &&
    isNonEmptyString(value.resumeUrl)
  )
}

function isProject(value: unknown): value is Project {
  return (
    isRecord(value) &&
    isNonEmptyString(value.slug) &&
    isNonEmptyString(value.title) &&
    isNonEmptyString(value.summary) &&
    isNonEmptyString(value.description) &&
    isNonEmptyString(value.role) &&
    isNonEmptyString(value.projectType) &&
    isNonEmptyString(value.timeline) &&
    isNonEmptyString(value.focus) &&
    isNonEmptyString(value.problem) &&
    isStringArray(value.goals) &&
    isStringArray(value.ownership) &&
    isStringArray(value.constraints) &&
    isStringArray(value.architecture) &&
    isStringArray(value.qualitySignals) &&
    isStringArray(value.impact) &&
    isStringArray(value.challenges) &&
    isStringArray(value.nextSteps) &&
    isStringArray(value.tags) &&
    isNonEmptyString(value.date) &&
    typeof value.status === "string" &&
    validStatuses.has(value.status as Project["status"]) &&
    isNonEmptyString(value.bgColor) &&
    typeof value.iconKey === "string" &&
    validIconKeys.has(value.iconKey as Project["iconKey"]) &&
    isNonEmptyString(value.coverImage) &&
    isNonEmptyString(value.github)
  )
}

function isCurrentContent(value: unknown): value is PortfolioContent {
  return (
    isRecord(value) &&
    Array.isArray(value.projects) &&
    value.projects.length > 0 &&
    value.projects.every(isProject) &&
    Array.isArray(value.skills) &&
    value.skills.length > 0 &&
    value.skills.every(isSkill) &&
    Array.isArray(value.technologies) &&
    value.technologies.length > 0 &&
    value.technologies.every(isTechnology) &&
    isProfile(value.profile)
  )
}

function isLegacyContent(value: unknown): value is Omit<PortfolioContent, "profile"> {
  return (
    isRecord(value) &&
    Array.isArray(value.projects) &&
    value.projects.length > 0 &&
    value.projects.every(isProject) &&
    Array.isArray(value.skills) &&
    value.skills.length > 0 &&
    value.skills.every(isSkill) &&
    Array.isArray(value.technologies) &&
    value.technologies.length > 0 &&
    value.technologies.every(isTechnology)
  )
}

function assertCurrentContent(value: unknown): PortfolioContent {
  if (!isCurrentContent(value)) {
    throw new Error("Content failed validation.")
  }
  return value
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const raw = await readFile(contentFilePath, "utf-8")
    const parsed = JSON.parse(raw)
    if (isCurrentContent(parsed)) {
      return parsed
    }
    if (isLegacyContent(parsed)) {
      return { ...parsed, profile: defaultContent.profile }
    }
    return defaultContent
  } catch {
    return defaultContent
  }
}

export async function savePortfolioContent(input: unknown): Promise<PortfolioContent> {
  const parsed = assertCurrentContent(input)
  await mkdir(path.dirname(contentFilePath), { recursive: true })
  await writeFile(contentFilePath, JSON.stringify(parsed, null, 2), "utf-8")
  return parsed
}

