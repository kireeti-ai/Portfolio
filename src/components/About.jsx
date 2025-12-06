import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.5fr] gap-12 items-center">
        
        {/* IMAGE SIDE (Left) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* The Cyber Border Effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#00ff9d] to-blue-600 rounded-lg opacity-20 group-hover:opacity-60 blur-lg transition duration-500"></div>
          
          <div className="relative rounded-lg overflow-hidden border-2 border-[#333] group-hover:border-[#00ff9d] transition duration-300">
            <img 
              src="/profile_pic.jpeg" 
              alt="Kireeti" 
              className="w-full h-auto grayscale group-hover:grayscale-0 transition duration-500 object-cover"
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] opacity-10 pointer-events-none mix-blend-overlay"></div>
          </div>
        </motion.div>

        {/* TEXT SIDE (Right) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-left mb-6">
            <span className="text-[#00ff9d]">01.</span> About Me
          </h2>
          
          <div className="space-y-4 text-gray-400 text-lg leading-relaxed mb-8">
            <p>
              I am a pre-final year Computer Science student at <span className="text-white font-semibold">Amrita Vishwa Vidyapeetham</span>.
            </p>
            <p>
              I specialize in building robust backend systems with <span className="text-[#00ff9d]">Java & Spring Boot</span> 
              and creating high-performance frontends. My research focuses on integrating <span className="text-white">Machine Learning</span> models 
              into scalable web architectures.
            </p>
          </div>

          {/* Mini Terminal Info - FIXED THE '>' CHARACTERS BELOW */}
          <div className="bg-[#0a0a0a] border border-[#333] rounded p-4 font-mono text-sm text-gray-300">
            <p><span className="text-[#00ff9d]">&gt;</span> current_location: <span className="text-blue-400">"India"</span></p>
            <p><span className="text-[#00ff9d]">&gt;</span> education: <span className="text-blue-400">"B.Tech CSE (2027)"</span></p>
            <p><span className="text-[#00ff9d]">&gt;</span> interests: <span className="text-yellow-400">["Backend Engineering", "Machine Learning", "Full-Stack Development"]</span></p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;