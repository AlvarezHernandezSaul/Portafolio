export const personalInfo = {
  name: "José Saúl Álvarez Hernández",
  title: "Software Development and Management Engineer",
  subtitle: "Full-Stack Developer",
  email: "al222110813@gmail.com",
  phone: "+52 722 895 6257",
  location: "Lerma, State of Mexico",
  age: 23,
  github: "https://github.com/AlvarezHernandezSaul",
  linkedin: "https://www.linkedin.com/in/josé-saúl-alvarez-hernández-390343214",
  profileSummary: "Full-stack developer specializing in modern web applications using React, TypeScript, Firebase, and NestJS. Experienced in innovative and scalable solutions, applying agile methodologies (Scrum). Committed to optimizing processes through efficient code and continuous learning."
};

export const projects = [
  {
    id: 1,
    title: "Proyecto Neotic - IIoT Platform",
    period: "Jan-Sep 2025",
    type: "Full-Stack Developer",
    description: "Plataforma IIoT completa para monitoreo en tiempo real de sensores industriales y gestión de activos. Desarrollé tanto el backend con NestJS como el frontend con React, implementando arquitectura modular y escalable.",
    technologies: ["React", "NestJS", "MongoDB", "MQTT", "JWT", "Mongoose", "Express", "Axios"],
    features: [
      "Autenticación JWT con middleware personalizado (auth.js, middleware/auth.js)",
      "Gestión de sensores con CRUD completo y validación de rangos (models/sensor.js, controllers/sensor.js)",
      "Sistema de activos asociados a sensores con cálculo de estados (models/asset.js, controllers/asset.js)",
      "Integración MQTT para comunicación en tiempo real (mqtt.js, services/mqtt.service.js)",
      "Seeder con Faker.js para datos iniciales (seeders/seed.js)",
      "Interfaz de monitoreo con gauges interactivos (react-gauge-component, pages/Monitoreo.js)",
      "Gestión de activos con calendario y modales (react-big-calendar, pages/Activos.js)",
      "Sistema de tareas con calendario, filtros y CRUD (pages/Tareas.js)"
    ],
    impact: "Sistema robusto de monitoreo industrial con sincronización en tiempo real",
    github: null,
    demo: null,
    codeSnippet: `// Middleware de autenticación JWT
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};`
  },
  {
    id: 2,
    title: "MakeAgend - Beauty Salon System",
    period: "Oct 2024-Jan 2025",
    type: "Freelance",
    description: "Sistema completo de gestión para salones de belleza con autenticación multi-rol, gestión de citas, base de clientes y reportes. Implementé arquitectura escalable con Context API y custom hooks.",
    technologies: ["React 18", "TypeScript", "Firebase", "Tailwind CSS", "Vite", "Context API"],
    features: [
      "Autenticación multi-rol (Admin, Empleado, Cliente) con Firebase Auth",
      "Gestión de citas con calendario interactivo y notificaciones",
      "Base de datos de clientes con historial completo",
      "Sistema de reportes y estadísticas en tiempo real",
      "Firebase Security Rules para protección de datos",
      "Lazy loading y code splitting para optimización",
      "Custom hooks para lógica reutilizable",
      "Responsive design con Tailwind CSS"
    ],
    impact: "Reducción del 30% en tiempo de gestión de citas y mejora significativa en experiencia de usuario",
    github: null,
    demo: null,
    codeSnippet: `// Custom hook para gestión de citas
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useAppointments = (userId, role) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = role === 'admin' 
      ? query(collection(db, 'appointments'))
      : query(collection(db, 'appointments'), where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, role]);

  return { appointments, loading };
};`
  },
  {
    id: 3,
    title: "House Fighters System",
    period: "Feb-Mar 2025",
    type: "Freelance",
    description: "Sistema cross-platform para gestión de membresías y control de acceso en gimnasio. Desarrollé aplicación de escritorio con Tauri y sincronización en tiempo real con Firebase.",
    technologies: ["React", "Vite", "Firebase", "Tauri", "JavaScript"],
    features: [
      "Aplicación de escritorio multiplataforma con Tauri",
      "Sincronización en tiempo real con Firebase Realtime Database",
      "Gestión de membresías con estados y renovaciones",
      "Control de acceso con validación de QR",
      "Interfaz responsive adaptada a diferentes resoluciones",
      "Sistema de notificaciones para vencimientos",
      "Reportes de asistencia y estadísticas"
    ],
    impact: "Gestión eficiente de membresías con reducción de errores manuales",
    github: null,
    demo: null,
    codeSnippet: `// Configuración de Tauri para app de escritorio
// tauri.conf.json
{
  "build": {
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev",
    "devPath": "http://localhost:3000",
    "distDir": "../dist"
  },
  "tauri": {
    "allowlist": {
      "all": false,
      "fs": {
        "all": true,
        "scope": ["$APP/*"]
      }
    }
  }
}`
  },
  {
    id: 4,
    title: "Manolingua - Sign Language Translator",
    period: "Sep-Dec 2024",
    type: "Academic Project",
    description: "Herramienta de comunicación inclusiva que traduce lenguaje de señas en tiempo real usando inteligencia artificial. Desarrollé API RESTful con Flask, modelo AI con TensorFlow y frontend con React.",
    technologies: ["Python", "Flask", "React", "TensorFlow", "AWS Amplify", "GCP", "Docker"],
    features: [
      "Modelo de IA entrenado para reconocimiento de señas en tiempo real",
      "API RESTful con Flask desplegada en Google Cloud Platform",
      "Interfaz React para captura de video y traducción instantánea",
      "Pipeline de procesamiento de imágenes con OpenCV",
      "Deploy automatizado con Docker en GCP",
      "Frontend desplegado en AWS Amplify",
      "Sistema de feedback para mejorar precisión del modelo"
    ],
    impact: "Herramienta inclusiva para comunicación accesible, con 85% de precisión en traducción",
    github: "https://github.com/AlvarezHernandezSaul/Manolingua",
    demo: null,
    codeSnippet: `# API Flask para predicción de señas
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import cv2
import numpy as np

app = Flask(__name__)
model = load_model('models/sign_language_model.h5')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        file = request.files['image']
        img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
        img = cv2.resize(img, (224, 224))
        img = np.expand_dims(img / 255.0, axis=0)
        
        prediction = model.predict(img)
        label = np.argmax(prediction)
        confidence = float(np.max(prediction))
        
        return jsonify({
            'label': int(label),
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500`
  }
];

