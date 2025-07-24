import React from 'react';
import './Skill.css';

const Skill = () => {
  const skills = {
    'Programming Languages': [ 'Python', 'C++','Java', 'C'],
    'Frontend': ['React.Js', 'HTML','CSS'],
    // 'Backend': ['Node.js', 'Flask', 'Express.js', 'FastAPI'],
    'Databases': ['MongoDB', 'MySQl'],
    'Dev Tools': ['Git', 'GitHub', 'Docker', 'Vercel', 'Jupyter Notebook', 'Kaggle'],
    'Machine Learning': ['Supervised Learning', 'Unsupervised Learning'],
    'Deep Learning': ['Neural Networks', 'TensorFlow', 'PyTorch'],
    'AI/ML Frameworks': ['Scikit-learn'],
    'Data Science': ['NumPy', 'Pandas'],

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