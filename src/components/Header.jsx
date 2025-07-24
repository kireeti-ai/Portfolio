import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }

    const sections = document.querySelectorAll('section[id]');
    let currentActive = 'hero';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (offset >= sectionTop && offset < sectionBottom) {
        currentActive = section.id;
      }
    });
    setActiveSection(currentActive);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={scrolled ? 'header scrolled' : 'header'}>
      <a href="#hero" className="header-brand">Kireeti's Porfolio</a>
      
      <nav className="main-nav">
        <ul>
          <li><a href="#hero" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}>Home</a></li>
          <li><a href="#about" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
          <li><a href="#skills-section-unique" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'skills-section-unique' ? 'active' : ''}`}>Skills</a></li>
          <li><a href="#projects" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
          <li><a href="#contact" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
        
          <li><a href="/Kireeti_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="nav-link">Resume</a></li>
        </ul>
      </nav>

      <div 
        className={`hamburger-menu ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={toggleMobileMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#hero" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}>Home</a></li>
          <li><a href="#about" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</a></li>
          <li><a href="#skills-section-unique" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'skills-section-unique' ? 'active' : ''}`}>Skills</a></li>
          <li><a href="#projects" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</a></li>
          {/* This link was already correct */}
          <li><a href="/Kireeti_Resume.pdf" target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="nav-link">Resume</a></li>
          <li><a href="#contact" onClick={closeMobileMenu} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;