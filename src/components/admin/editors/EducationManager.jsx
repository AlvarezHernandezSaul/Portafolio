import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { addEducation, updateEducation, deleteEducation } from '../../../firebase/services';

const EducationManager = ({ educations, setEducations, showMessage }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editingEdu, setEditingEdu] = useState(null);

  const handleAdd = () => {
    setModalType('add');
    setEditingEdu({
      degree: '',
      institution: '',
      period: '',
      status: '',
      location: '',
      description: '',
      highlights: []
    });
    setShowModal(true);
  };

  const handleEdit = (edu) => {
    setModalType('edit');
    setEditingEdu({ ...edu });
    setShowModal(true);
  };

  const handleDelete = async (eduId) => {
    if (window.confirm('¿Estás seguro de eliminar esta educación?')) {
      const result = await deleteEducation(eduId);
      if (result.success) {
        setEducations(educations.filter(e => e.id !== eduId));
        showMessage('Educación eliminada exitosamente');
      } else {
        showMessage('Error al eliminar educación', 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!editingEdu.degree || !editingEdu.institution) {
      showMessage('Por favor completa los campos requeridos', 'error');
      return;
    }

    if (modalType === 'add') {
      const result = await addEducation(editingEdu);
      if (result.success) {
        setEducations([...educations, result.education]);
        showMessage('Educación agregada exitosamente');
        setShowModal(false);
      } else {
        showMessage('Error al agregar educación', 'error');
      }
    } else {
      const result = await updateEducation(editingEdu.id, editingEdu);
      if (result.success) {
        setEducations(educations.map(e => e.id === editingEdu.id ? editingEdu : e));
        showMessage('Educación actualizada exitosamente');
        setShowModal(false);
      } else {
        showMessage('Error al actualizar educación', 'error');
      }
    }
  };

  const handleArrayChange = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setEditingEdu({ ...editingEdu, [field]: array });
  };

  return (
    <>
      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-orange mb-0">Educación ({educations.length})</h3>
          <motion.button
            className="btn btn-orange"
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="me-2" />
            Agregar Educación
          </motion.button>
        </div>
        
        <div className="row g-3">
          {educations.map((edu) => (
            <div key={edu.id} className="col-12">
              <div className="glass p-3 rounded-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="text-white mb-2">{edu.degree}</h5>
                    <p className="text-light small mb-2">{edu.institution} | {edu.period}</p>
                    <p className="text-light small mb-0">{edu.description.substring(0, 150)}...</p>
                  </div>
                  <div className="d-flex gap-2 ms-3">
                    <motion.button
                      className="btn btn-sm btn-outline-orange"
                      onClick={() => handleEdit(edu)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      className="btn btn-sm btn-outline-orange"
                      onClick={() => handleDelete(edu.id)}
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
                <h4 className="text-orange mb-0">{modalType === 'add' ? 'Agregar' : 'Editar'} Educación</h4>
                <button className="btn btn-link text-orange" onClick={() => setShowModal(false)}>
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label text-light">Título/Grado *</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={editingEdu?.degree || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Institución *</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={editingEdu?.institution || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">Período</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Ej: Sep 2023 - Apr 2025"
                    value={editingEdu?.period || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, period: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">Estado</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Ej: Completed, In Progress"
                    value={editingEdu?.status || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, status: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Ubicación</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={editingEdu?.location || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, location: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Descripción</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="3"
                    value={editingEdu?.description || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Destacados (separados por comas)</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="3"
                    value={Array.isArray(editingEdu?.highlights) ? editingEdu.highlights.join(', ') : ''}
                    onChange={(e) => handleArrayChange('highlights', e.target.value)}
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

export default EducationManager;
