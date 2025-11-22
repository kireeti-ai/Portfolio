import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const profilePicPath = '/profile_pic.jpeg';

const About = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="about-container">
        <h2>About Me</h2>

        <div className="about-content">
          <img src={profilePicPath} alt="Kireeti" className="profile-pic" />

          <div className="about-text">
            <h3>Hi, I'm Kireeti.</h3>

            <p>
              I'm a pre-final year Computer Science student at Amrita Vishwa Vidyapeetham,
              focused on building scalable software and solving real-world problems through 
              clean backend architecture and full-stack development.
            </p>

            <p>
              I specialize in <strong>Java, Spring Boot, React.js, Node.js</strong>, and work extensively
              with REST APIs, databases, and modern development tools. Alongside full-stack engineering,
              I also explore <strong>Machine Learning</strong> — applying models to create data-driven,
              intelligent applications.
            </p>

            <p>
              I enjoy building systems end-to-end, whether it's crafting fast backend services,
              designing interactive frontends, or integrating ML pipelines. My goal is to grow
              as a Software Development Engineer (SDE) and contribute to impactful, high-quality projects.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;