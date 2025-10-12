import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt, FaCertificate, FaLanguage } from 'react-icons/fa';

const Education = () => {
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    // Load data from Firebase
    const loadData = async () => {
      const { getEducation, getCertifications, getLanguages } = await import('../firebase/services');
      const eduData = await getEducation();
      const certData = await getCertifications();
      const langData = await getLanguages();
      
      setEducation(eduData);
      setCertifications(certData);
      setLanguages(langData);
    };
    loadData();
  }, []);

  return (
    <section id="education" className="section-padding bg-dark-soft">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="section-title text-gradient">Educación y Certificaciones</h2>
          <p className="section-subtitle">
            Formación académica y desarrollo profesional continuo
          </p>
        </motion.div>

        {/* Education */}
        <div className="row g-4 mb-5">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              className="col-lg-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="card-premium h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <FaGraduationCap className="text-orange" size={40} />
                  <span className="badge-custom">{edu.status}</span>
                </div>

                <h4 className="text-white fw-bold mb-2">{edu.degree}</h4>
                <p className="text-orange mb-3">{edu.institution}</p>

                <div className="d-flex flex-wrap gap-3 mb-3">
                  <div className="d-flex align-items-center text-light small">
                    <FaCalendar className="text-yellow me-2" />
                    {edu.period}
                  </div>
                  <div className="d-flex align-items-center text-light small">
                    <FaMapMarkerAlt className="text-yellow me-2" />
                    {edu.location}
                  </div>
                </div>

                <p className="text-light small mb-3">{edu.description}</p>

                <div className="glass-light p-3 rounded-3">
                  <h6 className="text-yellow mb-2 small fw-bold">Destacados:</h6>
                  <ul className="text-light small mb-0">
                    {edu.highlights.map((highlight, idx) => (
                      <li key={idx} className="mb-1">{highlight}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <h3 className="text-gradient mb-4 text-center">Certificaciones</h3>
          <div className="row g-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                className="col-lg-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="glass p-4 rounded-4 h-100">
                  <div className="d-flex align-items-start mb-3">
                    <FaCertificate className="text-orange me-3" size={30} />
                    <div>
                      <h5 className="text-white mb-1">{cert.name}</h5>
                      <p className="text-yellow small mb-1">{cert.issuer}</p>
                      <p className="text-light small mb-0">{cert.date}</p>
                    </div>
                  </div>
                  <p className="text-light small mb-0">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-gradient mb-4 text-center">Idiomas</h3>
          <div className="row g-4 justify-content-center">
            {languages.map((lang, index) => (
              <motion.div
                key={lang.id}
                className="col-lg-4 col-md-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="card-premium">
                  <div className="d-flex align-items-center mb-3">
                    <FaLanguage className="text-orange me-3" size={40} />
                    <div className="flex-grow-1">
                      <h5 className="text-white mb-1">{lang.language}</h5>
                      <p className="text-yellow small mb-0">{lang.level}</p>
                    </div>
                  </div>
                  
                  <div className="skill-progress">
                    <motion.div
                      className="skill-progress-bar"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.proficiency}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
