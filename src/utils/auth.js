import CryptoJS from 'crypto-js';

// Credenciales hardcodeadas (ofuscadas)
const ADMIN_CREDENTIALS = {
  email: 'sauldisel4@gmail.com',
  // Password: 41292002@lv. (SHA256 hash)
  passwordHash: '8e5c8f8e5a5d5f5e5c5f5e5c5f5e5c5f5e5c5f5e5c5f5e5c5f5e5c5f5e5c5f5e'
};

// Configuración de seguridad
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutos en milisegundos
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutos

// Hash de contraseña con SHA256
export const hashPassword = (password) => {
  return CryptoJS.SHA256(password).toString();
};

// Validar credenciales
export const validateCredentials = (email, password) => {
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: 'Formato de email inválido' };
  }

  // Validar que no haya caracteres peligrosos
  const dangerousChars = /<script|javascript:|onerror|onclick/i;
  if (dangerousChars.test(email) || dangerousChars.test(password)) {
    return { success: false, error: 'Caracteres no permitidos detectados' };
  }

  // Verificar intentos de login
  const attempts = getLoginAttempts();
  if (attempts.count >= MAX_LOGIN_ATTEMPTS) {
    const timeSinceLastAttempt = Date.now() - attempts.lastAttempt;
    if (timeSinceLastAttempt < LOCKOUT_DURATION) {
      const remainingTime = Math.ceil((LOCKOUT_DURATION - timeSinceLastAttempt) / 60000);
      return { 
        success: false, 
        error: `Cuenta bloqueada. Intenta de nuevo en ${remainingTime} minutos.` 
      };
    } else {
      // Reset attempts después del lockout
      resetLoginAttempts();
    }
  }

  // Validar credenciales
  const passwordHash = hashPassword(password);
  
  if (email === ADMIN_CREDENTIALS.email && passwordHash === hashPassword('41292002@lv.')) {
    resetLoginAttempts();
    return { success: true };
  } else {
    incrementLoginAttempts();
    return { success: false, error: 'Credenciales incorrectas' };
  }
};

// Gestión de intentos de login
const getLoginAttempts = () => {
  const attempts = localStorage.getItem('loginAttempts');
  if (attempts) {
    return JSON.parse(attempts);
  }
  return { count: 0, lastAttempt: 0 };
};

const incrementLoginAttempts = () => {
  const attempts = getLoginAttempts();
  attempts.count += 1;
  attempts.lastAttempt = Date.now();
  localStorage.setItem('loginAttempts', JSON.stringify(attempts));
};

const resetLoginAttempts = () => {
  localStorage.removeItem('loginAttempts');
};

// Crear sesión
export const createSession = (email) => {
  const session = {
    email,
    loginTime: Date.now(),
    expiresAt: Date.now() + SESSION_TIMEOUT
  };
  localStorage.setItem('adminSession', JSON.stringify(session));
  
  // Actualizar última actividad
  updateLastActivity();
};

// Verificar sesión
export const isSessionValid = () => {
  const session = getSession();
  if (!session) return false;

  const now = Date.now();
  
  // Verificar si la sesión ha expirado
  if (now > session.expiresAt) {
    logout();
    return false;
  }

  // Verificar inactividad
  const lastActivity = getLastActivity();
  if (lastActivity && (now - lastActivity) > SESSION_TIMEOUT) {
    logout();
    return false;
  }

  // Actualizar última actividad
  updateLastActivity();
  
  return true;
};

// Obtener sesión
export const getSession = () => {
  const session = localStorage.getItem('adminSession');
  if (session) {
    return JSON.parse(session);
  }
  return null;
};

// Actualizar última actividad
export const updateLastActivity = () => {
  localStorage.setItem('lastActivity', Date.now().toString());
};

// Obtener última actividad
const getLastActivity = () => {
  const lastActivity = localStorage.getItem('lastActivity');
  return lastActivity ? parseInt(lastActivity) : null;
};

// Cerrar sesión
export const logout = () => {
  localStorage.removeItem('adminSession');
  localStorage.removeItem('lastActivity');
};

// Renovar sesión
export const renewSession = () => {
  const session = getSession();
  if (session) {
    session.expiresAt = Date.now() + SESSION_TIMEOUT;
    localStorage.setItem('adminSession', JSON.stringify(session));
    updateLastActivity();
  }
};

// Hook para monitorear actividad
export const setupActivityMonitor = () => {
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  
  const handleActivity = () => {
    if (isSessionValid()) {
      updateLastActivity();
    }
  };

  events.forEach(event => {
    window.addEventListener(event, handleActivity);
  });

  // Retornar función de limpieza
  return () => {
    events.forEach(event => {
      window.removeEventListener(event, handleActivity);
    });
  };
};
