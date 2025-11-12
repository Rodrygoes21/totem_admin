# 🚀 Guía Rápida de Deployment

## Archivos Importantes

- **`DEPLOYMENT.md`**: Guía completa paso a paso para desplegar en Render y Vercel
- **`backend/env.sample`**: Plantilla de variables de entorno (copia a `.env`)
- **`render.yaml`**: Configuración automática para Render (opcional)
- **`backend/vercel.json`**: Configuración para desplegar backend en Vercel (alternativa a Render)

## ⚡ Inicio Rápido

### Backend (Local)

```powershell
# Navegar a la carpeta backend
cd backend

# Copiar archivo de entorno
Copy-Item env.sample .env

# Editar .env con tus credenciales
notepad .env

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Actualizar APP_ORIGIN para tu frontend

```powershell
# Establecer la URL de tu frontend local
$env:APP_ORIGIN = "http://localhost:5174"
npm run dev
```

## 🌐 Deployment a Producción

### Opción 1: Render (Backend) + Vercel (Frontend) - **RECOMENDADO**

Lee la guía completa en **`DEPLOYMENT.md`**

**Resumen rápido:**
1. Desplegar base de datos (PlanetScale/Railway/Render)
2. Desplegar backend en Render
3. Desplegar frontend en Vercel
4. Actualizar variables de entorno en ambos servicios

### Opción 2: Vercel (Backend + Frontend) - **ALTERNATIVA**

Si prefieres tener todo en Vercel:

```powershell
# Instalar Vercel CLI
npm i -g vercel

# En la carpeta backend
cd backend
vercel --prod

# En la carpeta frontend
cd ../frontend
vercel --prod
```

## 🔑 Variables de Entorno Críticas

### Backend (Render/Vercel)

```plaintext
NODE_ENV=production
PORT=3000
DB_HOST=tu-host-mysql.com
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_NAME=totem_db
APP_ORIGIN=https://tu-frontend.vercel.app
```

### Frontend (Vercel)

```plaintext
VITE_API_URL=https://tu-backend.onrender.com
```

## 📊 Verificar Deployment

### Backend
```
GET https://tu-backend.onrender.com/health
Respuesta esperada: {"status":"ok","env":"production"}
```

### Frontend
```
Abrir: https://tu-frontend.vercel.app
Verificar que no hay errores de CORS en la consola
```

## 🐛 Problemas Comunes

| Error | Solución |
|-------|----------|
| CORS blocked | Actualiza `APP_ORIGIN` en variables de entorno del backend |
| Network Error | Verifica que `VITE_API_URL` apunte al backend correcto |
| Database connection | Revisa credenciales `DB_*` en variables de entorno |
| 500 Internal Error | Revisa logs en Render/Vercel Dashboard |

## 📚 Más Información

Ver **`DEPLOYMENT.md`** para instrucciones detalladas.

## 🆘 Comandos Útiles

```powershell
# Ver logs en tiempo real (desarrollo local)
npm run dev

# Verificar variables de entorno
Get-ChildItem Env:

# Establecer variable temporal (PowerShell)
$env:NOMBRE_VARIABLE = "valor"

# Verificar conexión a base de datos (requiere MySQL client)
mysql -h DB_HOST -u DB_USER -p DB_NAME
```

## ✅ Checklist Pre-Deployment

- [ ] Código actualizado en repositorio Git
- [ ] Variables de entorno configuradas
- [ ] Base de datos creada y tablas ejecutadas (`totem.sql`)
- [ ] `package.json` tiene script `start`
- [ ] Backend testado localmente
- [ ] Frontend testado localmente
- [ ] URLs configuradas correctamente (frontend → backend)

---

**¡Éxito en tu deployment! 🎉**
