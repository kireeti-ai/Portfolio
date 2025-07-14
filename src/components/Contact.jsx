import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-text">
          I'm always open to discussing new projects or opportunities. Feel free to contact me!
        </p>

        <div className="contact-links">
          <a href="mailto:kireetiv2005@gmail.com" className="cta-button">
            Email 
          </a>
          <a
            href="https://www.linkedin.com/in/kireeti-v-4aa6a71b1/"
            className="cta-button secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/kireeti-ai"
            className="cta-button secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;