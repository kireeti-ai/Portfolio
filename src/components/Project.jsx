import React from 'react';
import './Project.css';

const projectData = [
    {
        title: "SnapDish",
        description: "A vibrant social media platform for food enthusiasts. Users can share photos of their meals, discover new recipes, and connect with a community of food lovers.",
        image: './Snap_dish.png',
        codeLink:"https://github.com/kireeti-ai/SnapDish" 
    },
    {
        title: "Mobile Network Simulation System",
        description:  " Models cellular network components like zones, towers, and users to simulate dynamic connectivity, call routing, and network switching. ",

        image: './project.jpeg', 
     
        codeLink: "https://github.com/kireeti-ai/Network-simulation"  
    }

];

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="project-grid">
          {projectData.map((project, index) => (
            <div className="project-card" key={index}>
              <img src={project.image} alt={project.title} />
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">

                  <a href={project.codeLink} target="_blank" rel="noopener noreferrer">View Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;