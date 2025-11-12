# Guía de Deployment

## 📦 Desplegar Backend en Render

### Paso 1: Crear cuenta en Render
1. Ve a https://render.com y crea una cuenta
2. Conecta tu cuenta de GitHub

### Paso 2: Crear Web Service
1. Click en "New +" → "Web Service"
2. Conecta tu repositorio: `Rodrygoes21/totem_admin`
3. Configura los siguientes valores:

**Configuración Básica:**
- **Name:** `totem-backend`
- **Region:** Oregon (USA West)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Variables de Entorno:**
```
NODE_ENV=production
PORT=10000
DB_HOST=switchback.proxy.rlwy.net
DB_PORT=18664
DB_USER=root
DB_PASSWORD=JKwXRjsKuiXWlXaThpyJIgWRYctZqCki
DB_NAME=railway
JWT_SECRET=tu_clave_secreta_aqui_muy_larga_y_segura
APP_ORIGIN=https://totem-admin.vercel.app
```

4. Click en "Create Web Service"
5. Espera a que el deploy termine (5-10 minutos)
6. Anota la URL que te da Render (ej: `https://totem-backend.onrender.com`)

### Paso 3: Verificar el Backend
Una vez deployado, verifica que funciona:
```bash
curl https://totem-backend.onrender.com/health
```

---

## 🌐 Desplegar Frontend en Vercel

### Paso 1: Instalar Vercel CLI (Opcional)
```bash
npm install -g vercel
```

### Paso 2: Deploy desde el Dashboard
1. Ve a https://vercel.com y crea una cuenta
2. Click en "Add New..." → "Project"
3. Importa tu repositorio: `Rodrygoes21/totem_admin`
4. Configura los siguientes valores:

**Configuración del Proyecto:**
- **Framework Preset:** Vite
- **Root Directory:** `frontend`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Variables de Entorno:**
```
VITE_API_URL=https://totem-backend.onrender.com/api
```

5. Click en "Deploy"
6. Espera a que el deploy termine (2-5 minutos)
7. Anota la URL que te da Vercel (ej: `https://totem-admin.vercel.app`)

### Paso 3: Actualizar CORS en Backend
Una vez que tengas la URL de Vercel, actualiza la variable `APP_ORIGIN` en Render:
1. Ve a tu servicio en Render
2. Click en "Environment"
3. Edita `APP_ORIGIN` con tu URL de Vercel
4. Click en "Save Changes" (esto reiniciará el servicio)

---

## 🚀 Deploy Rápido con CLI

### Backend (Render)
```bash
# El deploy se hace automáticamente con git push
git add .
git commit -m "Deploy to Render"
git push origin main
```

### Frontend (Vercel)
```bash
# Opción 1: Desde el dashboard (recomendado para primera vez)
# Sigue los pasos anteriores

# Opción 2: Con Vercel CLI
cd frontend
vercel
# Sigue las instrucciones interactivas
```

---

## ✅ Verificación Post-Deploy

### 1. Verificar Backend
```bash
curl https://totem-backend.onrender.com/health
curl https://totem-backend.onrender.com/api/info
```

### 2. Verificar Frontend
- Abre tu navegador en `https://totem-admin.vercel.app`
- Intenta hacer login con: `admin@totem.com` / `admin123`
- Navega por las diferentes secciones

### 3. Verificar Comunicación
- Crea un nuevo tótem desde el frontend
- Verifica que se guarde en la base de datos Railway
- Comprueba que las imágenes y datos se muestren correctamente

---

## 🔧 Troubleshooting

### Backend no inicia
1. Verifica los logs en Render Dashboard
2. Comprueba que las variables de entorno estén correctas
3. Verifica que Railway MySQL esté accesible

### Frontend no conecta con Backend
1. Verifica que `VITE_API_URL` tenga la URL correcta de Render
2. Comprueba que `APP_ORIGIN` en Render tenga la URL de Vercel
3. Verifica la consola del navegador para errores CORS

### Error 503 en Render
- Los servicios gratuitos de Render se duermen después de 15 minutos de inactividad
- La primera petición después de dormir puede tardar 30-60 segundos
- Esto es normal en el plan gratuito

---

## 📝 URLs Importantes

- **Backend API:** https://totem-backend.onrender.com
- **Frontend:** https://totem-admin.vercel.app
- **Database:** Railway MySQL (switchback.proxy.rlwy.net:18664)
- **Repositorio:** https://github.com/Rodrygoes21/totem_admin

---

## 🔐 Seguridad

**IMPORTANTE:** Antes de hacer el código público:
1. Cambia todas las contraseñas
2. Usa variables de entorno para todos los secretos
3. No commitees archivos `.env`
4. Regenera el `JWT_SECRET`
5. Actualiza las credenciales de Railway

---

## 🔄 Actualizaciones Futuras

Para actualizar el código desplegado:
```bash
# 1. Haz tus cambios localmente
git add .
git commit -m "Descripción de cambios"
git push origin main

# 2. Render y Vercel se actualizarán automáticamente
```

---

## 💰 Costos

- **Render (Backend):** GRATIS (con limitaciones)
  - 750 horas/mes gratis
  - Se duerme después de 15 min de inactividad
  - 512 MB RAM

- **Vercel (Frontend):** GRATIS
  - 100 GB bandwidth/mes
  - Builds ilimitados
  - Deploy automático

- **Railway (Database):** $5/mes aproximadamente
  - Primeros $5 gratis
  - Luego se cobra por uso

**Total estimado:** $5/mes (solo database)
