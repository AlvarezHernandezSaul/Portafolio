import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaSave } from 'react-icons/fa';
import { addProject, updateProject, deleteProject } from '../../../firebase/services';

const ProjectsManager = ({ projects, setProjects, showMessage }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editingProject, setEditingProject] = useState(null);

  const handleAdd = () => {
    setModalType('add');
    setEditingProject({
      title: '',
      period: '',
      type: '',
      description: '',
      technologies: [],
      features: [],
      impact: '',
      github: '',
      demo: '',
      codeSnippet: ''
    });
    setShowModal(true);
  };

  const handleEdit = (project) => {
    setModalType('edit');
    setEditingProject({ ...project });
    setShowModal(true);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm('¿Estás seguro de eliminar este proyecto?')) {
      const result = await deleteProject(projectId);
      if (result.success) {
        setProjects(projects.filter(p => p.id !== projectId));
        showMessage('Proyecto eliminado exitosamente');
      } else {
        showMessage('Error al eliminar proyecto', 'error');
      }
    }
  };

  const handleSave = async () => {
    if (!editingProject.title || !editingProject.description) {
      showMessage('Por favor completa los campos requeridos', 'error');
      return;
    }

    if (modalType === 'add') {
      const result = await addProject(editingProject);
      if (result.success) {
        setProjects([...projects, result.project]);
        showMessage('Proyecto agregado exitosamente');
        setShowModal(false);
      } else {
        showMessage('Error al agregar proyecto', 'error');
      }
    } else {
      const result = await updateProject(editingProject.id, editingProject);
      if (result.success) {
        setProjects(projects.map(p => p.id === editingProject.id ? editingProject : p));
        showMessage('Proyecto actualizado exitosamente');
        setShowModal(false);
      } else {
        showMessage('Error al actualizar proyecto', 'error');
      }
    }
  };

  const handleArrayChange = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setEditingProject({ ...editingProject, [field]: array });
  };

  return (
    <>
      <div className="admin-card">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-orange mb-0">Proyectos ({projects.length})</h3>
          <motion.button
            className="btn btn-orange"
            onClick={handleAdd}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus className="me-2" />
            Agregar Proyecto
          </motion.button>
        </div>
        
        <div className="row g-3">
          {projects.map((project) => (
            <div key={project.id} className="col-12">
              <div className="glass p-3 rounded-3">
                <div className="d-flex justify-content-between align-items-start">
                  <div className="flex-grow-1">
                    <h5 className="text-white mb-2">{project.title}</h5>
                    <p className="text-light small mb-2">{project.period} | {project.type}</p>
                    <p className="text-light small mb-0">{project.description.substring(0, 150)}...</p>
                  </div>
                  <div className="d-flex gap-2 ms-3">
                    <motion.button
                      className="btn btn-sm btn-outline-orange"
                      onClick={() => handleEdit(project)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button
                      className="btn btn-sm btn-outline-orange"
                      onClick={() => handleDelete(project.id)}
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
                <h4 className="text-orange mb-0">{modalType === 'add' ? 'Agregar' : 'Editar'} Proyecto</h4>
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
                    value={editingProject?.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">Período *</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Ej: Jan-Sep 2025"
                    value={editingProject?.period || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, period: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Tipo *</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="Ej: Full-Stack Developer"
                    value={editingProject?.type || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Descripción *</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="3"
                    value={editingProject?.description || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Tecnologías (separadas por comas)</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    placeholder="React, Node.js, MongoDB"
                    value={Array.isArray(editingProject?.technologies) ? editingProject.technologies.join(', ') : ''}
                    onChange={(e) => handleArrayChange('technologies', e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Características (separadas por comas)</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="3"
                    placeholder="Feature 1, Feature 2, Feature 3"
                    value={Array.isArray(editingProject?.features) ? editingProject.features.join(', ') : ''}
                    onChange={(e) => handleArrayChange('features', e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Impacto</label>
                  <input
                    type="text"
                    className="form-control form-control-custom"
                    value={editingProject?.impact || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, impact: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">GitHub URL</label>
                  <input
                    type="url"
                    className="form-control form-control-custom"
                    value={editingProject?.github || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, github: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label text-light">Demo URL</label>
                  <input
                    type="url"
                    className="form-control form-control-custom"
                    value={editingProject?.demo || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, demo: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label text-light">Code Snippet (opcional)</label>
                  <textarea
                    className="form-control form-control-custom"
                    rows="5"
                    value={editingProject?.codeSnippet || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, codeSnippet: e.target.value })}
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

export default ProjectsManager;
