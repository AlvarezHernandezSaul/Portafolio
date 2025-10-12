import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaCalendar, FaTrophy } from 'react-icons/fa';

const Experience = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Load experience from Firebase
    const loadExperience = async () => {
      const { getExperience } = await import('../firebase/services');
      const data = await getExperience();
      setExperiences(data);
    };
    loadExperience();
  }, []);

  return (
    <section id="experience" className="section-padding bg-dark-custom">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="section-title text-gradient">Experiencia Profesional</h2>
          <p className="section-subtitle">
            Trayectoria en desarrollo de software y proyectos destacados
          </p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="timeline-dot"></div>
              
              <div className={`row ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                <div className="col-lg-6">
                  <div className="card-premium">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div>
                        <h3 className="h4 fw-bold text-white mb-2">{exp.title}</h3>
                        <p className="text-orange mb-1 fw-bold">{exp.company}</p>
                        <p className="text-yellow small mb-0">{exp.type}</p>
                      </div>
                      <FaBriefcase className="text-orange" size={30} />
                    </div>

                    {/* Info */}
                    <div className="d-flex flex-wrap gap-3 mb-3">
                      <div className="d-flex align-items-center text-light small">
                        <FaCalendar className="text-orange me-2" />
                        {exp.period}
                      </div>
                      <div className="d-flex align-items-center text-light small">
                        <FaMapMarkerAlt className="text-orange me-2" />
                        {exp.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-light mb-3">{exp.description}</p>

                    {/* Responsibilities */}
                    <div className="mb-3">
                      <h5 className="text-yellow mb-2 small fw-bold">Responsabilidades:</h5>
                      <ul className="text-light small mb-0">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="mb-1">{resp}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="mb-3">
                      <h5 className="text-yellow mb-2 small fw-bold">Tecnologías:</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {exp.technologies.map((tech, idx) => (
                          <span key={idx} className="project-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div className="glass-light p-3 rounded-3">
                      <h5 className="text-green mb-2 small fw-bold d-flex align-items-center">
                        <FaTrophy className="me-2" /> Logros:
                      </h5>
                      <ul className="text-light small mb-0">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx} className="mb-1">{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
