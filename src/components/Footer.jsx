import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer-custom">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* About */}
          <div className="col-lg-4">
            <h4 className="text-gradient mb-3">José Saúl Álvarez</h4>
            <p className="text-light mb-3">
              Full-Stack Developer apasionado por crear soluciones innovadoras y escalables 
              con tecnologías modernas.
            </p>
            <div className="d-flex gap-3">
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
          </div>

          {/* Contact Info */}
          <div className="col-lg-4">
            <h5 className="text-orange mb-3">Contacto</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center">
                <FaEnvelope className="text-orange me-3" />
                <a href={`mailto:${personalInfo.email}`} className="text-light text-decoration-none">
                  {personalInfo.email}
                </a>
              </div>
              <div className="d-flex align-items-center">
                <FaPhone className="text-orange me-3" />
                <a href={`tel:${personalInfo.phone}`} className="text-light text-decoration-none">
                  {personalInfo.phone}
                </a>
              </div>
              <div className="d-flex align-items-center">
                <FaMapMarkerAlt className="text-orange me-3" />
                <span className="text-light">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4">
            <h5 className="text-orange mb-3">Enlaces Rápidos</h5>
            <div className="d-flex flex-column gap-2">
              <a href="#home" className="text-light text-decoration-none hover-scale">
                Inicio
              </a>
              <a href="#projects" className="text-light text-decoration-none hover-scale">
                Proyectos
              </a>
              <a href="#skills" className="text-light text-decoration-none hover-scale">
                Habilidades
              </a>
              <a href="#experience" className="text-light text-decoration-none hover-scale">
                Experiencia
              </a>
              <a href="#education" className="text-light text-decoration-none hover-scale">
                Educación
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-top border-secondary pt-4 text-center">
          <p className="text-light mb-0">
            © {currentYear} José Saúl Álvarez Hernández. Hecho con{' '}
            <FaHeart className="text-orange" /> usando React + Vite + Bootstrap
          </p>
          <p className="text-light small mt-2 mb-0">
            Todos los derechos reservados | Diseñado y desarrollado con pasión
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
