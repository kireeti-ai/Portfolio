"use client"

import { ArrowRight, Github } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import type { Project } from "@/lib/projects"

interface PortfolioSectionProps {
  projects: Project[]
}

export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const router = useRouter()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const navigateToProject = (slug: string) => {
    router.push(`/projects/${slug}`)
  }

  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Take a look at my <br />
            <motion.span 
              className="bg-[#FFC224] text-black px-3 py-1 inline-block"
              initial={{ scale: 0.8, rotate: 5 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >Projects</motion.span>
          </h2>
          <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto mt-4">
            A collection of projects showcasing my skills in full-stack development, cloud computing, and AI/ML applications.
          </p>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer overflow-hidden rounded-[28px] border-[3px] border-black bg-white transition-all hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                role="link"
                tabIndex={0}
                onClick={(event) => {
                  if (event.target instanceof Element && event.target.closest("a,button")) {
                    return
                  }

                  navigateToProject(project.slug)
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    navigateToProject(project.slug)
                  }
                }}
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
                </div>

                <div className={`${project.bgColor} relative flex items-center px-6 py-4`}>
                  <motion.span
                    className="rounded-full border-2 border-black bg-white px-3 py-1 text-xs font-bold text-[#393939]"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    {project.date}
                  </motion.span>
                </div>

                <div className="flex h-full flex-col p-6">
                  <div className="mb-3">
                    <span className="inline-flex items-center rounded-full border-2 border-black/20 bg-[#F3F4F6] px-3 py-1 text-xs font-bold text-[#111827]">
                      Status: {project.status}
                    </span>
                  </div>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span
                        key={tagIndex} 
                        className="inline-block bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.25 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <h3 className="mb-3 text-xl font-bold leading-tight text-[#0B0B0B]">
                    {project.title}
                  </h3>

                  <p className="mb-6 text-sm font-medium leading-7 text-[#393939] md:text-[15px]">
                    {project.summary}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => navigateToProject(project.slug)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B0B0B] md:text-base"
                    >
                      View details
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B0B0B] md:text-base"
                    whileHover={{ x: 4 }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                  </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/kireeti-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 md:px-8 py-4 md:py-5 rounded-[12px] font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View all projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
