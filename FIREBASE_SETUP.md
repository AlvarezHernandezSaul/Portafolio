# Configuración de Firebase Realtime Database

## 📋 Pasos para Configurar Firebase

### 1. Configurar Reglas de Seguridad

Ve a la consola de Firebase: https://console.firebase.google.com/project/portafolio-4fb0f/database/portafolio-4fb0f-default-rtdb/rules

Configura las siguientes reglas para permitir lectura pública y escritura solo desde el panel admin:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null || request.auth == null"
  }
}
```

**Nota:** Para mayor seguridad en producción, considera estas reglas más restrictivas:

```json
{
  "rules": {
    ".read": true,
    ".write": false,
    "personalInfo": {
      ".write": "request.auth != null"
    },
    "projects": {
      ".write": "request.auth != null"
    },
    "experience": {
      ".write": "request.auth != null"
    },
    "education": {
      ".write": "request.auth != null"
    },
    "skills": {
      ".write": "request.auth != null"
    },
    "certifications": {
      ".write": "request.auth != null"
    },
    "languages": {
      ".write": "request.auth != null"
    }
  }
}
```

### 2. Estructura de la Base de Datos

La base de datos se inicializa automáticamente con los datos por defecto la primera vez que cargas la aplicación. La estructura es:

```
portafolio-4fb0f-default-rtdb/
├── initialized: true
├── personalInfo: { ... }
├── projects: [ ... ]
├── experience: [ ... ]
├── education: [ ... ]
├── skills: { ... }
├── certifications: [ ... ]
└── languages: [ ... ]
```

### 3. Verificar Conexión

1. Inicia el proyecto: `npm run dev`
2. Abre la consola del navegador (F12)
3. Deberías ver el mensaje: "Database initialized with default data" (solo la primera vez)
4. Ve a Firebase Console > Realtime Database para ver los datos

### 4. Usar el Panel Administrativo

1. Navega a `http://localhost:3000/admin/login`
2. Ingresa credenciales:
   - Email: sauldisel4@gmail.com
   - Password: 41292002@lv.
3. Una vez dentro, puedes:
   - Editar información personal
   - Agregar/Editar/Eliminar proyectos
   - Agregar/Editar/Eliminar experiencias
   - Agregar/Editar/Eliminar educación

### 5. Sincronización en Tiempo Real

Todos los cambios realizados en el panel admin se guardan inmediatamente en Firebase y se reflejan en el portafolio público en tiempo real.

## 🔒 Seguridad

### Reglas de Producción Recomendadas

Para producción, es altamente recomendable implementar Firebase Authentication y usar estas reglas:

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null && auth.token.email == 'sauldisel4@gmail.com'"
  }
}
```

### Pasos para Implementar Authentication (Opcional):

1. Habilita Firebase Authentication en la consola
2. Agrega Email/Password como proveedor
3. Crea un usuario con email: sauldisel4@gmail.com
4. Actualiza el código de login para usar Firebase Auth en lugar de autenticación client-side

## 📊 Monitoreo

Puedes monitorear el uso de Firebase en:
- https://console.firebase.google.com/project/portafolio-4fb0f/database/portafolio-4fb0f-default-rtdb/usage

## 🚀 Deploy

Al hacer deploy en Vercel/Netlify, las variables de Firebase ya están configuradas en el código. No necesitas configurar variables de entorno adicionales.

## 🔧 Troubleshooting

### Error: "Permission denied"
- Verifica que las reglas de seguridad estén configuradas correctamente
- Asegúrate de que la URL de la base de datos sea correcta

### Error: "Database not initialized"
- Recarga la página
- Verifica la conexión a internet
- Revisa la consola de Firebase para ver si hay errores

### Los cambios no se reflejan
- Verifica que estés guardando correctamente desde el panel admin
- Revisa la consola del navegador para errores
- Verifica la conexión a Firebase en la consola de Firebase

## 📝 Notas Importantes

1. La base de datos se inicializa automáticamente con datos por defecto
2. Los datos persisten en Firebase, no en localStorage
3. Todos los cambios son permanentes y se sincronizan en tiempo real
4. Puedes restaurar datos por defecto desde el código si es necesario
