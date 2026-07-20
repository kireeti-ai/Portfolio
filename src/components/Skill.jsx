import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Globe, Database, Server, Code, Layers } from 'lucide-react';
import './Skill.css';

// Importing Brand Icons
import {
  FaJava, FaPython, FaJs, FaReact, FaHtml5, FaCss3,
  FaNodeJs, FaDocker, FaAws, FaGitAlt, FaLinux, FaWindows
} from 'react-icons/fa';
import { SiSpringboot, SiMongodb, SiPostgresql, SiExpress, SiTailwindcss, SiIntellijidea } from 'react-icons/si';

const categories = {
  "LANGUAGES": {
    icon: <Code size={20} />,
    description: "Core fluency in systems & logic.",
    tech: [
      { name: "Java", icon: <FaJava color="#f89820" /> },
      { name: "Python", icon: <FaPython color="#3776ab" /> },
      { name: "JavaScript", icon: <FaJs color="#f7df1e" /> },
      { name: "SQL", icon: <Database color="#ddd" /> }
    ]
  },
  "FRONTEND": {
    icon: <Globe size={20} />,
    description: "Building pixel-perfect interfaces.",
    tech: [
      { name: "React", icon: <FaReact color="#61dafb" /> },
      { name: "HTML5", icon: <FaHtml5 color="#e34f26" /> },
      { name: "CSS3", icon: <FaCss3 color="#1572b6" /> },
      { name: "Tailwind", icon: <SiTailwindcss color="#38bdf8" /> }
    ]
  },
  "BACKEND": {
    icon: <Server size={20} />,
    description: "Scalable server-side architecture.",
    tech: [
      { name: "Spring Boot", icon: <SiSpringboot color="#6db33f" /> },
      { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
      { name: "Express", icon: <SiExpress color="#fff" /> },
      { name: "REST APIs", icon: <Globe color="#a855f7" /> }
    ]
  },
  "DATABASE": {
    icon: <Database size={20} />,
    description: "Data persistence & optimization.",
    tech: [
      { name: "MongoDB", icon: <SiMongodb color="#47a248" /> },
      { name: "PostgreSQL", icon: <SiPostgresql color="#336791" /> },
    ]
  },
  "DEVOPS": {
    icon: <Cpu size={20} />,
    description: "CI/CD, Cloud & Containerization. Hands-on with AWS (S3, EC2, IAM, RDS, Lambda, ECR, ECS, EKS).",
    tech: [
      { name: "AWS", icon: <FaAws color="#ff9900" /> },
      { name: "Docker", icon: <FaDocker color="#2496ed" /> },
      { name: "Linux", icon: <FaLinux color="#fff" /> },
      { name: "Git", icon: <FaGitAlt color="#f05032" /> },
      { name: "Agile / Scrum", icon: <Layers color="#fff" /> }
    ]
  },
  "TOOLS": {
    icon: <Terminal size={20} />,
    description: "My daily drivers.",
    tech: [
      { name: "VS Code", icon: <Code color="#007acc" /> },
      { name: "IntelliJ", icon: <SiIntellijidea color="#ff3668" /> },
      { name: "Windows", icon: <FaWindows color="#0078d7" /> }
    ]
  }
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState("LANGUAGES");

  return (
    <section id="skills-section" className="skills-container">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <span className="text-[#00ff9d]">03.</span>
            <span className="glitch-text" data-text="TECH_STACK">TECH_STACK</span>
          </h2>
          <div className="h-1 w-20 bg-[#00ff9d]"></div>
        </div>

        {/* The Dashboard Interface */}
        <div className="dashboard-layout">
          {/* Sidebar Navigation */}
          <div className="dashboard-sidebar">
            <div className="sidebar-header">
              <Terminal size={16} className="text-gray-500" />
              <span className="text-xs text-gray-500 font-mono">EXPLORER</span>
            </div>

            <div className="sidebar-menu">
              {Object.keys(categories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`menu-item ${activeTab === cat ? 'active' : ''}`}
                >
                  {categories[cat].icon}
                  <span>{cat}</span>
                  {activeTab === cat && <motion.div layoutId="active-pill" className="active-indicator" />}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="dashboard-viewport">
            <div className="viewport-header">
              <span className="text-gray-500 font-mono text-sm">root@kireeti:~/skills/{activeTab.toLowerCase()}</span>
              <div className="window-controls">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>

            <div className="viewport-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="category-meta mb-8">
                    <h3 className="text-3xl font-bold text-white mb-2">{activeTab}</h3>
                    <p className="text-gray-400 font-mono text-sm border-l-2 border-[#00ff9d] pl-3">
                      // {categories[activeTab].description}
                    </p>
                  </div>

                  <div className="tech-grid">
                    {categories[activeTab].tech.map((item, idx) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="tech-card"
                      >
                        <div className="tech-icon">{item.icon}</div>
                        <span className="tech-name">{item.name}</span>
                        <div className="tech-glow"></div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;