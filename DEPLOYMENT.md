# Guía de Deployment - Proyecto TOTEM

Esta guía te ayudará a desplegar tu aplicación TOTEM:
- **Backend (Node.js/Express)** en **Render**
- **Frontend (React/Vite)** en **Vercel**

---

## 📋 Prerequisitos

1. Cuenta en [Render](https://render.com) (gratis)
2. Cuenta en [Vercel](https://vercel.com) (gratis)
3. Tu código en un repositorio Git (GitHub, GitLab, o Bitbucket)
4. Base de datos MySQL accesible públicamente (puedes usar PlanetScale, Railway, o Render PostgreSQL)

---

## 🗄️ PASO 1: Preparar Base de Datos

### Opción A: MySQL en Render (no gratis pero fácil)
1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "MySQL"
3. Configura:
   - **Name**: `totem-db`
   - **Database**: `totem_db`
   - **User**: `totem_user`
   - Plan: Starter (o el que prefieras)
4. Click "Create Database"
5. **Guarda las credenciales** (Internal Database URL, External Database URL, etc.)

### Opción B: PlanetScale (gratis, recomendado)
1. Ve a [PlanetScale](https://planetscale.com)
2. Crea una cuenta y un nuevo database
3. Click "New database" → nombre: `totem-db`
4. Crea una branch `main`
5. Click "Connect" → copia las credenciales
6. Ejecuta el script SQL desde `backend/totem.sql` en la consola de PlanetScale

### Opción C: Railway (gratis con límites)
1. Ve a [Railway](https://railway.app)
2. "New Project" → "Provision MySQL"
3. Copia las credenciales desde las variables de entorno

**⚠️ IMPORTANTE**: Ejecuta el archivo `backend/totem.sql` en tu base de datos para crear las tablas.

---

## 🚀 PASO 2: Desplegar Backend en Render

### 2.1. Preparar el Repositorio

Asegúrate de que tu backend tenga estos archivos:

**`backend/package.json`** debe tener:
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  },
  "type": "module"
}
```

### 2.2. Crear Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Conecta tu repositorio Git (GitHub/GitLab)
4. Configura el servicio:

   **Basic Settings:**
   - **Name**: `totem-backend` (o el nombre que quieras)
   - **Region**: Elige el más cercano a tus usuarios
   - **Branch**: `main` (o la rama que uses)
   - **Root Directory**: `backend` (si tu backend está en una carpeta)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (o el que prefieras)

### 2.3. Configurar Variables de Entorno

En la sección "Environment Variables", agrega estas variables:

```plaintext
NODE_ENV=production
PORT=3000

# Database (usa las credenciales de PASO 1)
DB_HOST=tu-host-mysql.com
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=totem_db

# CORS - Agrega tu dominio de Vercel (lo obtendrás después)
APP_ORIGIN=https://tu-app.vercel.app,http://localhost:5174
```

**⚠️ NOTA**: Después de desplegar el frontend, regresa aquí y actualiza `APP_ORIGIN` con la URL real de Vercel.

### 2.4. Deploy

1. Click "Create Web Service"
2. Render empezará a construir y desplegar automáticamente
3. Espera a que el status sea "Live" (verde)
4. **Copia la URL** que Render te da (ej: `https://totem-backend-xxxx.onrender.com`)

### 2.5. Verificar

Abre en tu navegador:
```
https://totem-backend-xxxx.onrender.com/health
```

Deberías ver:
```json
{"status":"ok","env":"production"}
```

---

## 🎨 PASO 3: Desplegar Frontend en Vercel

### 3.1. Preparar el Frontend

En tu proyecto frontend (React/Vite), asegúrate de tener configurada la URL del API:

**Crear archivo `.env` en la raíz del frontend:**
```plaintext
VITE_API_URL=https://totem-backend-xxxx.onrender.com
```

**En tu código (ej: `src/api/config.js` o similar):**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export default API_URL;
```

### 3.2. Desplegar en Vercel

#### Opción A: Desde la Web (más fácil)

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Importa tu repositorio Git
4. Configura el proyecto:

   **Framework Preset**: Vite (o el framework que uses)
   
   **Root Directory**: 
   - Si tu frontend está en la raíz: déjalo vacío
   - Si está en una carpeta: pon `frontend` (o el nombre de tu carpeta)
   
   **Build Settings** (normalmente Vercel los detecta automáticamente):
   - **Build Command**: `npm run build` o `vite build`
   - **Output Directory**: `dist` (para Vite)
   - **Install Command**: `npm install`

5. En **Environment Variables**, agrega:
   ```
   VITE_API_URL=https://totem-backend-xxxx.onrender.com
   ```
   (usa la URL real de tu backend de Render)

6. Click "Deploy"

7. Espera a que termine el deployment (1-3 minutos)

8. **Copia la URL** que Vercel te da (ej: `https://totem-frontend-xxxx.vercel.app`)

#### Opción B: Desde la CLI

```powershell
# Instalar Vercel CLI
npm i -g vercel

# Navegar a tu carpeta de frontend
cd frontend

# Login
vercel login

# Deploy
vercel

# Para producción
vercel --prod
```

### 3.3. Actualizar CORS en Backend

1. Regresa a [Render Dashboard](https://dashboard.render.com)
2. Abre tu servicio backend
3. Ve a "Environment" → Encuentra `APP_ORIGIN`
4. Actualiza el valor:
   ```
   https://tu-app-real.vercel.app,http://localhost:5174
   ```
5. Click "Save Changes"
6. Render redesplegará automáticamente

---

## 🔧 PASO 4: Configuración Adicional (Opcional pero Recomendado)

### 4.1. Dominio Personalizado (Vercel)

1. En Vercel Dashboard → tu proyecto → "Settings" → "Domains"
2. Agrega tu dominio personalizado
3. Configura los DNS según las instrucciones de Vercel
4. **Actualiza `APP_ORIGIN` en Render** con el nuevo dominio

### 4.2. Auto-Deploy desde GitHub

Ambos servicios (Render y Vercel) se redesplegarán automáticamente cuando hagas push a la rama conectada (ej: `main`).

### 4.3. Monitoreo y Logs

**Render:**
- Ve a tu servicio → pestaña "Logs" para ver errores en tiempo real
- Pestaña "Events" para ver historial de deployments

**Vercel:**
- Ve a tu proyecto → "Deployments" para ver historial
- Click en un deployment → "View Function Logs" para logs detallados

---

## 🐛 Solución de Problemas Comunes

### Backend no conecta a la base de datos

**Error**: `ECONNREFUSED` o `Access denied`

**Solución**:
1. Verifica que las variables `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` sean correctas
2. Si usas Render MySQL, usa el **Internal Database URL** si backend y DB están en Render
3. Si usas servicio externo (PlanetScale), usa **External URL**
4. Verifica que la IP de Render esté permitida en tu firewall de base de datos

### CORS Error en el Frontend

**Error**: `blocked by CORS policy`

**Solución**:
1. Verifica que `APP_ORIGIN` en Render incluya la URL exacta de Vercel
2. Asegúrate de que NO haya espacios extra en `APP_ORIGIN`
3. Incluye `https://` en la URL (no `http://` para producción)
4. Redespliega el backend después de cambiar variables de entorno

### Frontend no puede hacer peticiones

**Error**: `Network Error` o `ERR_CONNECTION_REFUSED`

**Solución**:
1. Verifica que `VITE_API_URL` en Vercel apunte a la URL correcta de Render
2. Asegúrate de que el backend esté "Live" en Render
3. Prueba la URL del backend directamente en el navegador (`/health`)
4. Redespliega el frontend en Vercel después de cambiar variables

### Build falla en Render

**Error**: `npm ERR! missing script: start`

**Solución**:
1. Verifica que `package.json` tenga el script `"start": "node src/server.js"`
2. Verifica que la ruta sea correcta (`src/server.js`)
3. Asegúrate de que `"type": "module"` esté presente si usas ES6 imports

### Build falla en Vercel

**Error**: Build command failed

**Solución**:
1. Verifica que las dependencias estén en `dependencies` (no solo en `devDependencies`)
2. Asegúrate de que el comando de build sea correcto para tu framework
3. Revisa los logs detallados en Vercel Dashboard

---

## 📝 Checklist Final

Antes de dar por terminado el deployment, verifica:

- [ ] Backend responde en `https://tu-backend.onrender.com/health`
- [ ] Base de datos tiene las tablas creadas (ejecutaste `totem.sql`)
- [ ] Variables de entorno configuradas en Render (DB_*, APP_ORIGIN)
- [ ] Frontend desplegado en Vercel
- [ ] Variable `VITE_API_URL` configurada en Vercel apuntando al backend
- [ ] `APP_ORIGIN` en Render incluye la URL de Vercel
- [ ] Puedes hacer login/crear usuarios desde el frontend desplegado
- [ ] No hay errores de CORS en la consola del navegador
- [ ] Las peticiones a `/api/*` funcionan correctamente

---

## 🆘 Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Documentación de Vercel](https://vercel.com/docs)
- [Guía de CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
- [Variables de entorno en Vite](https://vitejs.dev/guide/env-and-mode.html)

---

## 🎉 ¡Listo!

Tu aplicación TOTEM está ahora desplegada en producción:
- **Backend**: Render
- **Frontend**: Vercel
- **Base de Datos**: Tu servicio elegido

Cualquier push a tu rama `main` redesplegará automáticamente ambos servicios.

---

**💡 Tips Pro:**
- Usa ramas diferentes para desarrollo y producción
- Configura variables de entorno diferentes para staging
- Monitorea logs regularmente para detectar errores temprano
- Habilita HTTPS siempre (ambos servicios lo hacen automáticamente)
- Considera implementar CI/CD con tests antes de desplegar
