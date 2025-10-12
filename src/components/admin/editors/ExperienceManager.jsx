import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { addExperience, updateExperience, deleteExperience } from '../../../firebase/services';

const ExperienceManager = ({ experiences, setExperiences, showMessage }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editingExp, setEditingExp] = useState(null);

  const handleAdd = () => {
    setModalType('add');
    setEditingExp({
      title: '',
      company: '',
      period: '',
      location: '',
      type: '',
      description: '',
      responsibilities: [],
      technologies: [],
      achievements: []
    });
    setShowModal(true);
  };

  const handleEdit = (exp) => {
    setModalType('edit');
    setEditingExp({ ...exp });
    setShowModal(true);
  };

  const handleDelete = async (expId) => {
    if (window.confirm('¿Estás seguro de eliminar esta experiencia?')) {
      const result = await deleteExperience(expId);
      if (result.success) {
        setExperiences(experiences.filter(e => e.id !== expId));
        showMessage('Experiencia eliminada exitosamente');
      } else {
        showMessage('Error al eliminar experiencia', 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!editingExp.title || !editingExp.company) {
      showMessage('Por favor completa los campos requeridos', 'error');
      return;
    }

    if (modalType === 'add') {
      const result = await addExperience(editingExp);
      if (result.success) {
        setExperiences([...experiences, result.experience]);
        showMessage('Experiencia agregada exitosamente');
        setShowModal(false);
      } else {
        showMessage('Error al agregar experiencia', 'error');
      }
    } else {
      const result = await updateExperience(editingExp.id, editingExp);
      if (result.success) {
        setExperiences(experiences.map(e => e.id === editingExp.id ? editingExp : e));
        showMessage('Experiencia actualizada exitosamente');
        setShowModal(false);
      } else {
        showMessage('Error al actualizar experiencia', 'error');
      }
    }
  };

  const handleArrayChange = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setEditingExp({ ...editingExp, [field]: array });
  };

  return (
    <>
      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-orange mb-0">Experiencia Profesional ({experiences.length})</h3>
          <motion.button
            className="btn btn-orange"
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="me-2" />
            Agregar Experiencia
          </motion.button>
        </div>
        
        <div className="row g-3">
          {experiences.map((exp) => (
            <div key={exp.id} className="col-12">
              <div className="glass p-3 rounded-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="text-white mb-2">{exp.title}</h5>
                    <p className="text-light small mb-2">{exp.company} | {exp.period}</p>
                    <p className="text-light small mb-0">{exp.description.substring(0, 150)}...</p>
                  </div>
                  <div className="d-flex gap-2 ms-3">
                    <motion.button
                      className="btn btn-sm btn-outline-orange"
                      onClick={() => handleEdit(exp)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      className="btn btn-sm btn-outline-orange"
                      onClick={() => handleDelete(exp.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              style={{ maxWidth: '800px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="text-orange mb-0">{modalType === 'add' ? 'Agregar' : 'Editar'} Experiencia</h4>
                <button className="btn btn-link text-orange" onClick={() => setShowModal(false)}>
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label text-light">Título *</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={editingExp?.title || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">Empresa *</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={editingExp?.company || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">Período</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Ej: Jan 2025 - Sep 2025"
                    value={editingExp?.period || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">Ubicación</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={editingExp?.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Tipo</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Ej: Full-Stack Developer"
                    value={editingExp?.type || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, type: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Descripción</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="3"
                    value={editingExp?.description || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Responsabilidades (separadas por comas)</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="3"
                    value={Array.isArray(editingExp?.responsibilities) ? editingExp.responsibilities.join(', ') : ''}
                    onChange={(e) => handleArrayChange('responsibilities', e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Tecnologías (separadas por comas)</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={Array.isArray(editingExp?.technologies) ? editingExp.technologies.join(', ') : ''}
                    onChange={(e) => handleArrayChange('technologies', e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Logros (separados por comas)</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="3"
                    value={Array.isArray(editingExp?.achievements) ? editingExp.achievements.join(', ') : ''}
                    onChange={(e) => handleArrayChange('achievements', e.target.value)}
                  />
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

export default ExperienceManager;
