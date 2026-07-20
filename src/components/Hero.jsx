import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download, Terminal } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-10 px-6 relative overflow-hidden">
      <div className="max-w-5xl w-full z-10 grid md:grid-cols-[1.5fr_1fr] gap-12 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00ff9d]/10 border border-[#00ff9d]/30 text-[#00ff9d] text-xs font-mono mb-6">
            <span className="w-2 h-2 bg-[#00ff9d] rounded-full animate-pulse"></span>
            SYSTEM ONLINE
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-mono glitch-text" data-text="BUILDING_FUTURE">
            BUILDING <br />
            <span className="text-[#00ff9d]">DIGITAL_SYSTEMS</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 leading-relaxed font-sans border-l-2 border-[#333] pl-6">
            Aspiring SDE specializing in <span className="text-white">High-Scale Backend</span> & <span className="text-white">Intelligent Systems</span>.
            Currently building solutions at <span className="text-[#00ff9d]">Amrita Vishwa Vidyapeetham</span>.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="flex items-center gap-2 bg-[#00ff9d] text-black px-8 py-3 rounded font-bold hover:bg-white transition-colors">
              Initialize Projects <ChevronRight size={20} />
            </a>

            <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 border border-[#333] text-gray-300 px-8 py-3 rounded hover:border-[#00ff9d] hover:text-[#00ff9d] transition-colors">
              <Download size={20} /> Download CV
            </a>
          </div>
        </motion.div>

        {/* Hero Visual (Abstract Terminal) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:block bg-[#111] border border-[#333] rounded-lg p-6 shadow-2xl relative"
        >
            <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="font-mono text-sm space-y-2">
                <div className="text-gray-400">root@kireeti:~$ <span className="text-[#00ff9d]">init_portfolio.sh</span></div>
                <div className="text-blue-400">Loading modules...</div>
                <div className="text-green-500">[OK] Core Systems</div>
                <div className="text-green-500">[OK] AI Pipelines</div>
                <div className="text-green-500">[OK] Backend Architecture</div>
                <div className="text-gray-400 animate-pulse">_</div>
            </div>
            {/* Glow effect behind */}
            <div className="absolute -inset-4 bg-[#00ff9d] opacity-10 blur-xl -z-10"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;