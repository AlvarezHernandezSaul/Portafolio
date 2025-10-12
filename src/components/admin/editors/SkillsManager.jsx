import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { getSkills, updateSkills } from '../../../firebase/services';

// Lista de iconos disponibles
const AVAILABLE_ICONS = {
  // Frontend
  FaReact: { name: 'React', category: 'frontend' },
  FaJs: { name: 'JavaScript', category: 'frontend' },
  FaHtml5: { name: 'HTML5', category: 'frontend' },
  FaCss3Alt: { name: 'CSS3', category: 'frontend' },
  FaBootstrap: { name: 'Bootstrap', category: 'frontend' },
  FaCode: { name: 'Code/Generic', category: 'all' },
  
  // Backend
  FaNodeJs: { name: 'Node.js', category: 'backend' },
  FaLaravel: { name: 'Laravel', category: 'backend' },
  FaPython: { name: 'Python', category: 'backend' },
  
  // Simple Icons
  SiTypescript: { name: 'TypeScript', category: 'frontend' },
  SiTailwindcss: { name: 'Tailwind CSS', category: 'frontend' },
  SiNestjs: { name: 'NestJS', category: 'backend' },
  SiExpress: { name: 'Express', category: 'backend' },
  SiFlask: { name: 'Flask', category: 'backend' },
  SiFirebase: { name: 'Firebase', category: 'backend' },
  SiMongodb: { name: 'MongoDB', category: 'databases' },
  SiMysql: { name: 'MySQL', category: 'databases' },
  SiPostgresql: { name: 'PostgreSQL', category: 'databases' },
  SiGooglecloud: { name: 'Google Cloud', category: 'tools' },
  SiVercel: { name: 'Vercel', category: 'tools' },
  
  // Tools
  FaGitAlt: { name: 'Git', category: 'tools' },
  FaGithub: { name: 'GitHub', category: 'tools' },
  FaDocker: { name: 'Docker', category: 'tools' },
  FaAws: { name: 'AWS', category: 'tools' },
  
  // Professional
  FaTasks: { name: 'Tasks/Scrum', category: 'professional' },
  FaBrain: { name: 'Brain/Problem Solving', category: 'professional' },
  FaUsers: { name: 'Users/Team', category: 'professional' },
  FaLightbulb: { name: 'Lightbulb/Ideas', category: 'professional' },
  FaComments: { name: 'Comments/Communication', category: 'professional' }
};

const CATEGORIES = [
  { id: 'frontend', name: 'Frontend', color: 'orange' },
  { id: 'backend', name: 'Backend', color: 'yellow' },
  { id: 'databases', name: 'Bases de Datos', color: 'green' },
  { id: 'tools', name: 'Herramientas', color: 'blue' },
  { id: 'professional', name: 'Profesionales', color: 'orange' }
];

