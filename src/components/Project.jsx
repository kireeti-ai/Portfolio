import React from 'react';
import { Github, ExternalLink, Folder } from 'lucide-react';
import { motion } from 'framer-motion';

const projectData = [
  {
    title: "SnapDish Delivery",
    desc: "Full-stack food delivery ecosystem with RBAC (Admin, Driver, User). Features real-time order tracking and JWT auth.",
    tech: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "https://github.com/kireeti-ai/snap-dish"
  },
  {
    title: "Quizora AI",
    desc: "AI-powered quiz generation platform using OpenAI API and Spring Boot. Auto-grades subjective answers.",
    tech: ["Spring Boot", "React", "OpenAI API", "MySQL"],
    link: "https://github.com/kireeti-ai/Quizora-ai"
  },
  {
    title: "Air Quality AI",
    desc: "ML Pipeline predicting AQI with 91% accuracy using Random Forest. Deployed via Dockerized Flask API.",
    tech: ["Python", "Scikit-Learn", "Docker", "Flask"],
    link: "https://github.com/kireeti-ai/air-quality-prediction"
  }
  ,{
    title: "Network Simulation",
    desc: "Custom network behavior simulator implementing routing logic, congestion handling, and packet-flow visualization. Designed to model and analyze network behavior using core data structures.",
    tech: ["Python", "Networking", "Simulation", "Data Structures"],
    link: "https://github.com/kireeti-ai/Network-simulation"
  },{
    title: "CI Living Documentation",
    desc: "A CI-driven documentation automation platform that keeps engineering artefacts continuously synchronized. Integrates into CI/CD pipelines to detect code changes using Git diffs and AST analysis to generate documentation automatically.",
    tech: ["CI/CD", "GitHub Actions", "AST Analysis", "Automation"],
    link: "https://github.com/kireeti-ai/ci-living-documentation"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 bg-[#050505] relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-16 text-white font-mono glitch-text" data-text="02. DEPLOYMENTS">
          <span className="text-[#00ff9d]">02.</span> DEPLOYMENTS
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="holo-card p-8 rounded-xl group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <Folder className="text-[#00ff9d]" size={40} />
                <div className="flex gap-4">
                  <a href={project.link} target="_blank" className="text-gray-400 hover:text-white hover:scale-110 transition-transform">
                    <Github size={20} />
                  </a>
                  <ExternalLink size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 font-mono group-hover:text-[#00ff9d] transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span key={t} className="text-xs font-mono text-[#00ff9d] bg-[#00ff9d]/10 px-2 py-1 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;