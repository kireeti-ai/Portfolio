"use client"

import { Mail } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import type { AdminSkill } from "@/lib/portfolio-types"

interface ServicesSectionProps {
  skills: AdminSkill[]
}

export function ServicesSection({ skills }: ServicesSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  }

  return (
    <section id="skills" className="bg-white py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4">
              My Technical <motion.span 
                className="bg-[#FF4A60] text-white px-3 py-1 inline-block"
                initial={{ scale: 0.8, rotate: -5 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >Skills</motion.span>
            </h2>
            <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
              Strong fundamentals in Data Structures & Algorithms, DBMS, Operating Systems, and Computer Networks with hands-on experience in full-stack development.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skills.map((skill, index) => {
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -8, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                  className="bg-white border-[3px] border-black rounded-[32px] overflow-hidden transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className={`${skill.bgColor} px-8 py-6`}>
                    <h3 className="text-[24px] leading-[32px] font-bold text-white">{skill.title}</h3>
                  </div>
                  <div className="px-8 py-8 flex-1 flex flex-col">
                    <p className="text-[16px] leading-[26px] font-medium text-[#393939]">{skill.description}</p>
                  </div>
                </motion.div>
              )
            })}

            <motion.div 
              className="bg-[#FFC224] border-[3px] border-black rounded-[32px] p-8 md:p-12 flex flex-col items-center justify-center text-center relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] lg:col-span-3"
              variants={cardVariants}
              whileHover={{ y: -4 }}
            >
              <h3 className="text-[28px] leading-[40px] font-bold mb-4 text-[#0B0B0B]">Interested in working together?</h3>
              <p className="text-[18px] leading-[30px] font-medium text-[#393939] mb-6 max-w-xl">
                {"I'm"} always open to discussing new projects, opportunities, or collaborations. Let&apos;s build something amazing!
              </p>
              <Button asChild className="bg-black text-white hover:bg-black/90 rounded-[16px] px-12 py-6 font-medium text-[18px] h-[64px] hover:scale-105 transition-transform">
                <a href="#contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Get in touch
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
