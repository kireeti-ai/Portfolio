import React from 'react';
import { motion } from 'framer-motion';

const skills = {
  'Programming Languages': ['Java', 'Python', 'JavaScript', 'C', 'SQL', 'NoSQL'],
  'Frontend': ['React.js', 'HTML5', 'CSS3'],
  'Backend': ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs'],
  'Databases': ['MySQL', 'MongoDB'],
  'Cloud & DevOps': ['AWS', 'Docker'],
  'Developer Tools & IDEs': [
    'Git',
    'VS Code',
    'IntelliJ IDEA',
    'Visual Studio',
    'Eclipse'
  ],
  'Core CS & DSA': [
    'OOP',
    'Data Structures',
    'Algorithms',
    'DBMS',
    'Operating Systems',
    'Computer Networks (CN)'
  ]
};

const Skills = () => {
  return (
    <section id="skills-section-unique" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          <span className="text-[#00ff9d]">03.</span> Tech Stack
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0f0f0f] border border-[#333] p-6 rounded hover:bg-[#151515] transition-colors"
            >
              <h3 className="text-[#00ff9d] font-mono text-xl mb-4 border-b border-[#333] pb-2">
                 &gt; {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span key={skill} className="text-gray-300 text-sm font-mono hover:text-white transition-colors">
                    [{skill}]
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;