export const skills = {
  frontend: [
    { name: "React", level: 95, icon: "FaReact" },
    { name: "TypeScript", level: 90, icon: "SiTypescript" },
    { name: "JavaScript", level: 95, icon: "FaJs" },
    { name: "Tailwind CSS", level: 90, icon: "SiTailwindcss" },
    { name: "Bootstrap", level: 85, icon: "FaBootstrap" },
    { name: "HTML5", level: 95, icon: "FaHtml5" },
    { name: "CSS3", level: 90, icon: "FaCss3Alt" },
    { name: "Vite", level: 85, icon: "FaCode" }
  ],
  backend: [
    { name: "NestJS", level: 85, icon: "SiNestjs" },
    { name: "Node.js", level: 90, icon: "FaNodeJs" },
    { name: "Express", level: 85, icon: "SiExpress" },
    { name: "Laravel", level: 75, icon: "FaLaravel" },
    { name: "Flask", level: 80, icon: "SiFlask" },
    { name: "Firebase", level: 90, icon: "SiFirebase" },
    { name: "Python", level: 85, icon: "FaPython" }
  ],
  databases: [
    { name: "MongoDB", level: 85, icon: "SiMongodb" },
    { name: "MySQL", level: 80, icon: "SiMysql" },
    { name: "PostgreSQL", level: 75, icon: "SiPostgresql" },
    { name: "Firebase Firestore", level: 90, icon: "SiFirebase" }
  ],
  tools: [
    { name: "Git", level: 90, icon: "FaGitAlt" },
    { name: "GitHub", level: 90, icon: "FaGithub" },
    { name: "Docker", level: 75, icon: "FaDocker" },
    { name: "AWS", level: 70, icon: "FaAws" },
    { name: "GCP", level: 75, icon: "SiGooglecloud" },
    { name: "VS Code", level: 95, icon: "FaCode" },
    { name: "Tauri", level: 80, icon: "FaCode" },
    { name: "Vercel", level: 85, icon: "SiVercel" }
  ],
  professional: [
    { name: "Scrum", level: 85, icon: "FaTasks" },
    { name: "Problem Solving", level: 90, icon: "FaBrain" },
    { name: "Team Collaboration", level: 90, icon: "FaUsers" },
    { name: "Adaptability", level: 95, icon: "FaLightbulb" },
    { name: "Communication", level: 85, icon: "FaComments" }
  ]
};

