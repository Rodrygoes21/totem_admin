# Guía de Instalación y Ejecución - Frontend Admin Totem

## 📋 Requisitos Previos

- Node.js 16+ instalado
- Backend del proyecto corriendo en `http://localhost:5000`

## 🚀 Instalación

### 1. Navegar a la carpeta del frontend

```powershell
cd c:\Users\HP\Downloads\totem_backend\totem_backend\frontend
```

### 2. Instalar dependencias

```powershell
npm install
```

### 3. Configurar variables de entorno

El archivo `.env` ya está creado con la configuración por defecto:
```env
VITE_API_URL=http://localhost:5000/api
```

Si tu backend está en otro puerto, modifica este archivo.

### 4. Ejecutar en modo desarrollo

```powershell
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

## 🔐 Acceso al Sistema

1. Abre tu navegador en `http://localhost:3000`
2. Serás redirigido a la página de login
3. Usa las credenciales de administrador de tu backend

**Ejemplo de credenciales (según tu backend):**
- Email: `admin@totem.com` 
- Password: La contraseña que configuraste con los scripts del backend

## 📱 Características Implementadas

### ✅ Autenticación
- Login con validación
- Protección de rutas
- Solo administradores pueden acceder
- Logout seguro

### ✅ Gestión de Tótems
- **Listar tótems** con tabla completa
  - Paginación
  - Búsqueda por nombre/ubicación
  - Filtros por estado (activo/inactivo)
  - Visualización de color, institución, categoría
  
- **Crear tótem nuevo**
  - Formulario completo con todos los campos
  - Validaciones en tiempo real
  - Selector de color visual
  - Selección de institución, categoría, región, plantilla
  
- **Editar tótem**
  - Carga automática de datos existentes
  - Actualización parcial de campos
  
- **Eliminar tótem**
  - Modal de confirmación
  - Eliminación segura
  
- **Activar/Desactivar tótem**
  - Toggle rápido desde la tabla
  - Actualización en tiempo real

## 🎨 Componentes Creados

### Componentes Comunes (Reutilizables)
- `Button` - Botones con variantes (primary, secondary, success, danger, etc.)
- `Input` - Campos de texto con validación y errores
- `Select` - Selector dropdown con opciones
- `TextArea` - Área de texto multilinea
- `Card` - Tarjetas para agrupar contenido
- `Badge` - Etiquetas de estado
- `Loader` - Indicador de carga
- `Modal` - Ventanas modales
- `Pagination` - Paginación completa

### Layout
- `AdminLayout` - Layout principal con sidebar y navegación
- Sidebar responsive con menú
- Header con información del usuario

### Páginas
- `LoginPage` - Página de inicio de sesión
- `TotemsListPage` - Listado de tótems con filtros
- `TotemFormPage` - Formulario crear/editar (mismo componente)

## 🛠️ Estructura de Servicios

```javascript
// Servicios API implementados:
- authService: login, logout, getMe
- totemService: getAll, getById, create, update, delete, toggleStatus
- institucionService: getAll, getById
- categoriaService: getAll, getById
- regionService: getAll, getById
- plantillaService: getAll, getById
```

## 📊 Campos del Formulario de Tótem

### Información Básica
- Nombre del Tótem ✅ (requerido)
- Ubicación ✅ (requerido)
- Color ✅ (selector visual + hex)
- Descripción (opcional)
- Estado activo (checkbox)

### Relaciones
- Institución (dropdown)
- Categoría (dropdown)
- Región (dropdown)
- Plantilla de Color (dropdown)

### Configuración de Acceso
- Usuario del sitio
- Contraseña del sitio

### Contenido y Multimedia
- URL de ChatPDF
- URL de Video
- Contenido de Texto (textarea)

### Configuración de Visualización
- Mostrar Chat (checkbox)
- Mostrar Notificaciones (checkbox)
- Intervalo de Actualización (10-300 segundos)

## 🔧 Tecnologías Utilizadas

- **React 18** - Framework principal
- **Vite** - Build tool
- **Tailwind CSS** - Estilos
- **React Router DOM** - Enrutamiento
- **Axios** - Peticiones HTTP
- **React Hook Form** - No usado finalmente, manejo manual
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos modernos
- **Context API** - Estado global de autenticación

## 🌐 Endpoints del Backend Consumidos

```
POST   /api/auth/login
GET    /api/totems
GET    /api/totems/:id
POST   /api/totems
PUT    /api/totems/:id
DELETE /api/totems/:id
PATCH  /api/totems/:id/toggle-status
GET    /api/instituciones
GET    /api/categorias
GET    /api/regiones
GET    /api/plantillas
```

## 📦 Build para Producción

```powershell
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

## 🐛 Troubleshooting

### Error de CORS
Si tienes problemas de CORS, asegúrate de que tu backend tenga configurado:
```javascript
app.use(cors({
  origin: 'http://localhost:3000'
}));
```

### Error de conexión a API
Verifica que:
1. El backend esté corriendo en el puerto 5000
2. La URL en `.env` sea correcta
3. El endpoint `/api` esté configurado en tu backend

### Error al instalar dependencias
```powershell
# Limpiar caché e instalar de nuevo
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## 📝 Próximas Mejoras Sugeridas

- [ ] Gestión de multimedia (imágenes, videos)
- [ ] Gestión de notificaciones
- [ ] Dashboard con estadísticas
- [ ] Vista previa del tótem
- [ ] Gestión completa de instituciones
- [ ] Gestión completa de categorías
- [ ] Gestión completa de regiones
- [ ] Gestión completa de plantillas
- [ ] Exportar/Importar datos
- [ ] Logs de actividad
- [ ] Perfiles de usuario

## 👨‍💻 Soporte

Para más información sobre la estructura del backend, revisa:
- `backend/README.md`
- `QUICKSTART.md`
- `DEPLOYMENT.md`
