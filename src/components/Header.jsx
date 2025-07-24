import React from 'react';

import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <a className="nav-link" href="#about">About</a>
          <a href="#skills-section-unique" className="nav-link">Skills</a>
          <a className="nav-link" href="#projects">Projects</a>
          <a className="nav-link" href="#contact">Contact</a>
          <a className="nav-link" href="/kireeti_resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </nav>
      </div>
    </header>
  );  
};

export default Header;