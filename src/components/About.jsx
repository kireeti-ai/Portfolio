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
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="about-container">
        <h2>About Me</h2>
        <div className="about-content">
          <img src={profilePicPath} alt="Kireeti" className="profile-pic" />
          <div className="about-text">
            <h3>Hi, I'm Kireeti.</h3>
            <p>
              I'm a pre-final year B.Tech student at Amrita Vishwa Vidyapeetham with a strong focus on full-stack web development and a deep passion for Artificial Intelligence.
            </p>
            <p>
              My goal is to build intelligent and impactful applications by merging robust development techniques with cutting-edge AI. I'm actively exploring deep learning, computer vision using frameworks TensorFlow, and I am eager to contribute to projects that push the boundaries of technology.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;