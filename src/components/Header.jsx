import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Code } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle Scroll Effects & Active Section Detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple active section detection
      const sections = ['hero', 'about', 'skills-section-unique', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= 200) {
            setActiveSection(section === 'hero' ? '//home' : `//${section.replace('-section-unique', '')}`);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '//home', href: '#hero' },
    { name: '//about', href: '#about' },
    { name: '//skills', href: '#skills-section-unique' },
    { name: '//projects', href: '#projects' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-[#333]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* LOGO AREA */}
          <div className="flex-shrink-0 flex items-center gap-3 group cursor-pointer">
            <div className="p-2 bg-[#00ff9d]/10 rounded border border-[#00ff9d]/20 group-hover:border-[#00ff9d] transition-colors">
              <Terminal className="text-[#00ff9d]" size={20} />
            </div>
            <span className="text-xl font-bold font-mono tracking-tighter text-white glitch-text" data-text="KIREETI.V">
              KIREETI<span className="text-[#00ff9d]">.V</span>
            </span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded text-sm font-mono transition-all duration-300 group overflow-hidden
                    ${activeSection === link.name ? 'text-[#00ff9d]' : 'text-gray-400 hover:text-white'}`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {activeSection === link.name && <span className="text-[#00ff9d] animate-pulse">&gt;</span>}
                    {link.name}
                  </span>
                  {/* Hover Background Slide */}
                  <div className="absolute inset-0 bg-[#00ff9d]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
              ))}

              {/* CTA Button */}
              <a href="#contact" className="ml-4 px-5 py-2 bg-[#00ff9d] text-black font-bold font-mono text-sm rounded hover:bg-white transition-colors flex items-center gap-2">
                <Code size={16} />
                HIRE_ME
              </a>
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-[#00ff9d] transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* SCROLL PROGRESS BAR */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#00ff9d] origin-left shadow-[0_0_10px_#00ff9d]"
        style={{ scaleX }}
      />

      {/* MOBILE MENU OVERLAY */}
      <div className={`absolute top-full left-0 w-full bg-[#050505] border-b border-[#333] shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 text-gray-400 hover:text-[#00ff9d] hover:bg-[#111] rounded font-mono border-l-2 border-transparent hover:border-[#00ff9d] transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="block mt-4 px-4 py-3 bg-[#00ff9d]/10 text-[#00ff9d] border border-[#00ff9d]/30 text-center font-mono rounded"
            onClick={() => setIsOpen(false)}
          >
            INITIALIZE_CONTACT
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;