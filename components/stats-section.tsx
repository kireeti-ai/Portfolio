"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, FolderGit2, Coffee, Award } from "lucide-react"

interface StatItemProps {
  icon: React.ReactNode
  value: number
  suffix: string
  label: string
  color: string
  delay: number
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration, isInView])

  return <span ref={ref}>{count}</span>
}

function StatItem({ icon, value, suffix, label, color, delay }: StatItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" }}
      className="bg-white border-[3px] border-black rounded-2xl p-6 md:p-8 text-center transition-all"
    >
      <motion.div
        className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`}
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
      >
        {icon}
      </motion.div>
      <div className="text-4xl md:text-5xl font-bold text-[#0B0B0B] mb-2">
        <AnimatedCounter value={value} />
        {suffix}
      </div>
      <div className="text-[#393939] font-medium text-base md:text-lg">{label}</div>
    </motion.div>
  )
}

export function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const stats = [
    {
      icon: <FolderGit2 className="w-8 h-8 text-white" />,
      value: 5,
      suffix: "+",
      label: "Projects Completed",
      color: "bg-[#6366F1]",
    },
    {
      icon: <Code className="w-8 h-8 text-white" />,
      value: 10,
      suffix: "+",
      label: "Technologies",
      color: "bg-[#2F81F7]",
    },
    {
      icon: <Coffee className="w-8 h-8 text-white" />,
      value: 500,
      suffix: "+",
      label: "Cups of Coffee",
      color: "bg-[#FF6B7A]",
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      value: 5,
      suffix: "+",
      label: "Certifications",
      color: "bg-[#10B981]",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-[#FFC224]" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              By the <span className="bg-black text-white px-3 py-1 inline-block">Numbers</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                icon={stat.icon}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                color={stat.color}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
