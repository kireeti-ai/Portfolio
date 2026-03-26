"use client"

import { FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const interests = [
    {
      title: "Data Structures & Algorithms",
      description: "Strong problem-solving skills with a focus on optimizing time and space complexity.",
      color: "bg-[#6366F1]",
    },
    {
      title: "Backend Development",
      description: "Building robust, scalable APIs and microservices using Spring Boot, Node.js, and FastAPI.",
      color: "bg-[#2F81F7]",
    },
    {
      title: "Cloud Computing",
      description: "Deploying containerized applications on AWS and Azure with modern DevOps practices.",
      color: "bg-[#FF6B7A]",
    },
  ]

  return (
    <section className="bg-black py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <motion.div 
            className="text-white pt-0 md:pt-12 md:sticky md:top-12 self-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 leading-[1.3]"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              My Core <motion.span 
                className="bg-[#6366F1] text-white px-3 py-1 inline-block"
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 }}
              >Interests</motion.span>
            </motion.h2>
            <motion.p 
              className="text-gray-400 mb-8 md:mb-10 leading-relaxed text-base md:text-lg"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Passionate about building scalable, secure, and high-performance software applications. Currently exploring distributed systems and AI-powered applications.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild className="bg-white text-black hover:bg-gray-50 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] hover:scale-105 transition-transform">
                <a href="mailto:vkireeti16@gmail.com">
                  <FileText className="w-5 h-5" />
                  Contact Me
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <div className="space-y-6">
            {interests.map((interest, index) => (
              <motion.div 
                key={index} 
                className="bg-white border-4 border-black rounded-3xl min-h-[180px] md:min-h-[200px]"
                initial={{ opacity: 0, x: 50, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                whileHover={{ y: -8, boxShadow: "8px 8px 0px 0px rgba(255,255,255,0.3)" }}
              >
                <div className="flex items-center justify-between mb-4 md:mb-6 pt-6 md:pt-8 px-6 md:px-8">
                  <motion.div 
                    className={`${interest.color} text-white px-4 py-2 rounded-full text-sm md:text-base font-bold`}
                    whileHover={{ scale: 1.05 }}
                  >
                    Interest #{index + 1}
                  </motion.div>
                  <motion.div 
                    className={`w-10 h-10 md:w-12 md:h-12 ${interest.color} rounded-full flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </motion.div>
                </div>

                <div className="border-t-[3px] border-black mb-4 md:mb-6"></div>

                <div className="px-6 md:px-8 pb-6 md:pb-8">
                  <h3 className="text-xl md:text-[28px] leading-tight md:leading-[40px] font-bold text-[#0B0B0B] mb-2 md:mb-3">
                    {interest.title}
                  </h3>
                  <p className="text-[#393939] text-base md:text-[20px] leading-relaxed md:leading-[32px]">
                    {interest.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
