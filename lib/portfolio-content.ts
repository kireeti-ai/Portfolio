import "server-only"

import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import { z } from "zod"
import { projects } from "@/lib/projects"
import type { PortfolioContentData } from "@/lib/portfolio-types"

const skillSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  bgColor: z.string().min(1),
})

const technologySchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
})

const profileSchema = z.object({
  name: z.string().min(1),
  roleBadge: z.string().min(1),
  heroIntro: z.string().min(1),
  heroHighlight: z.string().min(1),
  heroSubheadline: z.string().min(1),
  heroDescription: z.string().min(1),
  heroSkills: z.array(z.string().min(1)),
  aboutDescription: z.string().min(1),
  educationTitle: z.string().min(1),
  educationDescription: z.string().min(1),
  certificationsTitle: z.string().min(1),
  certificationsDescription: z.string().min(1),
  opportunitiesText: z.string().min(1),
  footerBio: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  location: z.string().min(1),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  resumeUrl: z.string().min(1),
})

const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  role: z.string().min(1),
  projectType: z.string().min(1),
  timeline: z.string().min(1),
  focus: z.string().min(1),
  problem: z.string().min(1),
  goals: z.array(z.string().min(1)),
  ownership: z.array(z.string().min(1)),
  constraints: z.array(z.string().min(1)),
  architecture: z.array(z.string().min(1)),
  qualitySignals: z.array(z.string().min(1)),
  impact: z.array(z.string().min(1)),
  challenges: z.array(z.string().min(1)),
  nextSteps: z.array(z.string().min(1)),
  tags: z.array(z.string().min(1)),
  date: z.string().min(1),
  status: z.enum(["In Progress", "Completed"]),
  bgColor: z.string().min(1),
  iconKey: z.enum(["brain", "eye", "zap", "utensils", "chart"]),
  coverImage: z.string().min(1),
  github: z.string().url(),
})

export const portfolioContentSchema = z.object({
  projects: z.array(projectSchema).min(1),
  skills: z.array(skillSchema).min(1),
  technologies: z.array(technologySchema).min(1),
  profile: profileSchema,
})

const legacyPortfolioContentSchema = z.object({
  projects: z.array(projectSchema).min(1),
  skills: z.array(skillSchema).min(1),
  technologies: z.array(technologySchema).min(1),
})

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
    opportunitiesText:
      "Currently looking for internship opportunities in software development and backend engineering roles.",
    footerBio: "Pre-final year B.Tech Computer Science student passionate about building scalable software applications.",
    email: "kireetiv2005@gmail.com",
    phone: "+91-9392509139",
    location: "Coimbatore, India",
    githubUrl: "https://github.com/kireeti-ai",
    linkedinUrl: "https://linkedin.com/in/kireeti",
    resumeUrl: "/kireeti_resume.pdf",
  },
}

const contentFilePath = path.join(process.cwd(), "data", "portfolio-content.json")

export async function getPortfolioContent(): Promise<PortfolioContent> {
  try {
    const raw = await readFile(contentFilePath, "utf-8")
    const parsed = JSON.parse(raw)
    const result = portfolioContentSchema.safeParse(parsed)
    if (result.success) {
      return result.data
    }
    const legacy = legacyPortfolioContentSchema.safeParse(parsed)
    if (legacy.success) {
      return { ...legacy.data, profile: defaultContent.profile }
    }
    return defaultContent
  } catch {
    return defaultContent
  }
}

export async function savePortfolioContent(input: unknown): Promise<PortfolioContent> {
  const parsed = portfolioContentSchema.parse(input)
  await mkdir(path.dirname(contentFilePath), { recursive: true })
  await writeFile(contentFilePath, JSON.stringify(parsed, null, 2), "utf-8")
  return parsed
}
