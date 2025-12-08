# 🔧 ERRORES COMUNES FRONTEND - GUÍA PARA DESARROLLADORA

## ✅ ERRORES YA CORREGIDOS

### 1. URL del API en .env
**Antes:** `VITE_API_URL=http://localhost:3000/api`
**Ahora:** `VITE_API_URL=https://totem-admin.onrender.com/api`

### 2. Endpoint de multimedia por totem
**Antes:** No existía
**Ahora:** `GET /api/multimedia/totem/:totemId` ✅

---

## 🚨 ERRORES POTENCIALES QUE PUEDE ENCONTRAR

### 1. ERROR: CORS - Origen no permitido
**Síntoma:**
```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solución:** 
El backend YA permite estos orígenes:
- https://totem-admin-bay.vercel.app ✅
- https://totem-admin.vercel.app ✅
- http://localhost:5173 ✅
- http://localhost:5174 ✅

Si despliega en otro dominio, avisar para agregarlo.

---

### 2. ERROR: 401 Unauthorized en endpoints protegidos
**Síntoma:**
```json
{
  "success": false,
  "message": "No autorizado"
}
```

**Causa:** Falta el token de autenticación

**Solución:**
```javascript
// Primero hacer login
const { token } = await authService.login({
  email: 'admin@totem.com',
  password: 'admin123'
});

// Luego llamar a otros endpoints (el token se guarda automáticamente)
const totems = await totemService.getAll();
```

---

### 3. ERROR: 404 Not Found en rutas
**Endpoints disponibles:**

#### 🔐 AUTH (públicos)
```
POST /api/auth/login
POST /api/auth/register
GET  /api/auth/me (requiere token)
```

#### 🏛️ TÓTEMS
```
GET    /api/totems
GET    /api/totems/:id
POST   /api/totems (requiere token admin/moderador)
PUT    /api/totems/:id (requiere token)
DELETE /api/totems/:id (requiere token admin)
PATCH  /api/totems/:id/toggle-status (requiere token)
```

#### 📸 MULTIMEDIA
```
GET    /api/multimedia
GET    /api/multimedia/:id
GET    /api/multimedia/totem/:totemId  <--- NUEVA RUTA ✅
POST   /api/multimedia (requiere token)
PUT    /api/multimedia/:id (requiere token)
DELETE /api/multimedia/:id (requiere token admin)
```

#### 🏢 INSTITUCIONES
```
GET    /api/instituciones
GET    /api/instituciones/:id
POST   /api/instituciones (requiere token)
PUT    /api/instituciones/:id (requiere token)
DELETE /api/instituciones/:id (requiere token admin)
```

#### 📂 CATEGORÍAS
```
GET    /api/categorias
GET    /api/categorias/:id
POST   /api/categorias (requiere token)
PUT    /api/categorias/:id (requiere token)
DELETE /api/categorias/:id (requiere token admin)
```

#### 🗺️ REGIONES
```
GET    /api/regiones
GET    /api/regiones/:id
POST   /api/regiones (requiere token)
PUT    /api/regiones/:id (requiere token)
DELETE /api/regiones/:id (requiere token admin)
```

#### 🎨 PLANTILLAS
```
GET    /api/plantillas
GET    /api/plantillas/:id
POST   /api/plantillas (requiere token)
PUT    /api/plantillas/:id (requiere token)
DELETE /api/plantillas/:id (requiere token admin)
```

#### 🔔 NOTIFICACIONES
```
GET    /api/notificaciones
GET    /api/notificaciones/:id
POST   /api/notificaciones (requiere token)
PUT    /api/notificaciones/:id (requiere token)
DELETE /api/notificaciones/:id (requiere token)
```

---

### 4. ERROR: Galería de fotos/videos no carga
**Verificar:**

```javascript
// ✅ CORRECTO - Usar el nuevo endpoint
const multimedia = await multimediaService.getByTotem(totemId);

