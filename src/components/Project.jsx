import React from 'react';
import './Project.css';

const projectData = [
  {
    title: "SnapDish – Food Delivery Website",
    image: "/Snap_dish.png",
    description:
      "A full-stack MERN food delivery platform featuring restaurant listings, cart management, order handling, and secure JWT authentication. Built with a responsive UI and RESTful API architecture for smooth end-to-end ordering.",
    techStack: ["React.js", "CSS", "Node.js", "Express.js", "MongoDB", "JWT"],
    codeLink: "https://github.com/kireeti-ai/snap-dish"
  },

  {
    title: "Quiz Application",
    image: "/quiz.png",
    description:
      "A full-stack quiz platform built with React and Spring Boot. Includes user authentication, category-based quizzes, score tracking, and admin CRUD operations. Data is stored in MySQL with secure backend APIs.",
    techStack: ["React.js", "Spring Boot", "MySQL", "REST API", "Spring Security"],
    codeLink: "https://github.com/kireeti-ai/Quiz"
  },

  {
    title: "Air Quality Prediction System",
    image: "/air_quality.png",
    description:
      "An ML-powered AQI prediction system achieving 90%+ accuracy using a Random Forest Regressor. Features a Flask backend API, React UI, CI/CD deployment with Docker & Jenkins, and real-time weather data integration.",
    techStack: ["Python", "Flask", "React.js", "Random Forest", "Docker", "Jenkins", "OpenWeather API"],
    codeLink: "https://github.com/kireeti-ai/air-quality-prediction"
  },

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