import type { Project } from "@/lib/projects"

export interface AdminSkill {
  title: string
  description: string
  bgColor: string
}

export interface AdminTechnology {
  name: string
  color: string
}

export interface ProfileContent {
  name: string
  roleBadge: string
  heroIntro: string
  heroHighlight: string
  heroSubheadline: string
  heroDescription: string
  heroSkills: string[]
  aboutDescription: string
  educationTitle: string
  educationDescription: string
  certificationsTitle: string
  certificationsDescription: string
  opportunitiesText: string
  footerBio: string
  email: string
  phone: string
  location: string
  githubUrl: string
  linkedinUrl: string
  resumeUrl: string
}

export interface PortfolioContentData {
  projects: Project[]
  skills: AdminSkill[]
  technologies: AdminTechnology[]
  profile: ProfileContent
}
