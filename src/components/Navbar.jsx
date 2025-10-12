import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav 
      className={`navbar navbar-expand-lg navbar-custom fixed-top ${scrolled ? 'shadow-lg' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <FaCode className="text-gradient me-2" size={30} />
          <span className="text-gradient fw-bold fs-4">Saúl Álvarez</span>
        </a>
        
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ color: 'var(--color-orange)' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                Proyectos
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }}>
                Habilidades
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#experience" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }}>
                Experiencia
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#education" onClick={(e) => { e.preventDefault(); scrollToSection('education'); }}>
                Educación
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
