"use client"

import { ArrowUpRight, Github } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const CELL_SIZE = 12
const WEEK_COUNT = 53
const CONTRIBUTION_TOTAL = 548

const MONTH_LABELS = [
  { label: "Mar", week: 0 },
  { label: "Apr", week: 4 },
  { label: "May", week: 8 },
  { label: "Jun", week: 12 },
  { label: "Jul", week: 17 },
  { label: "Aug", week: 21 },
  { label: "Sep", week: 26 },
  { label: "Oct", week: 30 },
  { label: "Nov", week: 34 },
  { label: "Dec", week: 39 },
  { label: "Jan", week: 43 },
  { label: "Feb", week: 47 },
  { label: "Mar", week: 51 },
]

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""]

const WEEKLY_ACTIVITY = [
  0, 0, 0, 0,
  0, 0, 0, 0,
  0, 0, 0, 0, 0,
  0, 0, 0, 1,
  2, 3, 1, 2,
  2, 1, 2, 3,
  2, 3, 3, 2, 1,
  2, 2, 1, 1,
  3, 2, 2, 3, 2,
  1, 2, 2, 1, 1,
  2, 1, 2, 3,
  3, 4, 2, 3,
  4,
]

const HEATMAP_COLORS = [
  "bg-[#161B22]",
  "bg-[#0E4429]",
  "bg-[#006D32]",
  "bg-[#26A641]",
  "bg-[#39D353]",
]

function createContributionLevel(week: number, day: number) {
  const base = WEEKLY_ACTIVITY[week] ?? 0

  if (base === 0) {
    return 0
  }

  const seed = (week * 17 + day * 23 + (week % 4) * 5 + day) % 9
  const activeThreshold = Math.min(7, base + 2)

  if (seed > activeThreshold) {
    return 0
  }

  return Math.min(4, Math.max(1, base + ((week + day * 2) % 3) - 1))
}

const CONTRIBUTION_ROWS = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: WEEK_COUNT }, (_, week) => createContributionLevel(week, day)),
)

function CountUp({ value, isActive, duration = 1.3 }: { value: number; isActive: boolean; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      return
    }

    let startTime = 0
    let frameId = 0

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * value))

      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [duration, isActive, value])

  return <>{count}</>
}

