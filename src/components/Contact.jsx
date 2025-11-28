import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Github, Terminal, AlertCircle, CheckCircle } from 'lucide-react';
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
        setFormStatus('error: Failed to send message.');
      }
    } catch (error) {
      setFormStatus('error: Network error. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#00ff9d]">04.</span> Initialize Comms
        </motion.h2>

        <div className="contact-grid">
          
          {/* Left Side: The Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-header">
              <Terminal size={18} className="text-[#00ff9d]" />
              <span className="mono-font text-sm text-gray-400">send_message.exe</span>
            </div>
            
            <p className="contact-intro-text mono-font">
              &gt; Have a project idea? Initiating handshake protocol...
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="mono-font">Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter identifier..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="mono-font">Email *</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="name@domain.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="mono-font">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="Topic of discussion..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="mono-font">Message *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                  placeholder="Input data stream here..."
                ></textarea>
              </div>

              <button type="submit" className="tech-btn w-full justify-center" disabled={formStatus === 'submitting'}>
                {formStatus === 'submitting' ? (
                  <span className="animate-pulse">Transmitting...</span>
                ) : (
                  <>Send Transmission <Send size={16} /></>
                )}
              </button>

              {formStatus && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`form-status ${formStatus === 'success' ? 'success' : 'error'}`}
                >
                  {formStatus === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  <span>{formStatus.replace('error: ', '')}</span>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Right Side: Direct Links (Terminal Style) */}
          <motion.div 
            className="contact-info-wrapper"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="terminal-card">
              <div className="terminal-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
                <span className="ml-2 text-xs text-gray-500">root@kireeti-server</span>
              </div>
              
              <div className="terminal-body">
                <div className="mb-4 text-gray-400">
                  <span className="text-[#00ff9d]">$</span> ls -la contacts/
                </div>

                <div className="direct-links">
                  <a href="mailto:vkireeti16@gmail.com" className="terminal-link">
                    <Mail size={18} /> 
                    <span className="hover-text">vkireeti16@gmail.com</span>
                  </a>
                  
                  <a href="https://www.linkedin.com/in/kireeti-v" target="_blank" rel="noopener noreferrer" className="terminal-link">
                    <Linkedin size={18} /> 
                    <span className="hover-text">linkedin/in/kireeti-v</span>
                  </a>
                  
                  <a href="https://www.github.com/kireeti-ai" target="_blank" rel="noopener noreferrer" className="terminal-link">
                    <Github size={18} /> 
                    <span className="hover-text">github.com/kireeti-ai</span>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-[#333]">
                  <p className="text-gray-500 text-sm mono-font">
                    <span className="text-[#00ff9d]">System:</span> Ready for collaboration.<br/>
                    <span className="text-[#00ff9d]">Location:</span> India<br/>
                    <span className="text-[#00ff9d]">Ping:</span> 24ms
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;