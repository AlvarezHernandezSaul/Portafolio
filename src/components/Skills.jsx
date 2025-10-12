import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaBootstrap, FaNodeJs, 
  FaLaravel, FaPython, FaGitAlt, FaGithub, FaDocker, FaAws,
  FaTasks, FaBrain, FaUsers, FaLightbulb, FaComments, FaCode
} from 'react-icons/fa';
import { 
  SiTypescript, SiTailwindcss, SiNestjs, SiExpress, 
  SiFlask, SiFirebase, SiMongodb, SiMysql, SiPostgresql,
  SiGooglecloud, SiVercel
} from 'react-icons/si';

const iconMap = {
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaBootstrap, FaNodeJs,
  FaLaravel, FaPython, FaGitAlt, FaGithub, FaDocker, FaAws,
  FaTasks, FaBrain, FaUsers, FaLightbulb, FaComments, FaCode,
  SiTypescript, SiTailwindcss, SiNestjs, SiExpress,
  SiFlask, SiFirebase, SiMongodb, SiMysql, SiPostgresql,
  SiGooglecloud, SiVercel
};

const Skills = () => {
  const [skills, setSkills] = useState({});
  const [activeCategory, setActiveCategory] = useState('frontend');

  useEffect(() => {
    // Load skills from Firebase
    const loadSkills = async () => {
      const { getSkills } = await import('../firebase/services');
      const data = await getSkills();
      setSkills(data);
    };
    loadSkills();
  }, []);

  const categories = [
    { id: 'frontend', name: 'Frontend', color: 'orange' },
    { id: 'backend', name: 'Backend', color: 'yellow' },
    { id: 'databases', name: 'Bases de Datos', color: 'green' },
    { id: 'tools', name: 'Herramientas', color: 'blue' },
    { id: 'professional', name: 'Profesionales', color: 'orange' }
  ];

  const getIcon = (iconName) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <section id="skills" className="section-padding bg-dark-soft">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h2 className="section-title text-gradient">Habilidades Técnicas</h2>
          <p className="section-subtitle">
            Tecnologías y herramientas con las que trabajo
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`btn ${activeCategory === category.id ? 'btn-orange' : 'btn-outline-orange'}`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="row g-4"
        >
          {skills[activeCategory]?.map((skill, index) => (
            <motion.div
              key={index}
              className="col-md-6 col-lg-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="card-premium">
                <div className="d-flex align-items-center mb-3">
                  <div className="text-orange me-3" style={{ fontSize: '2.5rem' }}>
                    {getIcon(skill.icon)}
                  </div>
                  <div className="flex-grow-1">
                    <h5 className="text-white mb-1">{skill.name}</h5>
                    <span className="text-yellow small">{skill.level}%</span>
                  </div>
                </div>
                
                <div className="skill-progress">
                  <motion.div
                    className="skill-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5"
        >
          <div className="glass p-4 p-lg-5 rounded-4 text-center">
            <h3 className="text-gradient mb-4">Stack Tecnológico Principal</h3>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {['React', 'TypeScript', 'NestJS', 'Firebase', 'MongoDB', 'Tailwind CSS', 'Git', 'Docker'].map((tech, index) => (
                <motion.span
                  key={index}
                  className="badge-skill"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