export const experience = [
  {
    id: 1,
    title: "Full-Stack Developer",
    company: "Proyecto Neotic",
    period: "Jan 2025 - Sep 2025",
    location: "Lerma, State of Mexico",
    type: "IIoT Platform",
    description: "Desarrollé plataforma IIoT completa con React y NestJS para monitoreo en tiempo real de sensores industriales.",
    responsibilities: [
      "Diseño e implementación de arquitectura backend con NestJS y MongoDB",
      "Desarrollo de interfaz React para visualización de datos en tiempo real",
      "Integración de protocolo MQTT para comunicación IoT",
      "Implementación de sistema de autenticación JWT",
      "Creación de módulos de gestión de sensores, activos y tareas"
    ],
    technologies: ["React", "NestJS", "MongoDB", "MQTT", "JWT", "Git"],
    achievements: [
      "Sistema robusto de monitoreo con 99.9% de uptime",
      "Reducción de 40% en tiempo de respuesta de consultas",
      "Arquitectura modular escalable para futuros módulos"
    ]
  },
  {
    id: 2,
    title: "Freelance Full-Stack Developer",
    company: "MakeAgend",
    period: "Oct 2024 - Jan 2025",
    location: "Remote",
    type: "Beauty Salon Management System",
    description: "Desarrollé sistema completo de gestión para salones de belleza con autenticación multi-rol y gestión de citas.",
    responsibilities: [
      "Arquitectura de aplicación con React 18 y TypeScript",
      "Implementación de Firebase Auth con roles personalizados",
      "Desarrollo de sistema de citas con calendario interactivo",
      "Configuración de Firebase Security Rules",
      "Optimización con lazy loading y code splitting"
    ],
    technologies: ["React 18", "TypeScript", "Firebase", "Tailwind CSS", "Vite"],
    achievements: [
      "Reducción del 30% en tiempo de gestión de citas",
      "Sistema escalable con arquitectura limpia",
      "Mejora significativa en experiencia de usuario"
    ]
  },
  {
    id: 3,
    title: "Freelance Developer",
    company: "House Fighters System",
    period: "Feb 2025 - Mar 2025",
    location: "Remote",
    type: "Gym Management System",
    description: "Desarrollé aplicación cross-platform con Tauri para gestión de membresías y control de acceso en gimnasio.",
    responsibilities: [
      "Desarrollo de aplicación de escritorio con Tauri",
      "Integración con Firebase para sincronización en tiempo real",
      "Implementación de sistema de control de acceso con QR",
      "Diseño de interfaz responsive para diferentes resoluciones"
    ],
    technologies: ["React", "Vite", "Firebase", "Tauri"],
    achievements: [
      "Gestión eficiente de membresías multiplataforma",
      "Reducción de errores manuales en control de acceso",
      "Sistema de notificaciones automatizado"
    ]
  },
  {
    id: 4,
    title: "Academic Developer",
    company: "Manolingua Project",
    period: "Sep 2024 - Dec 2024",
    location: "Universidad Tecnológica del Valle de Toluca",
    type: "AI-Powered Sign Language Translator",
    description: "Desarrollé herramienta de traducción de lenguaje de señas en tiempo real usando IA, Flask y React.",
    responsibilities: [
      "Entrenamiento de modelo de IA con TensorFlow",
      "Desarrollo de API RESTful con Flask",
      "Deploy en Google Cloud Platform con Docker",
      "Desarrollo de frontend React en AWS Amplify",
      "Pipeline de procesamiento de imágenes con OpenCV"
    ],
    technologies: ["Python", "Flask", "React", "TensorFlow", "AWS", "GCP", "Docker"],
    achievements: [
      "85% de precisión en traducción de señas",
      "Herramienta inclusiva para comunicación accesible",
      "Arquitectura escalable en la nube"
    ]
  }
];

export const education = [
  {
    id: 1,
    degree: "Software Development and Management Engineering",
    institution: "Universidad Tecnológica del Valle de Toluca",
    period: "Sep 2023 - Apr 2025",
    status: "Carta Pasante",
    location: "Lerma, State of Mexico",
    description: "Ingeniería enfocada en desarrollo de software, gestión de proyectos y metodologías ágiles.",
    highlights: [
      "Especialización en desarrollo full-stack",
      "Proyectos con tecnologías modernas (React, NestJS, Firebase)",
      "Metodologías ágiles (Scrum, Kanban)",
      "Gestión de proyectos de software"
    ]
  },
  {
    id: 2,
    degree: "TSU in Multiplatform Software Development",
    institution: "Universidad Tecnológica del Valle de Toluca",
    period: "Sep 2021 - Aug 2023",
    status: "Completed",
    location: "Lerma, State of Mexico",
    description: "Técnico Superior Universitario enfocado en desarrollo multiplataforma.",
    highlights: [
      "Desarrollo web y móvil",
      "Bases de datos relacionales y no relacionales",
      "Programación orientada a objetos",
      "Desarrollo de APIs RESTful"
    ]
  },
  {
    id: 3,
    degree: "Technical Degree in Informatics",
    institution: "CBT No. 1 Dr. Maximiliano Ruiz Castañeda",
    period: "Sep 2017 - Jul 2020",
    status: "Completed",
    location: "Lerma, State of Mexico",
    description: "Bachillerato técnico con especialización en informática.",
    highlights: [
      "Fundamentos de programación",
      "Redes y sistemas operativos",
      "Bases de datos",
      "Desarrollo web básico"
    ]
  }
];

export const certifications = [
  {
    id: 1,
    name: "CCNAv7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "2021",
    credentialId: null,
    description: "Certificación en fundamentos de redes, protocolos TCP/IP, configuración de routers y switches."
  },
  {
    id: 2,
    name: "Fundamentals of AI Development",
    issuer: "Big School",
    date: "2024",
    credentialId: null,
    description: "Fundamentos de desarrollo de inteligencia artificial, machine learning y deep learning."
  },
  {
    id: 3,
    name: "Professional Fundamentals of Software Development",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    credentialId: null,
    description: "Fundamentos profesionales de desarrollo de software, mejores prácticas y metodologías."
  }
];

export const languages = [
  {
    id: 1,
    language: "Spanish",
    level: "Native",
    proficiency: 100
  },
  {
    id: 2,
    language: "English",
    level: "B1 (TOEFL ITP)",
    proficiency: 65
  }
];
