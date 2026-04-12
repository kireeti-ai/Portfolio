"use client"

import { motion } from "framer-motion"
import type { AdminTechnology } from "@/lib/portfolio-types"

function TechPill({ name, color }: { name: string; color: string }) {
  return (
    <div
      className={`flex flex-shrink-0 items-center whitespace-nowrap rounded-full border-2 border-white/20 px-6 py-3 text-lg font-bold text-white ${color}`}
    >
      <span>{name}</span>
    </div>
  )
}

interface TechMarqueeProps {
  items: AdminTechnology[]
}

export function TechMarquee({ items }: TechMarqueeProps) {
  return (
    <section className="overflow-hidden border-y-4 border-black bg-black py-8">
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
          {[...items, ...items].map((tech, index) => (
            <TechPill key={index} name={tech.name} color={tech.color} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
