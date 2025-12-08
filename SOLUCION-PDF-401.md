# 🔴 PROBLEMA: PDFs en Cloudinary dan 401 Unauthorized

## ❌ **Diagnóstico:**
Los PDFs están subidos con `type: 'authenticated'` o `access_mode: 'authenticated'` en lugar de público.

## ✅ **SOLUCIÓN 1: Configurar Cloudinary Dashboard (Recomendado)**

### Paso 1: Acceder al Dashboard
1. Ve a: https://cloudinary.com/console
2. Inicia sesión con tu cuenta `dtoif2szt`

### Paso 2: Verificar configuración de Media Library
1. Ve a **Settings** (⚙️) → **Security**
2. Busca la sección **"Delivery type"**
3. Asegúrate de que esté en **"Upload"** (NO "Authenticated")

### Paso 3: Cambiar PDFs existentes a públicos
1. Ve a **Media Library**
2. Filtra por carpeta: `totem_pdfs`
3. Selecciona todos los PDFs
4. Click derecho → **"Change delivery type"** → **"Upload"**

## ✅ **SOLUCIÓN 2: Resubir los PDFs (Automático)**

Si cambiar en el dashboard no funciona, la mejor solución es **eliminar y volver a subir los PDFs**.

### Pasos:
1. En el admin del frontend, ve a cada tótem
2. Elimina el PDF actual (botón X)
3. Vuelve a subir el mismo PDF
4. El nuevo PDF se subirá con la configuración correcta (`access_mode: 'public'`)

## 🔍 **Verificar que funcionó:**

Abre esta URL en tu navegador (reemplaza con tu PDF):
```
https://res.cloudinary.com/dtoif2szt/image/upload/v1765196028/totem_pdfs/gn96z7mvwgl9njswkktq.pdf
```

**Resultado esperado:**
- ✅ El PDF se descarga o abre en el navegador
- ❌ Si sigue dando 401, el PDF aún es privado

## 📋 **URLs problemáticas detectadas:**

1. `gn96z7mvwgl9njswkktq.pdf` → 401 Unauthorized
2. `rbbj7nris8n3mutdyq6b.pdf` → 401 Unauthorized

## 🔧 **Por qué sucedió:**

Cloudinary por defecto puede configurar algunos tipos de archivos (como PDFs) como "authenticated" para mayor seguridad. Nuestro código backend ahora incluye:

```javascript
access_mode: 'public',
type: 'upload'
```

Pero esto solo aplica a **nuevos archivos**. Los existentes necesitan actualizarse manualmente.

## ⚡ **SOLUCIÓN RÁPIDA:**

**Opción A: Cambiar en Cloudinary Dashboard** (5 minutos)
- Pros: Rápido, no pierdes archivos
- Contras: Necesitas acceso al dashboard

**Opción B: Resubir PDFs desde el frontend** (10-15 minutos)
- Pros: Garantiza configuración correcta
- Contras: Tienes que volver a subir cada PDF

---

**💡 Recomendación:** Usa la **Opción A** si tienes acceso al dashboard de Cloudinary. Es más rápido y no pierdes referencias en la base de datos.
