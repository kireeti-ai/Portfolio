import React from 'react';
import './Skill.css'
const skillsList = [ "C++","Python","JavaScript", "React", "HTML5", "CSS3" ,"DBMS","OOPS"];

const Skills = () => {
  return (
    <section id="skills" className="skills section">
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <div className="skills-grid">
          {skillsList.map((skill, index) => (
            <div className="skill-item" key={index}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;