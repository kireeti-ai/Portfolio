"use client"

import { motion } from "framer-motion"

const technologies = [
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
]

export function TechMarquee() {
  return (
    <section className="py-8 bg-black overflow-hidden border-y-4 border-black">
      <div className="relative">
        <motion.div
          className="flex gap-8"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...technologies, ...technologies].map((tech, index) => (
            <div
              key={index}
              className={`flex-shrink-0 px-6 py-3 ${tech.color} rounded-full border-2 border-white/20 text-white font-bold text-lg whitespace-nowrap`}
            >
              {tech.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
