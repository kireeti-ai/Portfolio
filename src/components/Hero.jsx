import React, { useEffect, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
<h1 className={`hero-title ${isLoaded ? 'fade-in' : ''}`}>Innovating at the Intersection of Code and Intelligence.</h1>
      
        <p className={`hero-subtitle ${isLoaded ? 'fade-in delay-1' : ''}`}>
          Aspiring Full Stack Developer with a strong foundation in React and Node.js, currently deepening knowledge in AI/ML and exploring entrepreneurial opportunities.
        </p>
        <div className={`hero-cta-buttons ${isLoaded ? 'fade-in delay-2' : ''}`}>
          <a href="#projects" className="cta-button primary-cta">
            Explore My Work
          </a>
<a href="/kireeti_resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-button primary-cta">
  View Resume
</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;