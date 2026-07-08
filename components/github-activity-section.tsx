"use client"

import { ArrowUpRight, Github, Code2 } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// ── Config ────────────────────────────────────────────────
const GITHUB_USERNAME = "kireeti-ai"
const LEETCODE_USERNAME = "kireeticodes"

const NOW = new Date()
const UPDATED_LABEL = NOW.toLocaleString("en-US", { month: "long", year: "numeric" })

// Real-time GitHub contribution heatmap (SVG)
const GITHUB_CHART_URL = `https://ghchart.rshah.org/${GITHUB_USERNAME}`

// Real-time LeetCode stats card (SVG) — dark theme, no heatmap
const LEETCODE_CARD_URL =
  `https://leetcard.jacoblin.cool/${LEETCODE_USERNAME}` +
  `?theme=dark` +
  `&font=Source%20Code%20Pro` +
  `&border=0` +
  `&radius=20`

// ── Helpers ───────────────────────────────────────────────
function CountUp({ value, isActive, duration = 1.3 }: { value: number; isActive: boolean; duration?: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!isActive) return
    let startTime = 0
    let frameId = 0
    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * value))
      if (progress < 1) frameId = requestAnimationFrame(tick)
    }
    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isActive, value, duration])
  return <>{count}</>
}

// ── Main Component ────────────────────────────────────────
export function GitHubActivitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="activity" className="relative overflow-hidden bg-[#F3F7FF] py-16 md:py-24" ref={ref}>
      {/* Ambient blobs */}
      <motion.div aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#2F81F7]/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1.1, x: [0, 24, 0], y: [0, 10, 0] } : {}}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-[#FFC224]/35 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1.05, x: [0, -20, 0], y: [0, -14, 0] } : {}}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
      />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">

          {/* ── Heading ── */}
          <motion.div className="mb-10 text-center md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-1">
                {["Building", "in"].map((word, i) => (
                  <motion.span key={word}
                    initial={{ opacity: 0, y: 18, rotate: -2 }}
                    animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.04 * i }}
                  >{word}</motion.span>
                ))}
                <motion.span
                  className="inline-block bg-[#2F81F7] px-3 py-1 text-white"
                  initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.16 }}
                >Public</motion.span>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[#393939] md:text-lg">
              Real-time snapshots of my coding activity — every green square and solved problem, pulled live from GitHub and LeetCode.
            </p>
          </motion.div>

          {/* ── Row 1: Summary cards ── */}
          <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">

            {/* GitHub yellow summary card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -4, boxShadow: "-8px 8px 0px 0px rgba(0,0,0,1)" }}
              className="rounded-[28px] border-[3px] border-black bg-[#FFC224] p-6 shadow-[-6px_6px_0px_0px_rgba(0,0,0,1)] md:p-7"
            >
              <div className="mb-4 flex items-center gap-3">
                <motion.div
                  className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-black bg-black text-white"
                  animate={isInView ? { scale: [1, 1.06, 1] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
                >
                  <motion.div aria-hidden="true"
                    className="absolute inset-0 rounded-full border-2 border-black/45"
                    animate={isInView ? { scale: [1, 1.35], opacity: [0.55, 0] } : {}}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <Github className="h-6 w-6" />
                </motion.div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/70">GitHub Activity</p>
                  <p className="text-sm font-semibold text-black/70">Live contribution heatmap</p>
                </div>
              </div>
              <p className="max-w-xl text-sm font-medium leading-relaxed text-black/75 md:text-base">
                Consistent commits across personal projects, coursework experiments, and open-source exploration — building habits that matter.
              </p>
              <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-black/80 transition-colors hover:text-black">
                Visit {GITHUB_USERNAME}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            {/* LeetCode dark summary card */}
            <motion.a
              href={`https://leetcode.com/u/${LEETCODE_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              className="group flex flex-col justify-between rounded-[28px] border-[3px] border-black bg-[#1A1A2E] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-7"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFA116]/15">
                    <Code2 className="h-5 w-5 text-[#FFA116]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FFA116]">LeetCode</p>
                    <p className="text-xs font-semibold text-white/45">Live stats & heatmap</p>
                  </div>
                </div>
                <motion.div
                  animate={isInView ? { y: [0, -2, 0], x: [0, 2, 0] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
                >
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </motion.div>
              </div>
              <p className="text-sm font-medium leading-relaxed text-white/60">
                Problem-solving progress across Easy, Medium, and Hard — pulled in real-time from the LeetCode API.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white/70 transition-colors group-hover:text-white">
                Visit {LEETCODE_USERNAME}
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </motion.a>
          </div>

          {/* ── Row 2: Real GitHub contribution heatmap (dark) ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mb-6 rounded-[32px] border-[4px] border-black bg-[#0D1117] p-5 text-white shadow-[10px_10px_0px_0px_rgba(47,129,247,1)] md:p-8"
          >
            {/* Header */}
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-3">
                <Github className="h-6 w-6 text-white" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/40">GitHub Contribution Map</p>
                  <h3 className="text-xl font-bold text-white md:text-2xl">@{GITHUB_USERNAME}</h3>
                </div>
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/60">
                Updated through {UPDATED_LABEL}
              </div>
            </div>

            {/* Real chart image — inverted to dark bg */}
            <div className="overflow-x-auto rounded-xl bg-[#161B22] p-4">
              <img
                src={GITHUB_CHART_URL}
                alt={`${GITHUB_USERNAME}'s real GitHub contribution heatmap`}
                className="mx-auto w-full min-w-[700px]"
                style={{ imageRendering: "auto", filter: "invert(1) hue-rotate(180deg) saturate(3) brightness(1.5) contrast(1.2)" }}
              />
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center justify-end gap-2 text-xs font-semibold text-white/40">
              <span>Less</span>
              {["#161B22", "#0E4429", "#006D32", "#26A641", "#39D353"].map((c) => (
                <div key={c} className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: c }} />
              ))}
              <span>More</span>
            </div>
          </motion.div>

          {/* ── Row 3: Real LeetCode stats card ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="rounded-[32px] border-[4px] border-black bg-[#1A1A2E] p-5 shadow-[10px_10px_0px_0px_rgba(255,161,22,1)] md:p-8"
          >
            {/* Header */}
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="flex items-center gap-3">
                <Code2 className="h-6 w-6 text-[#FFA116]" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/40">LeetCode Stats</p>
                  <h3 className="text-xl font-bold text-white md:text-2xl">@{LEETCODE_USERNAME}</h3>
                </div>
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/60">
                Live data
              </div>
            </div>

            {/* Real LeetCode card image */}
            <div className="flex justify-center overflow-x-auto rounded-xl">
              <img
                src={LEETCODE_CARD_URL}
                alt={`${LEETCODE_USERNAME}'s real LeetCode stats`}
                className="w-full max-w-[750px]"
                style={{ imageRendering: "auto" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
