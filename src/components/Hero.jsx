import React from 'react';
import './Hero.css'
const Hero = () => {
  return (
    <section className="hero section">
      <div className="container">
        <h1 className="hero-title">Kireeti</h1>
        <p className="hero-subtitle">
          Computer Science Engineering @Amrita Coimbatore || Full Stack Developer in Training || ReactJS || C++ || Exploring AI& Startup Ideas || Open to Internship 
        </p>
        <a href="#projects" className="cta-button">
          See My Work
        </a>
      </div>
    </section>
  );
};

export default Hero;