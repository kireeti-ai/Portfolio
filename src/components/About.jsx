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

I enjoy transforming ideas into responsive user interfaces and building efficient backend systems. I’m currently looking for opportunities to apply my skills, contribute meaningfully to real-world projects, and grow as a developer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;