export function GitHubActivitySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="activity" className="relative overflow-hidden bg-[#F3F7FF] py-16 md:py-24" ref={ref}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#2F81F7]/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1.1, x: [0, 24, 0], y: [0, 10, 0] } : {}}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-20 h-72 w-72 rounded-full bg-[#FFC224]/35 blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1.05, x: [0, -20, 0], y: [0, -14, 0] } : {}}
        transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", delay: 0.2 }}
      />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            className="mb-10 text-center md:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              <span className="inline-flex flex-wrap justify-center gap-x-3 gap-y-1">
                {["Building", "in"].map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 18, rotate: -2 }}
                    animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.04 * index }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  className="inline-block bg-[#2F81F7] px-3 py-1 text-white"
                  initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.16 }}
                >
                  Public
                </motion.span>
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[#393939] md:text-lg">
              A quick snapshot of my GitHub rhythm across coursework, experiments, and shipped projects over the last year.
            </p>
          </motion.div>

          <div className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
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
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border-2 border-black/45"
                      animate={isInView ? { scale: [1, 1.35], opacity: [0.55, 0] } : {}}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                    <Github className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/70">GitHub Activity</p>
                    <p className="text-sm font-semibold text-black/70">Last 12 months</p>
                </div>
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <motion.span
                  className="text-5xl font-black leading-none md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.25 }}
                >
                  <CountUp value={CONTRIBUTION_TOTAL} isActive={isInView} />
                </motion.span>
                <span className="pb-1 text-lg font-bold text-black/80 md:text-xl">contributions</span>
              </div>

              <p className="mt-4 max-w-xl text-sm font-medium leading-relaxed text-black/75 md:text-base">
                This section adds visible proof that the work on the page is backed by steady execution, not just polished screenshots.
              </p>
            </motion.div>

            <motion.a
              href="https://github.com/kireeti-ai"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -4, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
              className="group flex flex-col justify-between rounded-[28px] border-[3px] border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-7"
            >
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#2F81F7]">Profile</p>
                <h3 className="text-2xl font-bold leading-tight text-[#0B0B0B] md:text-3xl">Explore the full contribution graph and repositories.</h3>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#0B0B0B]">
                Visit kireeti-ai
                <motion.div
                  animate={isInView ? { y: [0, -2, 0], x: [0, 2, 0] } : {}}
                  transition={{ duration: 1.8, repeat: Infinity, repeatType: "mirror" }}
                >
                  <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </motion.div>
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="rounded-[32px] border-[4px] border-black bg-[#0B0F19] p-5 text-white shadow-[10px_10px_0px_0px_rgba(47,129,247,1)] md:p-8"
          >
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/55">Contribution Map</p>
                <h3 className="mt-2 text-2xl font-bold md:text-3xl">{CONTRIBUTION_TOTAL} contributions in the last year</h3>
              </div>
              <div className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/75">
                Updated through March 2026
              </div>
            </div>

            <div className="space-y-4 md:hidden">
              <p className="text-sm font-medium leading-relaxed text-white/70">
                The full contribution heatmap is optimized for larger screens. On mobile, open GitHub to explore the complete
                day-by-day graph.
              </p>
              <a
                href="https://github.com/kireeti-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <Github className="h-4 w-4" />
                View full GitHub activity
              </a>
            </div>

            <div className="relative hidden overflow-x-auto pb-2 md:block">
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white/8 to-transparent"
                initial={{ x: "-140%" }}
                animate={isInView ? { x: ["-140%", "260%"] } : {}}
                transition={{ duration: 1.2, delay: 0.7, ease: "easeInOut" }}
              />
              <div className="min-w-[900px]">
                <div
                  className="mb-3 ml-12 grid gap-[4px]"
                  style={{ gridTemplateColumns: `repeat(${WEEK_COUNT}, ${CELL_SIZE}px)` }}
                >
                  {MONTH_LABELS.map((month) => (
                    <div
                      key={`${month.label}-${month.week}`}
                      className="text-[11px] font-semibold leading-none whitespace-nowrap text-white/60"
                      style={{ gridColumnStart: month.week + 1 }}
                    >
                      {month.label}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div
                    className="grid shrink-0 gap-[4px] pt-[1px] text-[11px] font-semibold text-white/45"
                    style={{ gridTemplateRows: `repeat(7, ${CELL_SIZE}px)` }}
                  >
                    {DAY_LABELS.map((label, index) => (
                      <div key={`${label}-${index}`} className="flex items-center justify-end pr-1">
                        {label}
                      </div>
                    ))}
                  </div>

                  <div
                    role="img"
                    aria-label={`${CONTRIBUTION_TOTAL} GitHub contributions visualized across the last 12 months`}
                    className="space-y-[4px]"
                  >
                    {CONTRIBUTION_ROWS.map((row, dayIndex) => (
                      <motion.div
                        key={dayIndex}
                        className="grid gap-[4px]"
                        style={{ gridTemplateColumns: `repeat(${WEEK_COUNT}, ${CELL_SIZE}px)` }}
                        initial={{ opacity: 0, x: -24 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.35 + dayIndex * 0.08 }}
                      >
                        {row.map((level, weekIndex) => (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            aria-hidden="true"
                            className={cn(
                              "rounded-[3px] border border-white/6 transition-transform duration-200 hover:scale-110",
                              HEATMAP_COLORS[level],
                            )}
                            style={{ width: CELL_SIZE, height: CELL_SIZE }}
                            initial={{ opacity: 0, scale: 0.55 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{
                              duration: 0.22,
                              delay: 0.4 + dayIndex * 0.05 + weekIndex * 0.005,
                              ease: "easeOut",
                            }}
                          />
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-5 md:flex-row md:items-center md:justify-between">
              <p className="max-w-2xl text-sm font-medium leading-relaxed text-white/65">
                The pattern mirrors a year of steady building, from backend systems and distributed inference work to full-stack product delivery.
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
                <span>Less</span>
                {HEATMAP_COLORS.map((colorClass, index) => (
                  <div
                    key={index}
                    className={cn("h-3.5 w-3.5 rounded-[3px] border border-white/8", colorClass)}
                    aria-hidden="true"
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
