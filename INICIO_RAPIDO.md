# 🚀 Inicio Rápido

## 1️⃣ Configurar Firebase (IMPORTANTE)

Antes de iniciar el proyecto, configura las reglas de Firebase:

1. Ve a: https://console.firebase.google.com/project/portafolio-4fb0f/database/portafolio-4fb0f-default-rtdb/rules

2. Pega estas reglas:
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

3. Click en "Publicar"

## 2️⃣ Iniciar el Proyecto

```bash
npm run dev
```

El proyecto se abrirá en `http://localhost:3000`

## 3️⃣ Acceder al Panel Admin

1. Navega a: `http://localhost:3000/admin/login`

2. Credenciales:
   - **Email:** sauldisel4@gmail.com
   - **Password:** 41292002@lv.

## 4️⃣ Usar el Panel Admin

### Agregar Proyecto:
- Click en pestaña "Proyectos"
- Click en "Agregar Proyecto"
- Completa el formulario
- Click en "Guardar"

### Editar Proyecto:
- Click en el ícono de lápiz
- Modifica los campos
- Click en "Guardar"

### Eliminar Proyecto:
- Click en el ícono de basura
- Confirma la eliminación

**Lo mismo aplica para Experiencia y Educación**

## 5️⃣ Ver Cambios en Tiempo Real

Abre dos ventanas:
1. Panel Admin: `http://localhost:3000/admin`
2. Portafolio: `http://localhost:3000`

Los cambios que hagas en el admin se reflejan inmediatamente en el portafolio.

## ⚠️ Solución de Problemas

### Error: "Permission denied"
→ Configura las reglas de Firebase (paso 1)

### Error: Pantalla en blanco
→ Abre la consola del navegador (F12) y revisa los errores

### Los cambios no se guardan
→ Verifica tu conexión a internet
→ Revisa la consola de Firebase para errores

## 📚 Más Información

- Ver `README.md` para documentación completa
- Ver `FIREBASE_SETUP.md` para configuración detallada de Firebase
- Ver `PROYECTO_COMPLETADO.md` para resumen técnico completo

## 🎉 ¡Listo!

Tu portafolio está funcionando con Firebase. Ahora puedes agregar, editar y eliminar contenido desde el panel administrativo.
