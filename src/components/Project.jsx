import React from 'react';
import { Github, ExternalLink, Code } from 'lucide-react';
import { motion } from 'framer-motion';

const projectData = [
{
  title: "SnapDish Delivery",
  desc: "End-to-end food delivery platform built on the MERN stack with a multi-role architecture supporting Restaurant Admins, Delivery Agents, Customers, and a Super Admin. The system manages restaurant onboarding, menu publishing, real-time cart operations, order placement and assignment, delivery workflow tracking, and platform-wide administration. Includes secure JWT-based authentication, role-based access control (RBAC), and scalable REST APIs.",
  tech: ["React", "Node.js", "MongoDB", "Express", "JWT", "RBAC", "REST API"],
  link: "https://github.com/kireeti-ai/snap-dish"
},
  {
    title: "Quiz Application",
    desc: "Interactive quiz platform with Spring Boot backend and MySQL storage.",
    tech: ["Spring Boot", "React", "MySQL", "Security"],
    link: "https://github.com/kireeti-ai/Quiz"
  },
  {
    title: "Air Quality AI",
    desc: "ML prediction system (90% accuracy) using Random Forest & Flask API.",
    tech: ["Python", "Flask", "Scikit-Learn", "Docker"],
    link: "https://github.com/kireeti-ai/air-quality-prediction"
  },
  {
    title: "Network Simulation",
    desc: "Custom network behavior simulator featuring routing logic, congestion handling, and packet-flow visualization.",
    tech: ["Java", "Networking", "Simulation", "Data Structures"],
    link: "https://github.com/kireeti-ai/Network-simulation"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-[#080808]">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          <span className="text-[#00ff9d]">02.</span> Deployed Modules
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#111] border border-[#333] p-6 rounded-lg hover:border-[#00ff9d] transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff9d] transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-[#1a1a1a] rounded-full text-[#00ff9d]">
                  <Code size={24} />
                </div>
                <div className="flex gap-3">
                  <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white">
                    <Github size={20} />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-3 font-mono group-hover:text-[#00ff9d] transition-colors">
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