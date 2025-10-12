import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import { personalInfo as defaultPersonalInfo } from '../data/portfolioData';

const Home = () => {
  const [personalInfo, setPersonalInfo] = useState(defaultPersonalInfo);

  useEffect(() => {
    // Load personal info from Firebase
    const loadPersonalInfo = async () => {
      const { getPersonalInfo } = await import('../firebase/services');
      const data = await getPersonalInfo();
      setPersonalInfo(data);
    };
    loadPersonalInfo();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      {/* Animated Blobs */}
      <div className="hero-blob hero-blob-1"></div>
      <div className="hero-blob hero-blob-2"></div>
      <div className="hero-blob hero-blob-3"></div>

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row align-items-center">
          <div className="col-lg-8 mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="badge-custom glass mb-4">
                <FaMapMarkerAlt className="me-2" />
                {personalInfo.location} | {personalInfo.age} años
              </div>
              
              <h1 className="display-3 display-md-1 fw-bold mb-3">
                Hola, soy <span className="text-gradient">{personalInfo.name}</span>
              </h1>
              
              <h2 className="h3 text-yellow mb-4">
                {personalInfo.subtitle}
              </h2>
              
              <p className="lead mb-4 text-light" style={{ maxWidth: '700px', margin: '0 auto' }}>
                {personalInfo.profileSummary}
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                <motion.button 
                  className="btn btn-orange"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                >
                  Ver Proyectos
                </motion.button>
                
                <motion.button 
                  className="btn btn-outline-orange"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                >
                  Contactar
                </motion.button>
              </div>

              {/* Contact Info */}
              <div className="glass p-4 rounded-4 mb-4">
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <FaEnvelope className="text-orange me-2" />
                      <a href={`mailto:${personalInfo.email}`} className="text-light text-decoration-none">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <FaPhone className="text-orange me-2" />
                      <a href={`tel:${personalInfo.phone}`} className="text-light text-decoration-none">
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <FaMapMarkerAlt className="text-orange me-2" />
                      <span className="text-light">{personalInfo.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="d-flex justify-content-center gap-3">
                <motion.a 
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub />
                </motion.a>
                
                <motion.a 
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin />
                </motion.a>
                
                <motion.a 
                  href={`mailto:${personalInfo.email}`}
                  className="social-icon"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaEnvelope />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
