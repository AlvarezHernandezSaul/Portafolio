import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    // Load projects from Firebase
    const loadProjects = async () => {
      const { getProjects } = await import('../firebase/services');
      const data = await getProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  const toggleExpand = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="projects" className="section-padding bg-dark-custom">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="section-title text-gradient">Proyectos Destacados</h2>
          <p className="section-subtitle">
            Soluciones innovadoras desarrolladas con tecnologías modernas
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row g-4"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="col-lg-6"
            >
              <div className="project-card h-100">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h3 className="h4 fw-bold text-white mb-2">{project.title}</h3>
                    <p className="text-orange mb-0">{project.type} | {project.period}</p>
                  </div>
                  <div className="d-flex gap-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-orange"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline-orange"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-light mb-3">{project.description}</p>

                {/* Technologies */}
                <div className="mb-3">
                  <h5 className="text-yellow mb-2 small fw-bold">Tecnologías:</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {project.technologies.slice(0, 6).map((tech, index) => (
                      <span key={index} className="project-badge">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 6 && (
                      <span className="project-badge">
                        +{project.technologies.length - 6} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Features Preview */}
                <div className="mb-3">
                  <h5 className="text-yellow mb-2 small fw-bold">Características principales:</h5>
                  <ul className="text-light small mb-0">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="mb-1">{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Impact */}
                <div className="glass-light p-3 rounded-3 mb-3">
                  <p className="text-green mb-0 small">
                    <strong>Impacto:</strong> {project.impact}
                  </p>
                </div>

                {/* Expand Button */}
                <button
                  className="btn btn-sm btn-outline-orange w-100"
                  onClick={() => toggleExpand(project.id)}
                >
                  {expandedProject === project.id ? (
                    <>
                      Ver menos <FaChevronUp className="ms-2" />
                    </>
                  ) : (
                    <>
                      Ver detalles completos <FaChevronDown className="ms-2" />
                    </>
                  )}
                </button>

                {/* Expanded Content */}
                {expandedProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3"
                  >
                    {/* All Features */}
                    <div className="mb-3">
                      <h5 className="text-yellow mb-2 small fw-bold">Todas las características:</h5>
                      <ul className="text-light small mb-0">
                        {project.features.map((feature, index) => (
                          <li key={index} className="mb-1">{feature}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Code Snippet */}
                    {project.codeSnippet && (
                      <div className="mb-3">
                        <h5 className="text-yellow mb-2 small fw-bold d-flex align-items-center">
                          <FaCode className="me-2" /> Snippet de código destacado:
                        </h5>
                        <div className="code-snippet">
                          <pre>{project.codeSnippet}</pre>
                        </div>
                      </div>
                    )}

                    {/* All Technologies */}
                    <div>
                      <h5 className="text-yellow mb-2 small fw-bold">Stack tecnológico completo:</h5>
                      <div className="d-flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span key={index} className="project-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
