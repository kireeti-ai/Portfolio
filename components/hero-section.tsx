"use client"

import { Mail, FolderOpen, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import type { ProfileContent } from "@/lib/portfolio-types"

interface HeroSectionProps {
  profile: ProfileContent
}

export function HeroSection({ profile }: HeroSectionProps) {
  const skills = profile.heroSkills

  return (
    <section className="container mx-auto px-4 pb-16 pt-14 md:pb-24 md:pt-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.p
            className="inline-flex items-center rounded-full border-2 border-black bg-white px-4 py-2 text-sm font-semibold text-[#393939] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {profile.roleBadge}
          </motion.p>

          <motion.h1
            className="text-4xl font-black leading-tight tracking-tight text-[#0B0B0B] sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {profile.heroIntro} <span className="text-[#FF6B7A]">{profile.heroHighlight}</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-xl font-semibold leading-relaxed text-[#2F81F7] sm:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {profile.heroSubheadline}
          </motion.p>

          <motion.p
            className="max-w-xl text-base font-medium leading-8 text-[#393939] md:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {profile.heroDescription}
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border-2 border-black bg-white px-4 py-1.5 text-sm font-semibold text-[#0B0B0B]"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 pt-2 sm:flex-row sm:flex-wrap sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              asChild
              className="h-auto w-full rounded-lg bg-[#0B0B0B] px-8 py-4 text-base font-semibold text-white transition-transform hover:scale-105 hover:bg-black/90 sm:w-auto sm:min-w-[210px]"
            >
                <a href="#contact">
                  <Mail className="w-5 h-5" />
                  Get in touch
                </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-auto w-full rounded-lg border-[3px] border-black bg-white px-8 py-4 text-base font-semibold transition-transform hover:scale-105 hover:bg-gray-50 sm:w-auto sm:min-w-[210px]"
            >
              <a href="#projects">
                <FolderOpen className="w-5 h-5" />
                View Projects
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex gap-4 pt-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.a
               href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-black text-white transition-colors hover:bg-gray-800"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-6 w-6" />
            </motion.a>
            <motion.a
               href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-[#0077B5] text-white transition-colors hover:bg-[#006399]"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="h-6 w-6" />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50, rotate: -5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="relative w-full max-w-md">
            <div className="pointer-events-none absolute -inset-5 rounded-[2rem] bg-[#2F81F7]/20 blur-2xl" />
            <motion.div
              className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-black bg-[#FDB927] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              whileHover={{ y: -6, rotate: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/kireeti-profile.jpeg"
                alt="Kireeti - Software Developer"
                fill
                className="object-cover object-top"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
