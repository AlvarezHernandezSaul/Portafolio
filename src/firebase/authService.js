import { ref, get } from "firebase/database";
import { database } from "./config";
import CryptoJS from 'crypto-js';

// Clave de cifrado (en producción, usar variable de entorno)
const ENCRYPTION_KEY = 'P0rt4f0l10-S3cur3-K3y-2025-Adm1n';

// Hash de contraseña con SHA256
export const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

// Cifrar datos
export const encryptData = (data) => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

// Descifrar datos
export const decryptData = (encryptedData) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error('Error al descifrar datos:', error);
        return null;
    }
};

// Validar credenciales contra Firebase
export const validateCredentialsFromFirebase = async (email, password) => {
    try {
        // Obtener credenciales cifradas de Firebase
        const credentialsRef = ref(database, 'adminCredentials');
        const snapshot = await get(credentialsRef);

        if (!snapshot.exists()) {
            console.error('No se encontraron credenciales en Firebase');
            return { success: false, error: 'Error de configuración' };
        }

        // Descifrar credenciales
        const encryptedCredentials = snapshot.val();
        const credentials = decryptData(encryptedCredentials);

        if (!credentials) {
            return { success: false, error: 'Error al procesar credenciales' };
        }

        // Validar email y contraseña
        const passwordHash = hashPassword(password);

        if (email === credentials.email && passwordHash === credentials.passwordHash) {
            return { success: true };
        } else {
            return { success: false, error: 'Credenciales incorrectas' };
        }
    } catch (error) {
        console.error('Error al validar credenciales:', error);
        return { success: false, error: 'Error de conexión' };
    }
};

// Función para inicializar credenciales en Firebase (ejecutar una sola vez)
export const initializeAdminCredentials = async (email, password) => {
    try {
        const credentials = {
            email: email,
            passwordHash: hashPassword(password)
        };

        const encryptedCredentials = encryptData(credentials);

        // Retornar las credenciales cifradas para guardarlas manualmente en Firebase
        return {
            success: true,
            encryptedCredentials: encryptedCredentials,
            message: 'Guarda este valor en Firebase Realtime Database en la ruta: adminCredentials'
        };
    } catch (error) {
        console.error('Error al inicializar credenciales:', error);
        return { success: false, error: error.message };
    }
};
