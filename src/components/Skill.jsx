import React from 'react';
import './Skill.css';

const Skill = () => {
  const skills = {
    'Programming Languages': ['Java', 'Python', 'C++', 'JavaScript'],
    'Frontend': ['React.js', 'HTML5', 'CSS3'],
    'Backend': ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs'],
    'Databases': ['MySQL', 'MongoDB', 'PostgreSQL'],
    'Cloud & DevOps': ['Docker', 'Jenkins', 'Azure', 'CI/CD Pipelines'],
    'Core CS & DSA': ['OOP', 'Data Structures', 'Algorithms', 'DBMS', 'OS'],
    'AI/ML Frameworks': ['Scikit-learn', 'Random Forest', 'Regression', 'Classification'],
    'Data Science': ['NumPy', 'Pandas'],
    'Developer Tools': ['Git', 'GitHub', 'Postman', 'VS Code', 'IntelliJ']
  };

  return (
    <section id="skills-section-unique" className="skills-container">
      <h2>My Skills</h2>
      <div className="skills-grid-layout">
        {Object.entries(skills).map(([category, items]) => (
          <div className="skill-category-card" key={category}>
            <h3>{category}</h3>
            <ul className="skill-items-list">
              {items.map((skill, index) => (
                <li key={index} className="skill-item-tag">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skill;