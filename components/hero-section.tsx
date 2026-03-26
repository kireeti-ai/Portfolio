"use client"

import { Mail, FolderOpen, Github, Linkedin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { TypingEffect } from "./typing-effect"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-[42px] leading-[50px] md:text-[72px] font-bold md:leading-[85px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {"I'm"} <motion.span 
              className="bg-[#FF6B7A] text-white px-3 py-1 inline-block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >Kireeti</motion.span>, a{" "}
            <span className="bg-[#2F81F7] text-white px-3 py-1 inline-block">
              <TypingEffect 
                words={["Software Developer", "Backend Engineer", "Full-Stack Dev", "Problem Solver"]} 
              />
            </span>
          </motion.h1>

          <motion.p 
            className="text-[#393939] text-[16px] md:text-[18px] font-medium leading-[28px] md:leading-[30px] max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Pre-final year B.Tech Computer Science student with hands-on experience in software development and strong
            fundamentals in Data Structures & Algorithms, DBMS, Operating Systems, and Computer Networks.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Button asChild className="bg-[#0B0B0B] text-white hover:bg-black/90 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] hover:scale-105 transition-transform">
              <a href="mailto:vkireeti16@gmail.com">
                <Mail className="w-5 h-5" />
                Get in touch
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-white border-[3px] border-black hover:bg-gray-50 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] hover:scale-105 transition-transform"
            >
              <a href="#projects">
                <FolderOpen className="w-5 h-5" />
                View Projects
              </a>
            </Button>
          </motion.div>

          <motion.div 
            className="flex gap-4 pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.a 
              href="https://github.com/kireeti-ai" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6 text-white" />
            </motion.a>
            <motion.a 
              href="https://linkedin.com/in/kireeti" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center hover:bg-[#006399] transition-colors"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-6 h-6 text-white" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="flex justify-center md:justify-end"
          initial={{ opacity: 0, x: 50, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.div 
            className="relative w-full max-w-md aspect-square bg-[#FDB927] border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            whileHover={{ scale: 1.02, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/images/kireeti-profile.jpeg"
              alt="Kireeti - Software Developer"
              fill
              className="object-cover object-top"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
