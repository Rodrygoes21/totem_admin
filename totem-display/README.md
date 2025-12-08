# 🖥️ Tótem Display - Aplicación React + Vite

Aplicación moderna y profesional desarrollada con **React** y **Vite** para mostrar información en tótems digitales.

## ✨ Características

- ⚡ **React 18 + Vite** - Rendimiento ultra rápido
- 🎠 **Carrusel Multimedia** - Imágenes y videos con transiciones suaves
- 🔔 **Notificaciones en Tiempo Real** - Sistema de alertas dinámico
- 🚨 **Modo Emergencia** - Alertas visuales especiales
- 📱 **100% Responsive** - Adaptado para cualquier pantalla
- 🔄 **Auto-actualización** - Sincronización automática con el backend
- 💤 **Wake Lock API** - Previene el apagado de pantalla
- 🎨 **Diseño Moderno** - UI profesional y atractiva

## 🚀 Inicio Rápido

### 1. Instalar Dependencias

```bash
npm install
```

### 2. Configurar Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz:

```env
VITE_API_URL=https://totem-admin.onrender.com/api
```

### 3. Iniciar en Desarrollo

```bash
npm run dev
```

La aplicación se abrirá en `http://localhost:3002`

### 4. Compilar para Producción

```bash
npm run build
```

Los archivos compilados estarán en la carpeta `dist/`

## 📖 Uso

### Modo Desarrollo

1. Ejecuta `npm run dev`
2. Abre `http://localhost:3002`
3. Ingresa el ID del tótem
4. Haz clic en "Abrir Tótem"

### Modo Producción

```bash
npm run build
npm run preview
```

## 🌐 URLs Disponibles

- **Página Demo**: `http://localhost:3002/`
- **Tótem Directo**: `http://localhost:3002/totem?totem=1`

## 📁 Estructura del Proyecto

```
totem-display/
├── src/
│   ├── components/         # Componentes React reutilizables
│   │   ├── Header.jsx
│   │   ├── Carousel.jsx
│   │   ├── Notifications.jsx
│   │   └── InfoSection.jsx
│   ├── hooks/              # Custom Hooks
│   │   ├── useClock.js
│   │   └── useTotemData.js
│   ├── pages/              # Páginas principales
│   │   ├── DemoPage.jsx
│   │   └── TotemDisplay.jsx
│   ├── services/           # Servicios de API
│   │   └── api.js
│   ├── config.js           # Configuración
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── package.json
├── vite.config.js          # Configuración de Vite
└── README.md
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de producción
npm run preview

# Linter
npm run lint
```

## 🎯 Configuración del Tótem

### URL con Parámetro

```
http://localhost:3002/totem?totem=1
```

### Modo Kiosko (Chrome)

```bash
chrome.exe --kiosk "http://localhost:3002/totem?totem=1" --start-fullscreen
```

### Modo Kiosko (Edge)

```bash
msedge.exe --kiosk "http://localhost:3002/totem?totem=1" --start-fullscreen
```

## 🌐 Despliegue

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Build Manual

```bash
npm run build
# Subir la carpeta dist/ a tu servidor
```

## 🔄 Actualización Automática

La aplicación se actualiza automáticamente cada 60 segundos para obtener:
- Nuevas imágenes y videos
- Notificaciones actualizadas
- Cambios en la información institucional

Puedes modificar el intervalo en `src/config.js`:

```javascript
export const API_CONFIG = {
  REFRESH_INTERVAL: 60000, // 60 segundos
  CAROUSEL_INTERVAL: 5000,  // 5 segundos
};
```

## 🎨 Personalización

### Colores

Los colores se configuran automáticamente según el tótem en la base de datos.

También puedes modificar los colores base en `src/App.css`:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #1e40af;
  /* ... más colores */
}
```

### Intervalos

Modifica en `src/config.js`:

```javascript
REFRESH_INTERVAL: 60000,  // Actualización de datos
CAROUSEL_INTERVAL: 5000,   // Cambio de slides
```

## 📱 Responsive

Optimizado para:
- 📺 Tótems verticales (Portrait)
- 🖥️ Tótems horizontales (Landscape)
- 💻 Desktop
- 📱 Tablets
- 📱 Móviles

## 🐛 Solución de Problemas

### Error: "No se ha especificado un ID de tótem"

Asegúrate de incluir `?totem=ID` en la URL.

### Las imágenes no cargan

1. Verifica que las URLs de Cloudinary sean correctas
2. Revisa la consola del navegador (F12)
3. Confirma que el backend esté funcionando

### El carrusel no avanza

1. Verifica que haya multimedia activa en el sistema
2. Revisa la consola por errores
3. Confirma que el tótem tenga contenido asociado

## 📦 Dependencias Principales

- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-router-dom**: ^7.1.1
- **axios**: ^1.7.9
- **vite**: ^6.0.5

## 🔐 Seguridad

- ✅ Sanitización de datos
- ✅ Validación de entradas
- ✅ Manejo seguro de errores
- ✅ CORS configurado correctamente

## 📞 Soporte

Para soporte técnico o reportar problemas:
1. Revisa la consola del navegador (F12)
2. Verifica que el backend esté funcionando
3. Confirma que el tótem existe en la base de datos

## 📄 Licencia

Sistema desarrollado para uso institucional.

## 🚀 Próximas Mejoras

- [ ] Modo offline con cache
- [ ] Estadísticas de visualización
- [ ] Chat interactivo
- [ ] Soporte para más tipos de multimedia
- [ ] Temas personalizables

---

**Desarrollado con ❤️ usando React + Vite**
