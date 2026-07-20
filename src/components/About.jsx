import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, MapPin, Calendar, User, Briefcase } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="py-32 px-6 relative bg-[#050505] overflow-hidden">
      {/* Background Decor: Binary/Grid hints */}
      <div className="absolute top-20 right-0 text-[10rem] font-bold text-[#111] opacity-50 select-none pointer-events-none -z-10 font-mono">
        01
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-16 items-center">

        {/* LEFT: THE CYBER IMAGE SCANNER */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* HUD Corner Brackets */}
          <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#00ff9d] z-20"></div>
          <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#00ff9d] z-20"></div>
          <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#00ff9d] z-20"></div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#00ff9d] z-20"></div>

          {/* The Image Container */}
          <div className="relative rounded overflow-hidden border border-[#333] bg-[#111]">
            <img
              src="/profile_pic.jpeg"
              alt="Profile"
              className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700 object-cover"
            />

            {/* The Scanning Line Animation */}
            <div className="scanner-line"></div>

            {/* Overlay Tint */}
            <div className="absolute inset-0 bg-[#00ff9d] opacity-10 mix-blend-overlay"></div>
          </div>
        </motion.div>


        {/* RIGHT: THE SYSTEM DATA */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          {/* Glitch Title */}
          <h2 className="text-4xl font-bold mb-8 text-white font-mono flex items-center gap-3">
            <span className="text-[#00ff9d]">01.</span>
            <span className="glitch-text" data-text="SYSTEM_PROFILE">SYSTEM_PROFILE</span>
          </h2>

          {/* The Professional Bio */}
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed mb-10 font-sans border-l-2 border-[#333] pl-6">
            <p>
              I am a <span className="text-white font-semibold">Software Developer</span> in training, currently decoding complex systems at <span className="text-[#00ff9d]">Amrita Vishwa Vidyapeetham</span>.
            </p>
            <p>
              My focus lies in engineering <span className="text-white">high-performance backends</span> using Java & Spring Boot, while crafting intuitive frontend experiences. I bridge the gap between abstract logic and user interaction, with a focus on integrating <span className="text-[#00ff9d]">Machine Learning</span> pipelines into live web applications.
            </p>
          </div>

          {/* The "Terminal" Data Block */}
          <div className="bg-[#0f0f0f] border border-[#333] rounded-lg p-6 relative group overflow-hidden">
            {/* Header of the fake terminal */}
            <div className="flex items-center justify-between mb-4 border-b border-[#222] pb-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              </div>
              <span className="text-xs text-gray-600 font-mono">user_data.json</span>
            </div>

            {/* The Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={16} className="text-[#00ff9d]" />
                <span>Loc: <span className="text-gray-500">India, IN</span></span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Briefcase size={16} className="text-[#00ff9d]" />
                <span>Exp: <span className="text-gray-500">Final Year</span></span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <User size={16} className="text-[#00ff9d]" />
                <span>Age: <span className="text-gray-500">20</span></span>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <Cpu size={16} className="text-[#00ff9d]" />
                <span>Focus: <span className="text-yellow-400">Backend + ML</span></span>
              </div>
            </div>

            {/* Terminal Prompt at bottom */}
            <div className="mt-6 pt-4 border-t border-[#222] text-[#00ff9d] animate-pulse">
              _ ready to collaborate
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default About;