"use client"

import { Github, Linkedin, Mail, Phone, Heart, ArrowUp } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import type { AdminTechnology, ProfileContent } from "@/lib/portfolio-types"

interface FooterProps {
  profile: ProfileContent
  technologies: AdminTechnology[]
}

export function Footer({ profile, technologies }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <motion.div 
                  className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-white"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Image
                    src="/images/kireeti-profile.jpeg"
                    alt="Kireeti"
                    width={48}
                    height={48}
                    className="object-cover object-top w-full h-full"
                  />
                </motion.div>
                <span className="text-lg md:text-xl font-bold">{profile.name}</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {profile.footerBio}
              </p>
              <div className="flex gap-3">
                <motion.a
                   href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#333] rounded-full flex items-center justify-center hover:bg-[#444] transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                   href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#0077B5] rounded-full flex items-center justify-center hover:bg-[#006399] transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
                <motion.a
                   href={`mailto:${profile.email}`}
                  className="w-10 h-10 bg-[#FF6B7A] rounded-full flex items-center justify-center hover:bg-[#FF5266] transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#skills" className="hover:text-white transition-colors">
                    Skills
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projects
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Technologies</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                 {technologies.slice(0, 5).map((tech) => (
                   <li key={tech.name}>{tech.name}</li>
                 ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                   <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                     {profile.email}
                   </a>
                 </li>
                 <li className="flex items-center gap-2">
                   <Phone className="w-4 h-4" />
                   <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="hover:text-white transition-colors">
                     {profile.phone}
                   </a>
                 </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm flex items-center gap-1">
                 Made with <Heart className="w-4 h-4 text-[#FF6B7A] fill-current" /> by {profile.name}
              </p>
              <p className="text-gray-400 text-sm">
                {currentYear} All rights reserved.
              </p>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                whileHover={{ y: -2 }}
              >
                Back to top <ArrowUp className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
