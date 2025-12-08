# Aplicación Web para Tótems Digitales

Esta aplicación está diseñada para ser mostrada en pantallas de tótems digitales, proporcionando una interfaz profesional y atractiva para mostrar información institucional, multimedia y notificaciones.

## 🚀 Características

- **Carrusel de Multimedia**: Muestra imágenes y videos en un carrusel automático
- **Notificaciones en Tiempo Real**: Muestra alertas e información importante
- **Información Institucional**: Servicios, horarios, contacto y ubicación
- **Actualización Automática**: Se actualiza cada minuto con los últimos datos
- **Diseño Responsive**: Adaptado para diferentes tamaños de pantalla
- **Modo Emergencia**: Alertas visuales especiales para situaciones urgentes
- **Reloj en Tiempo Real**: Muestra fecha y hora actualizada

## 📋 Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Conexión a internet
- Backend API funcionando

## 🔧 Configuración

### 1. Configurar la URL del API

Edita el archivo `config.js` y actualiza la URL del API:

```javascript
const CONFIG = {
    API_URL: 'https://totem-admin.onrender.com/api',
    // ... otras configuraciones
};
```

### 2. Usar la aplicación

La aplicación necesita el ID del tótem para funcionar. Hay dos formas de configurarlo:

#### Opción A: URL con parámetro (Recomendado)
```
index.html?totem=1
```

#### Opción B: localStorage
El ID se guarda automáticamente después del primer uso.

## 🖥️ Uso en Tótems

### Para Chrome/Edge en Modo Kiosko:

```bash
chrome.exe --kiosk "file:///ruta/a/index.html?totem=1" --start-fullscreen
```

### Para Firefox:

1. Presiona F11 para pantalla completa
2. Navega a la URL con el parámetro del tótem

### Configuración Recomendada:

- **Resolución**: 1920x1080 (Full HD) o superior
- **Orientación**: Vertical o Horizontal según el tótem
- **Auto-inicio**: Configurar el navegador para iniciar automáticamente
- **Deshabilitar ahorro de energía**: Para que la pantalla no se apague

## 📁 Estructura de Archivos

```
totem-public/
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── config.js           # Configuración de la aplicación
├── app.js              # Lógica principal
└── README.md           # Esta documentación
```

## 🎨 Personalización

### Colores
Los colores se aplican automáticamente según la configuración del tótem en la base de datos.

### Intervalos de Actualización
Edita `config.js`:

```javascript
REFRESH_INTERVAL: 60000,    // Actualización de datos (60 segundos)
CAROUSEL_INTERVAL: 5000,    // Cambio de slides (5 segundos)
```

## 🔄 Funcionalidades Automáticas

- ✅ Actualización automática de contenido cada minuto
- ✅ Carrusel automático de imágenes/videos
- ✅ Reloj en tiempo real
- ✅ Prevención de apagado de pantalla (Wake Lock API)
- ✅ Reconexión automática en caso de pérdida de conexión

## 📱 Responsive

La aplicación está optimizada para:
- Pantallas verticales (tótems de pie)
- Pantallas horizontales (tótems de pared)
- Tablets y monitores

## ⚠️ Notificaciones de Emergencia

Cuando se crea una notificación de tipo "emergencia", se muestra:
- Banner destacado en la parte superior
- Modal emergente con la alerta
- Animación pulsante para llamar la atención

## 🐛 Solución de Problemas

### El tótem no muestra contenido:
1. Verifica que la URL incluya `?totem=ID`
2. Revisa la consola del navegador (F12)
3. Verifica que el backend esté funcionando
4. Confirma que el tótem existe en la base de datos

### Las imágenes no cargan:
1. Verifica que las URLs de Cloudinary sean correctas
2. Revisa los permisos CORS del backend
3. Confirma que las imágenes estén activas en el sistema

### El carrusel no avanza:
1. Verifica que haya multimedia asociada al tótem
2. Revisa que los elementos estén marcados como activos
3. Comprueba la consola por errores

## 🔐 Seguridad

- Sanitización de HTML para prevenir XSS
- Validación de datos del API
- Manejo seguro de errores

## 📞 Soporte

Para soporte técnico o reportar problemas, contacta al administrador del sistema.

## 📄 Licencia

Sistema desarrollado para uso institucional.
