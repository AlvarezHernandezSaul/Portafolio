import { motion } from 'framer-motion';
import { FaSave } from 'react-icons/fa';

const PersonalInfoEditor = ({ data, onChange, onSave }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="admin-card">
      <h3 className="text-orange mb-4">Información Personal</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label text-light">Nombre Completo</label>
          <input
            type="text"
            className="form-control form-control-custom"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-light">Título</label>
          <input
            type="text"
            className="form-control form-control-custom"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-light">Subtítulo</label>
          <input
            type="text"
            className="form-control form-control-custom"
            value={data.subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-light">Email</label>
          <input
            type="email"
            className="form-control form-control-custom"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-light">Teléfono</label>
          <input
            type="text"
            className="form-control form-control-custom"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-light">Ubicación</label>
          <input
            type="text"
            className="form-control form-control-custom"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-light">GitHub URL</label>
          <input
            type="url"
            className="form-control form-control-custom"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label text-light">LinkedIn URL</label>
          <input
            type="url"
            className="form-control form-control-custom"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label text-light">Resumen Profesional</label>
          <textarea
            className="form-control form-control-custom"
            rows="4"
            value={data.profileSummary || ''}
            onChange={(e) => handleChange('profileSummary', e.target.value)}
          />
        </div>
        <div className="col-12">
          <motion.button
            className="btn btn-orange"
            onClick={onSave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSave className="me-2" />
            Guardar Cambios
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoEditor;
