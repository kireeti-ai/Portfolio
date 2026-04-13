"use client"

import { Calendar, Github, Briefcase, Layers3, Target, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { BackToProjectsLink } from "@/components/back-to-projects-link"
import type { Project } from "@/lib/projects"

interface SectionListProps {
  title: string
  items: string[]
  iconColorClass: string
  showTitle?: boolean
  nested?: boolean
}

function SectionList({ title, items, iconColorClass, showTitle = true, nested = false }: SectionListProps) {
  return (
    <section className={nested ? "" : "rounded-2xl border-2 border-black/20 bg-white p-5"}>
      {showTitle && <h3 className="mb-4 text-lg font-bold text-[#0B0B0B] md:text-xl">{title}</h3>}
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 rounded-lg border border-black/10 bg-[#F8FAFC] p-3">
            <CheckCircle2 className={`mt-0.5 h-4 w-4 flex-shrink-0 ${iconColorClass}`} />
            <p className="text-sm font-medium leading-6 text-[#393939]">{item}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

interface DetailBlockProps {
  title: string
  items: string[]
  iconColorClass: string
  index: number
}

function DetailBlock({ title, items, iconColorClass, index }: DetailBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <details className="rounded-2xl border-2 border-black/20 bg-white p-4 transition-shadow hover:shadow-md open:pb-5">
        <summary className="cursor-pointer list-none text-sm font-bold uppercase tracking-[0.06em] text-[#111827]">
          {title} <span className="ml-2 text-xs font-semibold text-[#6B7280]">({items.length})</span>
        </summary>
        <div className="mt-4">
          <SectionList title={title} items={items} iconColorClass={iconColorClass} showTitle={false} nested />
        </div>
      </details>
    </motion.div>
  )
}

// Animation presets
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export function ProjectDetailContent({ project }: { project: Project }) {
  const snapshot = [
    { label: "Status", value: project.status, icon: CheckCircle2 },
    { label: "Role", value: project.role, icon: Briefcase },
    { label: "Project Type", value: project.projectType, icon: Layers3 },
    { label: "Timeline", value: project.timeline, icon: Calendar },
    { label: "Primary Focus", value: project.focus, icon: Target },
  ]

  const topOutcomes = project.impact.slice(0, 3)
  const topExecution = project.ownership.slice(0, 3)

  return (
    <main className="min-h-screen bg-[#FFFFFF]">
      {/* ── Header ── */}
      <header className="relative overflow-hidden bg-[#FFFFFF] text-[#0B0B0B]">
        <div className="relative container mx-auto max-w-7xl px-4 py-12 md:py-16">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <BackToProjectsLink />
          </motion.div>

          <motion.div
            className="mb-5 flex flex-wrap items-center gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              <span key="date" className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-[#F8FAFC] px-3 py-1 text-xs font-bold text-[#393939]">
                <Calendar className="h-4 w-4" />
                {project.date}
              </span>,
              <span key="status" className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-[#F8FAFC] px-3 py-1 text-xs font-bold text-[#393939]">
                <CheckCircle2 className="h-4 w-4" />
                {project.status}
              </span>,
              <span key="type" className={`${project.bgColor} inline-flex rounded-full border border-black/20 px-3 py-1 text-xs font-bold text-white`}>
                {project.projectType}
              </span>,
            ].map((badge, i) => (
              <motion.div key={i} variants={staggerItem}>{badge}</motion.div>
            ))}
          </motion.div>

          <motion.h1
            className="max-w-5xl text-3xl font-black leading-tight md:text-5xl"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="mt-4 max-w-4xl text-base font-medium leading-relaxed text-[#393939] md:text-lg"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.25}
          >
            {project.summary}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-wrap gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                className="rounded-full border border-black/20 bg-[#F3F4F6] px-3 py-1 text-xs font-semibold text-[#111827]"
                variants={staggerItem}
                whileHover={{ scale: 1.06 }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.4}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#161616] md:text-base"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="h-5 w-5" />
              View repository on GitHub
            </motion.a>
          </motion.div>
        </div>
      </header>

      {/* ── Recruiter Snapshot ── */}
      <section className="relative z-10 bg-[#FFFFFF]">
        <div className="container mx-auto -mt-6 max-w-7xl px-4 pb-4 md:-mt-8">
          <motion.div
            className="space-y-6 rounded-3xl border-2 border-black/20 bg-white p-5 shadow-md md:p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-2xl border-2 border-black/10 bg-[#F8FAFC] p-4 md:p-5">
              <h2 className="mb-3 text-lg font-bold text-[#0B0B0B]">Recruiter Snapshot</h2>
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                {snapshot.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.label}
                      className="grid gap-2 border-b border-black/10 px-4 py-3 last:border-b-0 md:grid-cols-[220px_1fr] md:items-start"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                    >
                      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
                        <Icon className="h-4 w-4 text-[#0B0B0B]" />
                        <span>{item.label}</span>
                      </div>
                      <p className="break-words text-sm font-semibold leading-7 text-[#111827] md:text-base">{item.value}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <motion.div
              className="rounded-2xl border-2 border-black/10 bg-[#F8FAFC] p-4 md:p-5"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="mb-3 text-lg font-bold text-[#0B0B0B]">Top Outcomes</h2>
              <ul className="space-y-2.5">
                {topOutcomes.map((item, i) => (
                  <motion.li
                    key={item}
                    className="flex items-start gap-2 text-sm font-medium leading-6 text-[#393939]"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#10B981]" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Project Context ── */}
      <section className="bg-[#FFFFFF]">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:py-10">
          <motion.h2
            className="text-2xl font-bold text-[#0B0B0B] md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            Project Context
          </motion.h2>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <motion.div
              className="rounded-2xl border-2 border-black/20 bg-white p-5 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h3 className="mb-3 text-xl font-bold text-[#0B0B0B]">Problem</h3>
              <p className="text-sm font-medium leading-7 text-[#393939] md:text-base">{project.problem}</p>
            </motion.div>
            <motion.div
              className="rounded-2xl border-2 border-black/20 bg-white p-5 md:p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h3 className="mb-3 text-xl font-bold text-[#0B0B0B]">Approach</h3>
              <p className="text-sm font-medium leading-7 text-[#393939] md:text-base">{project.description}</p>
            </motion.div>
          </div>

          <motion.div
            className="mt-8 rounded-2xl border-2 border-black/20 bg-white p-5 md:p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <h3 className="mb-3 text-lg font-bold text-[#0B0B0B]">What I Built (Quick Scan)</h3>
            <ul className="space-y-2.5">
              {topExecution.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-start gap-2 text-sm font-medium leading-6 text-[#393939]"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#2F81F7]" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ── Deep Dive ── */}
      <section className="bg-[#FFFFFF] pb-16">
        <div className="container mx-auto max-w-7xl px-4 pt-2 pb-10 md:pb-12">
          <motion.h2
            className="text-2xl font-bold text-[#0B0B0B] md:text-3xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            Deep Dive (Optional)
          </motion.h2>
          <motion.p
            className="mt-2 text-sm font-medium text-[#6B7280]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            Expand only if you want implementation details.
          </motion.p>
          <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
            <DetailBlock title="Project Goals" items={project.goals} iconColorClass="text-[#2F81F7]" index={0} />
            <DetailBlock title="My Ownership" items={project.ownership} iconColorClass="text-[#2F81F7]" index={1} />
            <DetailBlock title="Architecture &amp; System Design" items={project.architecture} iconColorClass="text-[#2F81F7]" index={2} />
            <DetailBlock title="Constraints I Worked Through" items={project.constraints} iconColorClass="text-[#FF6B7A]" index={3} />
            <DetailBlock title="Reliability &amp; Quality Signals" items={project.qualitySignals} iconColorClass="text-[#10B981]" index={4} />
            <DetailBlock title="Hard Problems Solved" items={project.challenges} iconColorClass="text-[#FF6B7A]" index={5} />
            <DetailBlock title="If I Continue This Project" items={project.nextSteps} iconColorClass="text-[#6366F1]" index={6} />
          </div>
        </div>
      </section>
    </main>
  )
}
