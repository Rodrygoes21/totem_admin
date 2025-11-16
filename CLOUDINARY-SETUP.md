# 📦 Configuración de Cloudinary para Almacenamiento de Archivos

## ¿Por qué Cloudinary?

Render (plan gratuito) **no tiene almacenamiento persistente**. Cuando el servicio se reinicia o redeploya, todos los archivos subidos se pierden. Cloudinary ofrece:

- ✅ **Almacenamiento persistente** en la nube
- ✅ **25GB gratuitos** (suficiente para empezar)
- ✅ **URLs directas** para PDFs, imágenes y videos
- ✅ **CDN global** (carga rápida desde cualquier lugar)
- ✅ **Transformaciones automáticas** de imágenes

---

## 🚀 Pasos para Configurar Cloudinary

### 1. Crear Cuenta Gratuita

1. Ve a: https://cloudinary.com/users/register_free
2. Regístrate con tu email
3. Verifica tu cuenta por email

### 2. Obtener Credenciales

1. Inicia sesión en: https://cloudinary.com/console
2. En el **Dashboard**, encontrarás:
   ```
   Cloud Name: xxxxxxxxxxxx
   API Key: ################
   API Secret: ************************
   ```

### 3. Configurar Variables de Entorno Localmente

Edita el archivo `backend/.env` y reemplaza los valores:

```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name_aqui
CLOUDINARY_API_KEY=tu_api_key_aqui
CLOUDINARY_API_SECRET=tu_api_secret_aqui
```

### 4. Configurar en Render (Producción)

1. Ve a tu servicio en Render: https://dashboard.render.com
2. Click en tu servicio **totem-admin** (backend)
3. Ve a **Environment** → **Environment Variables**
4. Agrega estas 3 variables:

   | Key | Value |
   |-----|-------|
   | `CLOUDINARY_CLOUD_NAME` | Tu cloud name de Cloudinary |
   | `CLOUDINARY_API_KEY` | Tu API Key |
   | `CLOUDINARY_API_SECRET` | Tu API Secret |

5. Click **Save Changes** → Render hará redeploy automático

---

## 🧪 Probar que Funciona

### Localmente:

1. Inicia el backend:
   ```bash
   cd backend
   npm start
   ```

2. Usa Postman o curl para probar:
   ```bash
   curl -X POST http://localhost:3000/api/upload/single \
     -H "Authorization: Bearer TU_TOKEN_JWT" \
     -F "file=@/ruta/a/tu/archivo.pdf"
   ```

3. Deberías recibir una respuesta con:
   ```json
   {
     "success": true,
     "data": {
       "url": "https://res.cloudinary.com/xxxx/image/upload/v1234567890/totem_pdfs/archivo.pdf",
       "cloudinary": true
     }
   }
   ```

### En Producción:

1. Espera que Render termine el redeploy (2-3 minutos)
2. Prueba subiendo un PDF desde tu frontend en Vercel
3. El PDF quedará guardado permanentemente en Cloudinary

---

## 📁 Estructura de Carpetas en Cloudinary

Los archivos se organizan automáticamente:

- `totem_pdfs/` - PDFs subidos desde formularios
- `totem_multimedia/` - Imágenes y videos múltiples

---

## ✅ Ventajas del Sistema Actual

| Característica | Antes (Local) | Ahora (Cloudinary) |
|----------------|---------------|---------------------|
| **Persistencia** | ❌ Se pierden en redeploy | ✅ Permanentes |
| **Costo** | Gratis | Gratis (25GB) |
| **Velocidad** | Lenta (desde servidor) | ⚡ Rápida (CDN) |
| **Límite tamaño** | 10MB | 100MB (configurable) |
| **Backups** | ❌ No | ✅ Automáticos |

---

## 🔧 Solución de Problemas

### Error: "Must supply cloud_name"

**Causa:** Las variables de entorno no están configuradas.

**Solución:**
1. Verifica que `.env` tenga las 3 variables de Cloudinary
2. Reinicia el servidor: `Ctrl + C` y `npm start`

### Error: "Invalid signature"

**Causa:** El `CLOUDINARY_API_SECRET` está mal.

**Solución:**
1. Ve a tu Dashboard de Cloudinary
2. Copia el API Secret exactamente como aparece
3. Actualiza `.env` o las variables en Render

### Los archivos no aparecen en Cloudinary

**Causa:** El upload falló pero no se reportó error.

**Solución:**
1. Revisa los logs del backend
2. Verifica que el archivo no exceda 10MB
3. Verifica que el tipo de archivo sea permitido (PDF, JPG, PNG, GIF, MP4)

---

## 📊 Monitorear Uso de Cloudinary

1. Ve a: https://cloudinary.com/console/media_library
2. Verás todos tus archivos organizados por carpeta
3. Puedes:
   - Ver estadísticas de uso
   - Eliminar archivos manualmente
   - Generar URLs de transformación

---

## 🔐 Seguridad

- ✅ Las credenciales están en variables de entorno (no en el código)
- ✅ Solo usuarios autenticados pueden subir archivos (middleware JWT)
- ✅ Límite de tamaño de 10MB por archivo
- ✅ Solo formatos permitidos: PDF, imágenes (JPG/PNG/GIF), videos (MP4/MPEG/MOV)

---

## 📝 Notas Importantes

1. **Plan Gratuito de Cloudinary:**
   - 25GB de almacenamiento
   - 25GB de ancho de banda/mes
   - Suficiente para ~2,500 PDFs de 10MB

2. **Si necesitas más:**
   - El plan Pro cuesta $99/mes (100GB)
   - O considera usar AWS S3 (más barato para grandes volúmenes)

3. **Alternativas Gratuitas:**
   - **Supabase Storage**: 1GB gratis
   - **Backblaze B2**: 10GB gratis
   - **AWS S3**: 5GB gratis el primer año
