import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error: Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error: Failed to send message. Please try again later.');
      }
    } catch (error) {
      setFormStatus('error: Network error. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-container">
        <div className="contact-form-wrapper">
          <p className="contact-intro-text">
            Have a question, a project idea, or just want to say hello? Fill out the form below, and I'll get back to you as soon as possible!
          </p>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                required 
              ></textarea>
            </div>
            <button type="submit" className="submit-button" disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus && formStatus !== 'submitting' && (
              <p className={`form-status ${formStatus.startsWith('error') ? 'error' : 'success'}`}>
                {formStatus.replace('error: ', '')}
              </p>
            )}
          </form>
        </div>

        <div className="contact-info-links">
          <h3>Connect Directly</h3>
          <p>Prefer to reach out through other channels?</p>
          <div className="direct-links">
            <a href="mailto:vkireeti16@gmail.com" className="contact-link" target="_blank" rel="noopener noreferrer">
              Email
            </a>
            <a href="https://www.linkedin.com/in/kireeti-v" className="contact-link" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="https://www.github.com/kireeti-ai" className="contact-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;