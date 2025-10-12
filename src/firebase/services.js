import { ref, set, get, push, remove, update } from "firebase/database";
import { database } from "./config";
import {
  personalInfo as defaultPersonalInfo,
  projects as defaultProjects,
  experience as defaultExperience,
  education as defaultEducation,
  certifications as defaultCertifications,
  languages as defaultLanguages,
  skills as defaultSkills
} from "../data/portfolioData";

// Initialize database with default data if empty
export const initializeDatabase = async () => {
  try {
    const snapshot = await get(ref(database, 'initialized'));
    
    if (!snapshot.exists()) {
      // Database is empty, initialize with default data
      await set(ref(database, 'personalInfo'), defaultPersonalInfo);
      await set(ref(database, 'projects'), defaultProjects);
      await set(ref(database, 'experience'), defaultExperience);
      await set(ref(database, 'education'), defaultEducation);
      await set(ref(database, 'certifications'), defaultCertifications);
      await set(ref(database, 'languages'), defaultLanguages);
      await set(ref(database, 'skills'), defaultSkills);
      await set(ref(database, 'initialized'), true);
      
      console.log('Database initialized with default data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Personal Info
export const getPersonalInfo = async () => {
  try {
    const snapshot = await get(ref(database, 'personalInfo'));
    return snapshot.exists() ? snapshot.val() : defaultPersonalInfo;
  } catch (error) {
    console.error('Error getting personal info:', error);
    return defaultPersonalInfo;
  }
};

export const updatePersonalInfo = async (data) => {
  try {
    await set(ref(database, 'personalInfo'), data);
    return { success: true };
  } catch (error) {
    console.error('Error updating personal info:', error);
    return { success: false, error: error.message };
  }
};

// Projects
export const getProjects = async () => {
  try {
    const snapshot = await get(ref(database, 'projects'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
    }
    return defaultProjects;
  } catch (error) {
    console.error('Error getting projects:', error);
    return defaultProjects;
  }
};

export const addProject = async (project) => {
  try {
    const projectsRef = ref(database, 'projects');
    const snapshot = await get(projectsRef);
    const projects = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const newProject = {
      ...project,
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1
    };
    
    projects.push(newProject);
    await set(projectsRef, projects);
    
    return { success: true, project: newProject };
  } catch (error) {
    console.error('Error adding project:', error);
    return { success: false, error: error.message };
  }
};

export const updateProject = async (projectId, updatedData) => {
  try {
    const projectsRef = ref(database, 'projects');
    const snapshot = await get(projectsRef);
    const projects = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const index = projects.findIndex(p => p.id === projectId);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updatedData };
      await set(projectsRef, projects);
      return { success: true };
    }
    
    return { success: false, error: 'Project not found' };
  } catch (error) {
    console.error('Error updating project:', error);
    return { success: false, error: error.message };
  }
};

export const deleteProject = async (projectId) => {
  try {
    const projectsRef = ref(database, 'projects');
    const snapshot = await get(projectsRef);
    const projects = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const filteredProjects = projects.filter(p => p.id !== projectId);
    await set(projectsRef, filteredProjects);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting project:', error);
    return { success: false, error: error.message };
  }
};

// Experience
export const getExperience = async () => {
  try {
    const snapshot = await get(ref(database, 'experience'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
    }
    return defaultExperience;
  } catch (error) {
    console.error('Error getting experience:', error);
    return defaultExperience;
  }
};

export const addExperience = async (exp) => {
  try {
    const expRef = ref(database, 'experience');
    const snapshot = await get(expRef);
    const experiences = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const newExp = {
      ...exp,
      id: experiences.length > 0 ? Math.max(...experiences.map(e => e.id)) + 1 : 1
    };
    
    experiences.push(newExp);
    await set(expRef, experiences);
    
    return { success: true, experience: newExp };
  } catch (error) {
    console.error('Error adding experience:', error);
    return { success: false, error: error.message };
  }
};

export const updateExperience = async (expId, updatedData) => {
  try {
    const expRef = ref(database, 'experience');
    const snapshot = await get(expRef);
    const experiences = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const index = experiences.findIndex(e => e.id === expId);
    if (index !== -1) {
      experiences[index] = { ...experiences[index], ...updatedData };
      await set(expRef, experiences);
      return { success: true };
    }
    
    return { success: false, error: 'Experience not found' };
  } catch (error) {
    console.error('Error updating experience:', error);
    return { success: false, error: error.message };
  }
};

export const deleteExperience = async (expId) => {
  try {
    const expRef = ref(database, 'experience');
    const snapshot = await get(expRef);
    const experiences = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const filteredExperiences = experiences.filter(e => e.id !== expId);
    await set(expRef, filteredExperiences);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting experience:', error);
    return { success: false, error: error.message };
  }
};

// Education
export const getEducation = async () => {
  try {
    const snapshot = await get(ref(database, 'education'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
    }
    return defaultEducation;
  } catch (error) {
    console.error('Error getting education:', error);
    return defaultEducation;
  }
};

export const addEducation = async (edu) => {
  try {
    const eduRef = ref(database, 'education');
    const snapshot = await get(eduRef);
    const educations = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const newEdu = {
      ...edu,
      id: educations.length > 0 ? Math.max(...educations.map(e => e.id)) + 1 : 1
    };
    
    educations.push(newEdu);
    await set(eduRef, educations);
    
    return { success: true, education: newEdu };
  } catch (error) {
    console.error('Error adding education:', error);
    return { success: false, error: error.message };
  }
};

export const updateEducation = async (eduId, updatedData) => {
  try {
    const eduRef = ref(database, 'education');
    const snapshot = await get(eduRef);
    const educations = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const index = educations.findIndex(e => e.id === eduId);
    if (index !== -1) {
      educations[index] = { ...educations[index], ...updatedData };
      await set(eduRef, educations);
      return { success: true };
    }
    
    return { success: false, error: 'Education not found' };
  } catch (error) {
    console.error('Error updating education:', error);
    return { success: false, error: error.message };
  }
};

export const deleteEducation = async (eduId) => {
  try {
    const eduRef = ref(database, 'education');
    const snapshot = await get(eduRef);
    const educations = snapshot.exists() ? Object.values(snapshot.val()) : [];
    
    const filteredEducations = educations.filter(e => e.id !== eduId);
    await set(eduRef, filteredEducations);
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting education:', error);
    return { success: false, error: error.message };
  }
};

// Skills
export const getSkills = async () => {
  try {
    const snapshot = await get(ref(database, 'skills'));
    return snapshot.exists() ? snapshot.val() : defaultSkills;
  } catch (error) {
    console.error('Error getting skills:', error);
    return defaultSkills;
  }
};

export const updateSkills = async (skills) => {
  try {
    await set(ref(database, 'skills'), skills);
    return { success: true };
  } catch (error) {
    console.error('Error updating skills:', error);
    return { success: false, error: error.message };
  }
};

// Certifications
export const getCertifications = async () => {
  try {
    const snapshot = await get(ref(database, 'certifications'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
    }
    return defaultCertifications;
  } catch (error) {
    console.error('Error getting certifications:', error);
    return defaultCertifications;
  }
};

export const updateCertifications = async (certifications) => {
  try {
    await set(ref(database, 'certifications'), certifications);
    return { success: true };
  } catch (error) {
    console.error('Error updating certifications:', error);
    return { success: false, error: error.message };
  }
};

// Languages
export const getLanguages = async () => {
  try {
    const snapshot = await get(ref(database, 'languages'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Array.isArray(data) ? data : Object.values(data);
    }
    return defaultLanguages;
  } catch (error) {
    console.error('Error getting languages:', error);
    return defaultLanguages;
  }
};

export const updateLanguages = async (languages) => {
  try {
    await set(ref(database, 'languages'), languages);
    return { success: true };
  } catch (error) {
    console.error('Error updating languages:', error);
    return { success: false, error: error.message };
  }
};
