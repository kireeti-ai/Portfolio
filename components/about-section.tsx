"use client"

import { FileText, GraduationCap, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="container mx-auto px-4 py-16 md:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="relative w-full max-w-lg aspect-square border-[4px] border-black rounded-full overflow-hidden bg-[#FF6B6B] shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image src="/images/kireeti-profile.jpeg" alt="Kireeti" fill className="object-cover object-top" />
          </motion.div>
        </motion.div>

        <motion.div 
          className="space-y-6 md:space-y-8"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              About <motion.span 
                className="bg-[#2F81F7] text-white px-3 py-1 inline-block"
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.5 }}
              >Me</motion.span>
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Pre-final year B.Tech Computer Science student at Amrita Vishwa Vidyapeetham with hands-on experience in software development. Experienced in working with relational and NoSQL database systems and cloud platforms, with an interest in developing scalable, secure, and high-performance software applications.
            </motion.p>
          </div>

          <div className="space-y-6">
            <motion.div 
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div 
                className="w-5 h-5 bg-[#6366F1] border-2 border-black rounded-[5px] flex-shrink-0 mt-1"
                whileHover={{ scale: 1.2, rotate: 45 }}
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  B.Tech in Computer Science
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Amrita Vishwa Vidyapeetham, Coimbatore | Aug 2023 - Present | CGPA: 7.18/10.0
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="flex gap-4 items-start"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div 
                className="w-5 h-5 bg-[#FF6B7A] border-2 border-black rounded-[5px] flex-shrink-0 mt-1"
                whileHover={{ scale: 1.2, rotate: 45 }}
              />
              <div>
                <h3 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Introduction to Deep Learning (Kaggle) | Hands-On Data Warehousing Workshop (Snowflake)
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Button asChild className="bg-[#0B0B0B] text-white hover:bg-black/90 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] hover:scale-105 transition-transform">
              <a href="mailto:vkireeti16@gmail.com">
                <FileText className="w-5 h-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