const SkillsManager = ({ showMessage }) => {
  const [skills, setSkills] = useState({
    frontend: [],
    backend: [],
    databases: [],
    tools: [],
    professional: []
  });
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    setLoading(true);
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error loading skills:', error);
      showMessage('Error al cargar habilidades', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModalType('add');
    setEditingSkill({
      name: '',
      level: 50,
      icon: 'FaCode'
    });
    setEditingIndex(null);
    setShowModal(true);
  };

  const handleEdit = (skill, index) => {
    setModalType('edit');
    setEditingSkill({ ...skill });
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = async (index) => {
    if (window.confirm('¿Estás seguro de eliminar esta habilidad?')) {
      const updatedSkills = { ...skills };
      updatedSkills[activeCategory] = updatedSkills[activeCategory].filter((_, i) => i !== index);
      
      const result = await updateSkills(updatedSkills);
      if (result.success) {
        setSkills(updatedSkills);
        showMessage('Habilidad eliminada exitosamente');
      } else {
        showMessage('Error al eliminar habilidad', 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!editingSkill.name || !editingSkill.icon) {
      showMessage('Por favor completa todos los campos', 'error');
      return;
    }

    const updatedSkills = { ...skills };

    if (modalType === 'add') {
      updatedSkills[activeCategory].push(editingSkill);
    } else {
      updatedSkills[activeCategory][editingIndex] = editingSkill;
    }

    const result = await updateSkills(updatedSkills);
    if (result.success) {
      setSkills(updatedSkills);
      showMessage(`Habilidad ${modalType === 'add' ? 'agregada' : 'actualizada'} exitosamente`);
      setShowModal(false);
    } else {
      showMessage('Error al guardar habilidad', 'error');
    }
  };

  const getFilteredIcons = () => {
    return Object.entries(AVAILABLE_ICONS).filter(([key, value]) => 
      value.category === activeCategory || value.category === 'all'
    );
  };

  if (loading) {
    return (
      <div className="admin-card">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-orange mb-0">Habilidades Técnicas</h3>
        </div>

        {/* Category Tabs */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              className={`btn btn-sm ${activeCategory === category.id ? 'btn-orange' : 'btn-outline-orange'}`}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name} ({skills[category.id]?.length || 0})
            </motion.button>
          ))}
        </div>

        {/* Add Button */}
        <div className="mb-3">
          <motion.button
            className="btn btn-orange"
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="me-2" />
            Agregar Habilidad a {CATEGORIES.find(c => c.id === activeCategory)?.name}
          </motion.button>
        </div>

        {/* Skills List */}
        <div className="row g-3">
          {skills[activeCategory]?.length === 0 ? (
            <div className="col-12">
              <div className="glass p-4 text-center">
                <p className="text-light mb-0">No hay habilidades en esta categoría</p>
              </div>
            </div>
          ) : (
            skills[activeCategory]?.map((skill, index) => (
              <div key={index} className="col-md-6">
                <div className="glass p-3 rounded-3">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="badge bg-orange">{skill.icon}</span>
                        <h6 className="text-white mb-0">{skill.name}</h6>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-orange"
                          role="progressbar"
                          style={{ width: `${skill.level}%` }}
                          aria-valuenow={skill.level}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>
                      <p className="text-light small mb-0 mt-1">Nivel: {skill.level}%</p>
                    </div>
                    <div className="d-flex gap-2 ms-3">
                      <motion.button
                        className="btn btn-sm btn-outline-orange"
                        onClick={() => handleEdit(skill, index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEdit />
                      </motion.button>
                      <motion.button
                        className="btn btn-sm btn-outline-orange"
                        onClick={() => handleDelete(index)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 9999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="admin-card"
              style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-orange mb-0">
                  {modalType === 'add' ? 'Agregar' : 'Editar'} Habilidad
                </h4>
                <button className="btn btn-link text-orange" onClick={() => setShowModal(false)}>
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label text-light">Nombre de la Habilidad *</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Ej: React, Python, MongoDB"
                    value={editingSkill?.name || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label text-light">
                    Nivel de Dominio: {editingSkill?.level || 50}%
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="100"
                    step="5"
                    value={editingSkill?.level || 50}
                    onChange={(e) => setEditingSkill({ ...editingSkill, level: parseInt(e.target.value) })}
                  />
                  <div className="progress mt-2" style={{ height: '10px' }}>
                    <div
                      className="progress-bar bg-orange"
                      role="progressbar"
                      style={{ width: `${editingSkill?.level || 50}%` }}
                    ></div>
                  </div>
                </div>

                <div className="col-12">
                  <label className="form-label text-light">Icono *</label>
                  <div className="row g-2">
                    {getFilteredIcons().map(([iconKey, iconData]) => (
                      <div key={iconKey} className="col-4 col-md-3">
                        <motion.button
                          type="button"
                          className={`btn w-100 ${editingSkill?.icon === iconKey ? 'btn-orange' : 'btn-outline-orange'}`}
                          onClick={() => setEditingSkill({ ...editingSkill, icon: iconKey })}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          style={{ fontSize: '0.75rem', padding: '0.5rem' }}
                        >
                          <div className="text-truncate">{iconKey}</div>
                          <small className="d-block text-truncate" style={{ fontSize: '0.65rem' }}>
                            {iconData.name}
                          </small>
                        </motion.button>
                      </div>
                    ))}
                  </div>
                  <p className="text-light small mt-2 mb-0">
                    <strong>Icono seleccionado:</strong> {editingSkill?.icon || 'Ninguno'}
                  </p>
                </div>

                <div className="col-12">
                  <div className="alert alert-info-custom">
                    <strong>Vista previa:</strong>
                    <div className="mt-2 p-2 glass rounded">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span className="badge bg-orange">{editingSkill?.icon || 'FaCode'}</span>
                        <span className="text-white">{editingSkill?.name || 'Nombre de habilidad'}</span>
                      </div>
                      <div className="progress" style={{ height: '8px' }}>
                        <div
                          className="progress-bar bg-orange"
                          style={{ width: `${editingSkill?.level || 50}%` }}
                        ></div>
                      </div>
                      <p className="text-light small mb-0 mt-1">
                        Nivel: {editingSkill?.level || 50}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-12 d-flex gap-2 justify-content-end">
                  <motion.button
                    className="btn btn-outline-orange"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Cancelar
                  </motion.button>
                  <motion.button
                    className="btn btn-orange"
                    onClick={handleSave}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSave className="me-2" />
                    Guardar
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SkillsManager;
