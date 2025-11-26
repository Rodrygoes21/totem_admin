# Proyecto: Vista Pública de Tótem Interactivo

## Descripción del Proyecto

Necesito crear una aplicación web React moderna para mostrar información de tótems interactivos. Esta es la vista pública que verán los usuarios finales en pantallas táctiles o dispositivos.

## Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **HTTP Client**: Axios
- **Notificaciones**: React Hot Toast
- **Routing**: React Router DOM

## API Backend Existente

La API ya está funcionando en: `https://totem-admin.onrender.com/api`

### Endpoints Disponibles:

1. **GET /totems/:id** - Obtener información completa del tótem
   ```json
   {
     "id": 1,
     "nombre_to": "Tótem Medicina",
     "ubicacion": "Edificio A - Planta 1",
     "color": "#3498db",
     "descripcion": "Tótem informativo del área médica",
     "activo": true,
     "chatpdf_url": "https://res.cloudinary.com/...",
     "contenido_texto": "Información detallada...",
     "video_url": "https://www.youtube.com/watch?v=...",
     "mostrar_chat": true,
     "mostrar_notificaciones": true,
     "intervalo_actualizacion": 30,
     "Institucion": {
       "id": 1,
       "nombre": "Hospital Central",
       "descripcion": "..."
     },
     "Categoria": {
       "id": 2,
       "nombre": "Medicina",
       "color": "#e74c3c"
     },
     "Region": {
       "id": 1,
       "nombre": "Región Metropolitana"
     },
     "PlantillaColor": {
       "id": 1,
       "nombre": "Plantilla Azul",
       "color_principal": "#3498db",
       "color_secundario": "#2c3e50",
       "color_fondo": "#ffffff",
       "color_texto": "#000000"
     }
   }
   ```

2. **GET /totems/:id/notificaciones** - Obtener notificaciones activas del tótem
   ```json
   [
     {
       "id": 1,
       "titulo": "⚠️ ALERTA SÍSMICA",
       "mensaje": "Se ha detectado actividad sísmica. Favor dirigirse a zonas de seguridad.",
       "tipo": "emergencia", // 'info', 'warning', 'error', 'success', 'emergencia'
       "prioridad": "alta", // 'baja', 'media', 'alta', 'urgente'
       "activo": true,
       "fecha_inicio": "2024-01-15T10:00:00Z",
       "fecha_fin": "2024-01-15T12:00:00Z"
     }
   ]
   ```

3. **POST /userchat** - Enviar mensaje del usuario
   ```json
   {
     "totem_id": 1,
     "pregunta": "¿Cuál es el horario de atención?",
     "ip_address": "192.168.1.1",
     "user_agent": "Mozilla/5.0..."
   }
   ```

## Requisitos Funcionales

### 1. Página Principal del Tótem (`/totem/:id`)

#### Header:
- Logo/Nombre del tótem (grande y visible)
- Ubicación con ícono
- Botón de notificaciones (badge con cantidad)
- Botón de pantalla completa
- Usar colores de la plantilla configurada

#### Banner de Emergencia (si existe):
- Mostrar banner rojo parpadeante en la parte superior
- Ícono de alerta animado
- Título y mensaje de la emergencia
- Auto-mostrar si tipo === 'emergencia'

#### Contenido Principal (2 columnas en desktop):

**Columna Izquierda:**
- Card de Información General:
  - Nombre de la Institución
  - Categoría con color visual
  - Descripción del tótem
  - Contenido de texto formateado
  
- Botones de Acción:
  - "Ver Documento PDF" (si chatpdf_url existe)
  - "Iniciar Chat" (si mostrar_chat === true)
  - Botones grandes, coloridos, con íconos

**Columna Derecha:**
- Video embebido (si video_url existe):
  - YouTube/Vimeo responsive
  - Controles nativos
  
- Lista de Notificaciones (si mostrar_notificaciones === true):
  - Cards clickables
  - Colores según tipo:
    - emergencia: rojo
    - warning: amarillo
    - error: naranja
    - success: verde
    - info: azul
  - Badge de prioridad
  - Título y preview del mensaje

### 2. Modal de Notificación

- Overlay oscuro con blur
- Card centrado con:
  - Header con color según tipo
  - Ícono de alerta (si es emergencia, animado)
  - Título grande
  - Mensaje completo
  - Badge de prioridad
  - Botón para cerrar
- Animación de entrada suave
- Para emergencias: añadir efecto pulse

### 3. Modal de PDF Viewer

