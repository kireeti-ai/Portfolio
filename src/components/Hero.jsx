import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
      <div className="max-w-4xl w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/30 border border-green-500/30 text-green-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM ONLINE
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-mono">
            Building Scalable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-blue-500">
              Software Systems
            </span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed font-sans">
            Aspiring SDE specializing in <span className="text-white font-semibold">Java, Spring Boot</span>, and <span className="text-white font-semibold">Full-Stack Architecture</span>. 
            Merging efficient backend logic with intelligent ML-driven applications.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="tech-btn group">
              Explore Projects <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
            
            <a 
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="tech-btn"
              style={{ borderColor: '#333', color: '#999' }}
            >
              <Download size={18} /> Resume
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Grid Overlay (optional if not using Vanta) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
    </section>
  );
};

export default Hero;