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
        <h1 className={`hero-title ${isLoaded ? 'fade-in' : ''}`}>
          Building Scalable Software with Precision and Purpose.
        </h1>

        <p className={`hero-subtitle ${isLoaded ? 'fade-in delay-1' : ''}`}>
          Aspiring Software Developer specializing in Java, Spring Boot, and full-stack development. 
          Passionate about solving real-world problems through clean architecture, 
          efficient backend systems, and intelligent ML-driven applications.
        </p>

        <div className={`hero-cta-buttons ${isLoaded ? 'fade-in delay-2' : ''}`}>
          <a href="#projects" className="cta-button primary-cta">
            Explore My Projects
          </a>

          <a 
            href="/kireeti_resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="cta-button primary-cta"
          >
            View Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;