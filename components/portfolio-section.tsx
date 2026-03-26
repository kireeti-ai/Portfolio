"use client"

import { ArrowRight, Github, Brain, Zap, UtensilsCrossed, BarChart3, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export function PortfolioSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const projects = [
    {
      title: "DocPulseAI - AI Platform for Code Intelligence",
      description:
        "Built a repository intelligence platform using AST-based analysis (Tree-sitter) to extract APIs, entities, and dependency relationships from large codebases. Deployed a containerized microservices architecture on Azure using ACA, ACR, Blob Storage, and PostgreSQL.",
      tags: ["React.js", "Node.js", "Express.js", "Azure"],
      date: "Mar 2026",
      bgColor: "bg-[#6366F1]",
      icon: Brain,
      github: "https://github.com/DocPulseAI",
    },
    {
      title: "Edge Co-Intelligence System",
      description:
        "Built a distributed edge inference system that parallelizes YOLOv8 detection across worker nodes. Designed a fault-tolerant pipeline with load balancing, retries, and worker health monitoring. Implemented real-time inference streaming and aggregation for low-latency object detection.",
      tags: ["Python", "FastAPI", "YOLOv8"],
      date: "Feb 2026",
      bgColor: "bg-[#2F81F7]",
      icon: Eye,
      github: "https://github.com/kireeti-ai/distributed-edge-ai-inference",
    },
    {
      title: "Quizora AI - Online Assessment Platform",
      description:
        "Developed a stateless REST API using Spring Boot and MySQL to manage the assessment lifecycle with transactional quiz distribution and automated grading. Secured APIs using Spring Security and JWT, implementing RBAC for faculty and student access control.",
      tags: ["Java", "Spring Boot", "MySQL", "JWT"],
      date: "Nov 2025",
      bgColor: "bg-[#FF6B7A]",
      icon: Zap,
      github: "https://github.com/kireeti-ai/Quizora-ai",
    },
    {
      title: "SnapDish - Food Delivery Platform",
      description:
        "Built a full-stack food delivery platform with dynamic restaurant browsing and an admin dashboard for order tracking and revenue analytics. Developed RESTful backend services for order and restaurant management, handling lifecycle transitions and data aggregation.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
      date: "Oct 2025",
      bgColor: "bg-[#10B981]",
      icon: UtensilsCrossed,
      github: "https://github.com/kireeti-ai/Snap-dish",
    },
    {
      title: "Air Quality Forecasting System",
      description:
        "Built a regression-based AQI forecasting model, benchmarking multiple algorithms and achieving an R² score of 87% using Random Forest. Performed exploratory data analysis to identify key pollutant correlations influencing AQI prediction.",
      tags: ["Python", "Scikit-Learn", "Random Forest", "Flask"],
      date: "Aug 2025",
      bgColor: "bg-[#F59E0B]",
      icon: BarChart3,
      github: "https://github.com/kireeti-ai",
    },
  ]

  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Take a look at my <br />
            <motion.span 
              className="bg-[#FFC224] text-black px-3 py-1 inline-block"
              initial={{ scale: 0.8, rotate: 5 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >Projects</motion.span>
          </h2>
          <p className="text-[#393939] text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto mt-4">
            A collection of projects showcasing my skills in full-stack development, cloud computing, and AI/ML applications.
          </p>
        </motion.div>

        <div className="space-y-8 mb-12">
          {projects.map((project, index) => {
            const IconComponent = project.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" }}
                className="group grid md:grid-cols-2 bg-white border-[3px] border-black rounded-[32px] overflow-hidden transition-all cursor-pointer"
              >
                <div className="p-6 md:p-12 flex flex-col justify-center bg-white">
                  <motion.div 
                    className="flex items-center gap-3 mb-4"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  >
                    <span className="text-sm font-bold text-gray-500">{project.date}</span>
                  </motion.div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.span 
                        key={tagIndex} 
                        className="inline-block bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: index * 0.15 + tagIndex * 0.05 + 0.3 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-[28px] font-bold mb-4 leading-tight md:leading-[40px] text-[#0B0B0B]">
                    {project.title}
                  </h3>

                  <p className="text-base md:text-[16px] text-[#393939] mb-8 leading-relaxed md:leading-[28px] font-medium">
                    {project.description}
                  </p>

                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-semibold text-[#0B0B0B] text-sm md:text-base"
                    whileHover={{ x: 5 }}
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </motion.a>
                </div>

                <div className={`${project.bgColor} relative overflow-hidden min-h-[250px] md:min-h-[400px] flex items-center justify-center`}>
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <IconComponent className="w-32 h-32 md:w-48 md:h-48 text-white/30" strokeWidth={1} />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <motion.a
            href="https://github.com/kireeti-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 md:px-8 py-4 md:py-5 rounded-[12px] font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View all projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
