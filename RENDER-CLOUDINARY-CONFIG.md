# 🚀 Configurar Cloudinary en Render - Instrucciones Exactas

## ✅ Credenciales de tu cuenta Cloudinary:

```
Cloud Name: dtoif2szt
API Key: 243294195575383
API Secret: aRris9rC84m9KIXZZNrhg39zkQw
```

---

## 📋 Pasos para Configurar en Render:

### 1. Ir a tu Dashboard de Render
👉 https://dashboard.render.com

### 2. Seleccionar tu servicio Backend
- Busca y haz click en tu servicio **"totem-admin"** o el nombre que le hayas dado al backend

### 3. Ir a Environment Variables
- En el menú lateral izquierdo, click en **"Environment"**
- O usa la pestaña **"Environment"** en la parte superior

### 4. Agregar las 3 Variables de Entorno

Haz click en **"Add Environment Variable"** y agrega una por una:

#### Variable 1:
```
Key:   CLOUDINARY_CLOUD_NAME
Value: dtoif2szt
```

#### Variable 2:
```
Key:   CLOUDINARY_API_KEY
Value: 243294195575383
```

#### Variable 3:
```
Key:   CLOUDINARY_API_SECRET
Value: aRris9rC84m9KIXZZNrhg39zkQw
```

### 5. Guardar Cambios
- Haz click en **"Save Changes"** (botón azul)
- Render automáticamente hará un **redeploy** del servicio
- Esto toma **2-3 minutos**

---

## ✅ Verificar que Funcionó

### Opción 1: Ver los Logs
1. En tu servicio de Render, ve a **"Logs"**
2. Deberías ver algo como:
   ```
   🚀 Iniciando servidor TOTEM...
   ✅ Swagger cargado correctamente
   ✅ Conexión a la base de datos establecida
   🚀 Servidor ejecutándose en puerto 10000
   ```

### Opción 2: Probar el Endpoint
Abre este link en tu navegador:
```
https://totem-admin.onrender.com/health
```

Deberías ver:
```json
{
  "status": "ok",
  "env": "production",
  "timestamp": "2025-11-16T..."
}
```

---

## 🧪 Probar la Subida de Archivos

Una vez que Render termine el redeploy:

1. Ve a tu frontend en Vercel: https://totem-admin-bay.vercel.app
2. Inicia sesión
3. Ve a **Tótems** → **Nuevo Tótem** o **Editar**
4. Sube un PDF en el campo "Chat PDF URL"
5. El archivo se guardará en Cloudinary y verás la URL permanente

---

## 🎯 Resultado Final

Cuando subas un archivo, la respuesta será algo como:

```json
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/dtoif2szt/raw/upload/v1234567890/totem_pdfs/archivo.pdf",
    "cloudinary": true
  }
}
```

Esta URL es **permanente** y funcionará para siempre, incluso si reinicias Render.

---

## 📊 Ver tus Archivos en Cloudinary

1. Ve a: https://cloudinary.com/console/media_library
2. Verás todas tus carpetas:
   - `totem_pdfs/` - PDFs subidos
   - `totem_multimedia/` - Imágenes y videos
3. Puedes ver, descargar o eliminar archivos desde ahí

---

## ⚠️ IMPORTANTE

**NO compartas estas credenciales públicamente.** Son secretas y permiten acceso completo a tu cuenta de Cloudinary.

Si necesitas regenerar las credenciales:
1. Ve a: https://cloudinary.com/console/settings/security
2. Puedes crear nuevas API Keys
3. Actualiza las variables en Render y en tu `.env` local

---

## 🎉 ¡Listo!

Una vez configurado, tu sistema tendrá:
- ✅ Almacenamiento permanente de archivos
- ✅ URLs que nunca caducan
- ✅ CDN global (carga súper rápida)
- ✅ 25GB gratis
- ✅ Sin preocupaciones por redeploys

---

## 🆘 Problemas?

Si algo no funciona:
1. Verifica que las 3 variables estén exactamente como se muestran arriba
2. Espera a que Render termine el redeploy (mira los logs)
3. Prueba el endpoint `/health` para confirmar que el backend está activo
4. Revisa los logs en Render para ver si hay errores
