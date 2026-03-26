"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SkillBarProps {
  name: string
  level: number
  color: string
  delay: number
}

function SkillBar({ name, level, color, delay }: SkillBarProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-[#0B0B0B]">{name}</span>
        <motion.span
          className="font-bold text-[#393939]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
        <motion.div
          className={`h-full ${color} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

export function SkillBars() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const skills = [
    { name: "Java & Spring Boot", level: 85, color: "bg-[#6366F1]" },
    { name: "Python & FastAPI", level: 80, color: "bg-[#2F81F7]" },
    { name: "React.js", level: 75, color: "bg-[#FF6B7A]" },
    { name: "Node.js & Express", level: 80, color: "bg-[#10B981]" },
    { name: "Databases (MySQL, MongoDB)", level: 78, color: "bg-[#F59E0B]" },
    { name: "Cloud (AWS, Azure)", level: 70, color: "bg-[#8B5CF6]" },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Skill <span className="bg-[#6366F1] text-white px-3 py-1 inline-block">Proficiency</span>
            </h2>
            <p className="text-[#393939] text-base md:text-lg font-medium">
              My technical expertise across different technologies and frameworks.
            </p>
          </motion.div>

          <motion.div
            className="bg-white border-[3px] border-black rounded-3xl p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skill.color}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
