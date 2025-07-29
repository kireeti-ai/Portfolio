import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skill';
import Projects from './components/Project';
import Contact from './components/Contact';
import VantaBackground from './components/VantaBackground';

function App() {
  return (
    <div className="App">
      <VantaBackground /> 
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;