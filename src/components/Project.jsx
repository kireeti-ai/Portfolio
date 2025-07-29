import React from 'react';
import './Project.css';

const projectData = [
    {
        title: "SnapDish",
        image: "/Snap_dish.png",
        description: "A complete food delivery web application built with the MERN stack (MongoDB, Express, React, Node.js). This project features a dynamic frontend, a RESTful API for handling data and orders, and a clean, intuitive user interface for a seamless, end-to-end ordering experience",
        techStack: ["React.Js","CSS", "Node.Js", "Express.Js", "MongoDB"],
        codeLink: "https://github.com/kireeti-ai/SnapDish"
    },
    {
        title: "Mobile Network Simulation",
        image: "/project.jpeg",
        description: "An object-oriented simulation in Python that models a cellular network's components and behavior. This project represents the network of cell towers as a graph and implements a Breadth-First Search (BFS) algorithm to find the most efficient call routes. Hash maps are used for fast, O(1) lookups of users and towers, ensuring the simulation remains performant as the network scales.x",
          techStack: ["Python", "Object-Oriented Programming"],
        codeLink: "https://github.com/kireeti-ai/Network-simulation"
    }
];

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <img src={project.image} alt={`${project.title} screenshot`} className="project-image" />
    <div className="project-content">
      <h3>{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-tech-stack">
        {project.techStack.map((tech, index) => (
          <li key={index} className="tech-tag">{tech}</li>
        ))}
      </ul>
      <div className="project-links">
        <a href={project.codeLink} target="_blank" rel="noopener noreferrer" className="button-secondary">
          View Code
        </a>
      </div>
    </div>
  </div>
);

const Projects = () => {
  return (
    <section id="projects">
      <h2 className="section-title">My Projects</h2>
      <div className="project-grid">
        {projectData.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;