- Pantalla casi completa (90vh)
- Header con:
  - Título "Documento PDF"
  - Botón cerrar
- iframe con el PDF de Cloudinary
- Fondo oscuro detrás

### 4. Modal de Chat

- Tamaño mediano (600px de alto)
- Header con:
  - Ícono de chat
  - Nombre del tótem
  - Botón cerrar
  
- Área de mensajes:
  - Burbujas estilo WhatsApp
  - Usuario: azul, alineado a la derecha
  - Bot/Sistema: blanco, alineado a la izquierda
  - Timestamps
  - Auto-scroll al último mensaje
  
- Input de mensaje:
  - Campo de texto grande
  - Botón "Enviar" con ícono
  - Deshabilitar si está vacío
  - Submit con Enter

### 5. Sistema de Actualización Automática

- Usar `setInterval` para actualizar notificaciones
- Intervalo configurado en `totem.intervalo_actualizacion` (segundos)
- Mostrar toast discreto cuando hay nuevas notificaciones
- No recargar toda la página, solo las notificaciones

### 6. Diseño Responsive

- **Desktop/Tablet**: Layout de 2 columnas
- **Mobile**: Layout de 1 columna, stack vertical
- Botones táctiles grandes (mínimo 48x48px)
- Texto legible en pantallas táctiles (mínimo 16px)

## Requisitos de Diseño

### Colores Dinámicos:
Usar los colores de `PlantillaColor` si existen, sino usar valores por defecto:
- `color_principal`: Botones principales, header
- `color_secundario`: Botones secundarios, acentos
- `color_fondo`: Fondo de la página
- `color_texto`: Color del texto principal

### Animaciones:
- Transiciones suaves (300ms)
- Hover effects en botones
- Fade in al cargar
- Pulse en notificaciones de emergencia
- Bounce en íconos de alerta

### Accesibilidad:
- Contraste adecuado (WCAG AA)
- Textos grandes y legibles
- Botones con áreas táctiles grandes
- Focus visible en elementos interactivos

## Estructura de Carpetas Sugerida

```
totem-public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── EmergencyBanner.jsx
│   │   ├── InfoCard.jsx
│   │   ├── VideoPlayer.jsx
│   │   ├── NotificationsList.jsx
│   │   ├── NotificationModal.jsx
│   │   ├── PDFModal.jsx
│   │   └── ChatModal.jsx
│   ├── pages/
│   │   └── TotemView.jsx
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Funcionalidades Extra

1. **Pantalla Completa Automática**: 
   - Botón para entrar/salir de fullscreen
   - Útil para pantallas táctiles permanentes

2. **Modo Kiosko**:
   - Ocultar barras de navegación del navegador
   - Prevenir zoom accidental
   - Bloquear gestos de navegación

3. **Offline Fallback**:
   - Mostrar mensaje amigable si no hay conexión
   - Intentar reconectar automáticamente

4. **Loading States**:
   - Spinner mientras carga el tótem
   - Skeleton screens para mejor UX
   - Estados de error amigables

## Variables de Entorno

Crear `.env`:
```
VITE_API_URL=https://totem-admin.onrender.com/api
```

## Ejemplo de URL
La aplicación debe funcionar accediendo a: `http://localhost:5173/totem/1`
Donde `1` es el ID del tótem que se quiere mostrar.

## Notas Importantes

1. **No requiere autenticación**: Es una vista 100% pública
2. **Diseño pensado para pantallas táctiles**: Botones grandes, textos legibles
3. **Actualización en tiempo real**: Las notificaciones se actualizan automáticamente
4. **Prioridad a emergencias**: Notificaciones de tipo "emergencia" se muestran automáticamente
5. **Colores personalizables**: Cada tótem puede tener su propia paleta de colores
6. **PDFs desde Cloudinary**: URLs persistentes que no se pierden en redeploys

## Ejemplo de Flujo de Usuario

1. Usuario escanea QR code → abre `/totem/1`
2. Ve el header con nombre y ubicación
3. Si hay emergencia, ve banner rojo parpadeante
4. Puede clickear "Ver Documento PDF" para abrir modal con PDF
5. Puede clickear "Iniciar Chat" para hacer preguntas
6. Notificaciones se actualizan cada 30 segundos
7. Puede clickear en notificaciones para ver más detalles
8. Botón de fullscreen para pantallas táctiles permanentes

---

**Objetivo**: Crear una interfaz moderna, táctil y fácil de usar para que los usuarios finales interactúen con los tótems informativos.
