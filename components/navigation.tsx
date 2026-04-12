"use client"

import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { MobileMenu } from "./mobile-menu"

export function Navigation() {
  return (
    <motion.div 
      className="container mx-auto px-4 pt-8 pb-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.nav 
        className="flex items-center justify-between bg-white border-4 border-black rounded-xl px-5 py-3 max-w-2xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        whileHover={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
        transition={{ duration: 0.2 }}
      >
        <motion.a 
          href="#" 
          className="text-xl font-bold flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Kireeti
        </motion.a>

        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {["About", "Skills", "Projects", "Contact"].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.div
          className="hidden md:block"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button asChild className="bg-black text-white hover:bg-black/90 rounded-sm px-5 h-12 min-w-[48px] flex-shrink-0">
            <a href="mailto:kireetiv2005@gmail.com">
              <Mail className="w-10 h-10" strokeWidth={2.5} />
            </a>
          </Button>
        </motion.div>

        <MobileMenu />
      </motion.nav>
    </motion.div>
  )
}