// ❌ INCORRECTO - Este endpoint NO existe
const multimedia = await api.get(`/totems/${totemId}/multimedia`);
```

**Estructura de respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "tipo_multimedia": "imagen",
      "url": "https://res.cloudinary.com/...",
      "titulo": "Foto 1",
      "orden": 0,
      "totem_id": 1,
      "activo": true
    }
  ],
  "total": 1
}
```

---

### 5. ERROR: Subir archivos a Cloudinary
**Configuración necesaria en .env del backend:**
```env
CLOUDINARY_CLOUD_NAME=dtoif2szt
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**Uso en frontend:**
```javascript
import { uploadFile } from '../services/upload.service';

const handleUpload = async (file) => {
  const url = await uploadFile(file);
  // Guardar URL en multimedia
  await multimediaService.create({
    tipo_multimedia: 'imagen',
    url: url,
    titulo: file.name,
    totem_id: totemId
  });
};
```

---

### 6. ERROR: Roles y permisos
**Roles disponibles:**
- `admin` - Acceso total (create, read, update, DELETE)
- `moderador` - Puede crear y editar (NO puede eliminar)
- `usuario` - Solo lectura

**Usuario de prueba:**
```
Email: admin@totem.com
Password: admin123
Rol: admin
```

---

### 7. ERROR: Formato de datos incorrecto
**Ejemplo: Crear tótem**

```javascript
// ✅ CORRECTO
const totemData = {
  nombre_to: "Tótem Central",
  ubicacion: "Hall Principal",
  color: "#3498db",
  institucion_id: 1,
  categoria_id: 2,
  region_id: 1,
  plantilla_id: 1,
  mostrar_chat: true,
  mostrar_notificaciones: true
};

// ❌ INCORRECTO - Campos faltantes o nombres incorrectos
const totemData = {
  nombre: "Tótem Central", // ❌ Debe ser 'nombre_to'
  institucion: 1 // ❌ Debe ser 'institucion_id'
};
```

---

### 8. ERROR: Paginación
**Parámetros de query:**
```javascript
const params = {
  page: 1,      // Página actual
  limit: 10,    // Items por página
  search: '',   // Búsqueda (opcional)
  activo: true  // Filtro (opcional)
};

const response = await totemService.getAll(params);
// response.data - Array de items
// response.pagination - { page, limit, total, pages }
```

---

## 🔍 DEBUGGING

### Ver todas las requests en consola
El `api.config.js` ya tiene logs habilitados:
```javascript
console.log('📤 API Request:', {
  method: config.method,
  url: config.url,
  fullURL: `${config.baseURL}${config.url}`,
  hasToken: !!token
});
```

### Revisar errores del backend
Render logs: https://dashboard.render.com/web/totem-backend/logs

### Health check
```
GET https://totem-admin.onrender.com/health
```

### Documentación Swagger
```
https://totem-admin.onrender.com/api/docs
```

---

## 📋 CHECKLIST ANTES DE REPORTAR ERROR

- [ ] ¿La URL del API es correcta? (https://totem-admin.onrender.com/api)
- [ ] ¿Hice login y tengo token?
- [ ] ¿El endpoint existe? (ver lista arriba)
- [ ] ¿Los datos tienen el formato correcto?
- [ ] ¿Revisé la consola del navegador?
- [ ] ¿Revisé los logs de Render?
- [ ] ¿El health check responde?

---

## 🆘 CONTACTO DE EMERGENCIA

Si encuentra un error no listado aquí:
1. Capturar screenshot del error en consola
2. Anotar el endpoint y método (GET/POST/PUT/DELETE)
3. Copiar el request body (si aplica)
4. Revisar logs de Render
5. Reportar con toda la info anterior

---

**Última actualización:** 8 de diciembre de 2025
**Backend:** https://totem-admin.onrender.com
**Frontend:** https://totem-admin-bay.vercel.app
**Documentación:** https://totem-admin.onrender.com/api/docs
