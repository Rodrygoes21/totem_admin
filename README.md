# 🎯 TOTEM Admin - Sistema de Gestión de Tótems Interactivos

Sistema completo de administración para tótems digitales con backend Node.js, frontend React y base de datos MySQL.

## 🚀 Stack Tecnológico

### Backend
- **Node.js** v22+ con ES Modules
- **Express.js** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL** - Base de datos (Railway)
- **JWT** - Autenticación
- **Bcrypt** - Hash de contraseñas
- **Joi** - Validación de datos

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool
- **React Router DOM** - Navegación
- **Axios** - HTTP Client
- **Tailwind CSS** - Estilos
- **React Hot Toast** - Notificaciones
- **Heroicons** - Iconos

## 📁 Estructura del Proyecto

```
totem_admin/
├── backend/              # Backend Node.js + Express
│   ├── src/
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── models/       # Modelos Sequelize
│   │   ├── routes/       # Rutas de la API
│   │   ├── middlewares/  # Auth, validación, errores
│   │   ├── config/       # Configuración
│   │   └── utils/        # Utilidades
│   ├── scripts/          # Scripts útiles
│   └── package.json
│
├── frontend/             # Frontend React + Vite
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas de la app
│   │   ├── services/     # Servicios API
│   │   ├── context/      # Context API (Auth)
│   │   └── config/       # Configuración
│   └── package.json
│
├── DEPLOY-GUIDE.md       # Guía de deployment
└── README.md             # Este archivo
```

## 🗄️ Base de Datos

### Tablas Principales
- **Usuario** - Usuarios del sistema
- **Region** - Regiones geográficas
- **Institucion** - Instituciones
- **Categoria** - Categorías de tótems
- **PlantillaColor** - Plantillas de colores
- **TOTEM** - Tótems (tabla principal)
- **Multimedia** - Contenido multimedia
- **Notificacion** - Notificaciones
- **UserChat** - Mensajes de chat
- **LogActividad** - Registro de actividades

## 🔧 Instalación Local

### Prerrequisitos
- Node.js v22+
- MySQL (o cuenta en Railway)
- Git

### 1. Clonar el Repositorio
```bash
git clone https://github.com/Rodrygoes21/totem_admin.git
cd totem_admin
```

### 2. Configurar Backend
```bash
cd backend
npm install

# Crear archivo .env (copiar de env.sample)
cp env.sample .env

# Editar .env con tus credenciales
# DB_HOST=switchback.proxy.rlwy.net
# DB_PORT=18664
# DB_USER=root
# DB_PASSWORD=tu_password
# DB_NAME=railway
# JWT_SECRET=tu_secreto_aqui
```

### 3. Crear Base de Datos
```bash
# Opción 1: Usando el script SQL
# Conecta a tu Railway MySQL y ejecuta:
mysql -h switchback.proxy.rlwy.net -P 18664 -u root -p railway < backend/railway-final.sql

# Opción 2: Usar el script de Node.js
node backend/scripts/verify-db.js
```

### 4. Iniciar Backend
```bash
cd backend
npm start
# Backend corriendo en http://localhost:3000
```

### 5. Configurar Frontend
```bash
cd ../frontend
npm install

# Crear archivo .env
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

### 6. Iniciar Frontend
```bash
cd frontend
npm run dev
# Frontend corriendo en http://localhost:5173
```

## 👤 Usuario por Defecto

```
Email: admin@totem.com
Password: admin123
```

## 📡 API Endpoints

### Autenticación
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registro
- `GET /api/auth/profile` - Perfil del usuario

### Tótems
- `GET /api/totems` - Listar tótems (paginado)
- `GET /api/totems/:id` - Obtener tótem por ID
- `POST /api/totems` - Crear tótem (admin)
- `PUT /api/totems/:id` - Actualizar tótem (admin)
- `DELETE /api/totems/:id` - Eliminar tótem (admin)

### Catálogos
- `GET /api/instituciones` - Listar instituciones
- `GET /api/categorias` - Listar categorías
- `GET /api/regiones` - Listar regiones
- `GET /api/plantillas` - Listar plantillas de color

Ver documentación completa en `/api/docs` (Swagger UI)

## 🌐 Deployment

### Backend en Render
```bash
# Ver guía detallada en DEPLOY-GUIDE.md
# URL esperada: https://totem-backend.onrender.com
```

### Frontend en Vercel
```bash
# Ver guía detallada en DEPLOY-GUIDE.md
# URL esperada: https://totem-admin.vercel.app
```

## 🧪 Scripts Útiles

### Backend
```bash
npm run dev        # Desarrollo con hot-reload
npm start          # Producción
node scripts/create-admin.js  # Crear usuario admin
node scripts/verify-db.js     # Verificar conexión DB
```

### Frontend
```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build para producción
npm run preview    # Preview del build
```

## 🔐 Seguridad

- ✅ Autenticación JWT
- ✅ Passwords hasheados con bcrypt
- ✅ Validación de datos con Joi
- ✅ CORS configurado
- ✅ Variables de entorno para secretos
- ✅ Middleware de autenticación
- ✅ Control de acceso por roles

## 📊 Características

### Backend
- ✅ API RESTful completa
- ✅ Autenticación y autorización
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ Logging con Winston
- ✅ Documentación Swagger
- ✅ CORS configurado

### Frontend
- ✅ Dashboard administrativo
- ✅ CRUD completo de tótems
- ✅ Gestión de catálogos
- ✅ Login/Logout
- ✅ Rutas protegidas
- ✅ Diseño responsive
- ✅ Notificaciones toast
- ✅ Paginación

## 🐛 Troubleshooting

### Error de conexión a la base de datos
```bash
# Verifica las credenciales en .env
# Verifica que Railway MySQL esté activo
# Prueba la conexión:
node backend/scripts/verify-db.js
```

### Frontend no conecta con Backend
```bash
# Verifica VITE_API_URL en frontend/.env
# Verifica que el backend esté corriendo
curl http://localhost:3000/health
```

### Error de CORS
```bash
# Verifica APP_ORIGIN en backend/.env
# Debe coincidir con la URL del frontend
```

## 📝 Licencia

Este proyecto es privado y pertenece a Rodrygoes21.

## 👨‍💻 Autor

**Rodrigo** - [Rodrygoes21](https://github.com/Rodrygoes21)

## 🔗 Enlaces

- **Repositorio:** https://github.com/Rodrygoes21/totem_admin
- **Backend (Render):** https://totem-backend.onrender.com
- **Frontend (Vercel):** https://totem-admin.vercel.app
- **Database:** Railway MySQL

---

¿Necesitas ayuda? Revisa la [Guía de Deployment](DEPLOY-GUIDE.md) o los archivos en `backend/scripts/` para scripts útiles.
