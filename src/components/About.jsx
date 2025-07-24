import React from 'react';
import './About.css'
const About = () => {
  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title">Kireeti</h2>
        <div className="about-content">
          <img src="./profile_pic.jpeg" alt="Your Name" className="profile-pic" />
          <div className="about-text">
            <p>
I’m  Kireeti, a pre-final year B.Tech student at Amrita Vishwa Vidyapeetham, Coimbatore, with a strong interest in full stack web development.

Beyond full-stack development, I have a strong passion for Machine Learning and Artificial Intelligence. I'm actively exploring concepts like deep learning, computer vision, and natural language processing, gaining hands-on experience with frameworks such as TensorFlow and PyTorch. My goal is to apply these cutting-edge technologies to build intelligent and impactful applications, and I'm eager to contribute to projects that push the boundaries of AI.            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;