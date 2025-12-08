# 🖥️ Guía Rápida de Inicio - Tótem Local

## ✨ Forma MÁS FÁCIL (Recomendada)

### **Haz doble clic en:**
```
INICIAR-SERVIDOR.bat
```

¡Y listo! El servidor se iniciará automáticamente.

---

## 📋 URLs Disponibles:

Una vez iniciado el servidor, abre en tu navegador:

- **Página de Inicio**: http://localhost:3001
- **Demo**: http://localhost:3001/demo.html
- **Tótem ID 1**: http://localhost:3001/index.html?totem=1
- **Tótem ID 2**: http://localhost:3001/index.html?totem=2

---

## 🎯 Pasos Completos:

### 1️⃣ **Iniciar el Servidor**
```bash
# Opción A: Doble clic en el archivo .bat
INICIAR-SERVIDOR.bat

# Opción B: Desde terminal PowerShell
node server.js
```

### 2️⃣ **Abrir en el Navegador**
Abre tu navegador (Chrome, Edge, Firefox) y ve a:
```
http://localhost:3001
```

### 3️⃣ **Ver un Tótem Específico**
En la página demo, ingresa el ID del tótem y haz clic en "Abrir Tótem"

---

## ⚠️ Requisitos:

- ✅ Node.js instalado (si no lo tienes: https://nodejs.org)
- ✅ Backend corriendo en https://totem-admin.onrender.com
- ✅ Al menos un tótem creado en el sistema

---

## 🛠️ Solución de Problemas:

### ❌ "Puerto en uso"
Si el puerto 3001 está ocupado, edita `server.js` y cambia:
```javascript
const PORT = 3001;  // Cambia a 3002, 3003, etc.
```

### ❌ "Node.js no encontrado"
Instala Node.js desde: https://nodejs.org/es/download/

### ❌ "No se ven los datos"
1. Verifica que el backend esté funcionando
2. Abre la consola del navegador (F12) para ver errores
3. Verifica que el ID del tótem exista en la base de datos

---

## 🎨 Personalización:

### Cambiar el puerto:
Edita `server.js` línea 6:
```javascript
const PORT = 3001; // Tu puerto preferido
```

### Cambiar API URL:
Edita `config.js` línea 3:
```javascript
API_URL: 'https://tu-api.com/api',
```

---

## 🚀 Modo Kiosko (Pantalla Completa):

### Windows - Chrome:
```bash
chrome.exe --kiosk http://localhost:3001/index.html?totem=1
```

### Windows - Edge:
```bash
msedge.exe --kiosk http://localhost:3001/index.html?totem=1
```

---

## 📱 Acceso desde otros dispositivos:

Si quieres ver el tótem desde otra computadora o tablet en la misma red:

1. Encuentra tu IP local (ejecuta `ipconfig` en cmd)
2. Usa esa IP en lugar de localhost:
   ```
   http://192.168.1.100:3001/index.html?totem=1
   ```

---

## 🔄 Para Detener el Servidor:

Presiona `Ctrl + C` en la ventana donde se está ejecutando el servidor.

---

## 💡 Consejos:

- Usa Chrome o Edge para mejor rendimiento
- F11 para pantalla completa manual
- Actualiza cada minuto automáticamente
- Los cambios en archivos requieren recargar la página (F5)

---

**¡Disfruta de tu sistema de tótems digitales!** 🎉
