import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa';
import { validateCredentials, createSession, isSessionValid } from '../../utils/auth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya hay sesión válida, redirigir al panel
    if (isSessionValid()) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simular delay de red para seguridad
      await new Promise(resolve => setTimeout(resolve, 500));

      // validateCredentials ahora es async
      const result = await validateCredentials(email, password);

      if (result.success) {
        createSession(email);
        navigate('/admin');
      } else {
        setError(result.error);
        setPassword('');
      }
    } catch (error) {
      console.error('Error en login:', error);
      setError('Error de conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-card"
      >
        <div className="text-center mb-4">
          <FaShieldAlt className="text-gradient mb-3" size={60} />
          <h2 className="text-gradient mb-2">Panel Administrativo</h2>
          <p className="text-light">Ingresa tus credenciales para continuar</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="alert-custom alert-danger-custom"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label text-light">
              <FaEnvelope className="me-2" />
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-custom"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light">
              <FaLock className="me-2" />
              Contraseña
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-control-custom"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-orange"
                onClick={() => setShowPassword(!showPassword)}
                style={{ textDecoration: 'none' }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            className="btn btn-orange w-100"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Verificando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-light small mb-2">
            <FaShieldAlt className="text-orange me-2" />
            Conexión segura con cifrado SHA256
          </p>
          <p className="text-light small mb-0">
            Máximo 3 intentos | Sesión expira en 30 min de inactividad
          </p>
        </div>

        <div className="mt-4 text-center">
          <button
            className="btn btn-link text-orange text-decoration-none"
            onClick={() => navigate('/')}
          >
            ← Volver al portafolio
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
