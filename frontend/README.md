# Totem Admin Frontend

Panel de administración para la gestión de tótems.

## Tecnologías

- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Lucide React (iconos)

## Instalación

```bash
npm install
```

## Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
copy .env.example .env
```

2. Configura la URL del API en el archivo `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

## Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

## Build para Producción

```bash
npm run build
```

## Características

### Autenticación
- Login con email y contraseña
- Protección de rutas
- Control de permisos de administrador

### Gestión de Tótems
- Listado con paginación y filtros
- Crear nuevo tótem
- Editar tótem existente
- Eliminar tótem
- Activar/Desactivar tótem
- Búsqueda por nombre y ubicación
- Filtros por estado, región, institución y categoría

### Formulario Completo
- Información básica (nombre, ubicación, color, descripción)
- Relaciones (institución, categoría, región, plantilla)
- Configuración de acceso (usuario y contraseña del sitio)
- Contenido multimedia (ChatPDF URL, Video URL, contenido de texto)
- Configuración de visualización (mostrar chat, notificaciones, intervalo de actualización)

## Estructura del Proyecto

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── common/          # Componentes reutilizables
│   │   ├── layout/          # Layout del admin
│   │   └── ProtectedRoute.jsx
│   ├── config/
│   │   └── api.config.js    # Configuración de API
│   ├── context/
│   │   └── AuthContext.jsx  # Contexto de autenticación
│   ├── pages/
│   │   ├── totems/          # Páginas de tótems
│   │   └── LoginPage.jsx
│   ├── services/            # Servicios API
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Credenciales de Prueba

Usa las credenciales de administrador configuradas en tu backend.

## API Endpoints Utilizados

- `POST /api/auth/login` - Iniciar sesión
- `GET /api/totems` - Listar tótems
- `GET /api/totems/:id` - Obtener tótem por ID
- `POST /api/totems` - Crear tótem
- `PUT /api/totems/:id` - Actualizar tótem
- `DELETE /api/totems/:id` - Eliminar tótem
- `PATCH /api/totems/:id/toggle-status` - Cambiar estado
- `GET /api/instituciones` - Listar instituciones
- `GET /api/categorias` - Listar categorías
- `GET /api/regiones` - Listar regiones
- `GET /api/plantillas` - Listar plantillas de color
