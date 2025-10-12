import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSignOutAlt, FaUser, FaBriefcase, FaGraduationCap, 
  FaCode, FaHome, FaClock, FaCogs
} from 'react-icons/fa';
import { logout, getSession, renewSession } from '../../utils/auth';
import {
  getPersonalInfo, updatePersonalInfo,
  getProjects,
  getExperience,
  getEducation,
  getSkills
} from '../../firebase/services';
import PersonalInfoEditor from './editors/PersonalInfoEditor';
import ProjectsManager from './editors/ProjectsManager';
import ExperienceManager from './editors/ExperienceManager';
import EducationManager from './editors/EducationManager';
import SkillsManager from './editors/SkillsManager';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [session, setSession] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Estados para cada sección
  const [personalInfo, setPersonalInfo] = useState({});
  const [projects, setProjects] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const currentSession = getSession();
    setSession(currentSession);
    loadAllData();

    const interval = setInterval(() => {
      renewSession();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [personalData, projectsData, expData, eduData] = await Promise.all([
        getPersonalInfo(),
        getProjects(),
        getExperience(),
        getEducation()
      ]);

      setPersonalInfo(personalData);
      setProjects(projectsData);
      setExperience(expData);
      setEducation(eduData);
    } catch (error) {
      console.error('Error loading data:', error);
      showMessage('Error al cargar datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const showMessage = (message, type = 'success') => {
    setSaveMessage({ text: message, type });
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSavePersonalInfo = async () => {
    const result = await updatePersonalInfo(personalInfo);
    if (result.success) {
      showMessage('Información personal guardada exitosamente');
    } else {
      showMessage('Error al guardar información personal', 'error');
    }
  };

  const tabs = [
    { id: 'personal', name: 'Información Personal', icon: FaUser },
    { id: 'projects', name: 'Proyectos', icon: FaCode },
    { id: 'experience', name: 'Experiencia', icon: FaBriefcase },
    { id: 'education', name: 'Educación', icon: FaGraduationCap },
    { id: 'skills', name: 'Habilidades', icon: FaCogs }
  ];

  if (loading) {
    return (
      <div className="admin-panel d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12">
            <div className="admin-card">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <h2 className="text-gradient mb-2">Panel Administrativo</h2>
                  <p className="text-light mb-0">
                    <FaClock className="text-orange me-2" />
                    Sesión iniciada: {session?.email}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <motion.button
                    className="btn btn-outline-orange"
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHome className="me-2" />
                    Ver Portafolio
                  </motion.button>
                  <motion.button
                    className="btn btn-outline-orange"
                    onClick={handleLogout}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaSignOutAlt className="me-2" />
                    Cerrar Sesión
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {saveMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`alert-custom ${saveMessage.type === 'error' ? 'alert-danger-custom' : 'alert-success-custom'} mb-4`}
            >
              {saveMessage.text}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    className={`btn ${activeTab === tab.id ? 'btn-orange' : 'btn-outline-orange'}`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="me-2" />
                    {tab.name}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            {activeTab === 'personal' && (
              <PersonalInfoEditor 
                data={personalInfo} 
                onChange={setPersonalInfo}
                onSave={handleSavePersonalInfo}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectsManager 
                projects={projects}
                setProjects={setProjects}
                showMessage={showMessage}
              />
            )}
            {activeTab === 'experience' && (
              <ExperienceManager 
                experiences={experience}
                setExperiences={setExperience}
                showMessage={showMessage}
              />
            )}
            {activeTab === 'education' && (
              <EducationManager 
                educations={education}
                setEducations={setEducation}
                showMessage={showMessage}
              />
            )}
            {activeTab === 'skills' && (
              <SkillsManager 
                showMessage={showMessage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
