# 🚀 RESUMEN RÁPIDO - Nueva Base de Datos en Railway

## 📦 Archivos Creados

1. ✅ **railway-setup.sql** - Script completo de creación de BD
2. ✅ **RAILWAY-DB-SETUP.md** - Guía detallada paso a paso
3. ✅ **verify-railway-db.sql** - Script de verificación
4. ✅ **generate-admin-hash.js** - Generador de contraseña admin

## ⚡ Inicio Rápido (5 minutos)

### 1️⃣ Crear MySQL en Railway
```
1. Ve a railway.app
2. Tu proyecto → "+ New" → "Database" → "Add MySQL"
3. Espera a que se cree (30 segundos)
```

### 2️⃣ Ejecutar el Script SQL

**Opción Más Fácil - Desde Railway Web:**
```
1. Click en tu servicio MySQL
2. Click en "Query" o "Data"
3. Copia TODO el contenido de: railway-setup.sql
4. Pégalo en el editor web
5. Click "Run" o "Execute"
6. ✅ Listo!
```

**Alternativa - Desde MySQL Workbench:**
```
1. Abre MySQL Workbench
2. Nueva conexión con datos de Railway
3. File → Open SQL Script → railway-setup.sql
4. Execute (botón del rayo ⚡)
```

### 3️⃣ Generar Contraseña Admin

```powershell
cd backend/scripts
node generate-admin-hash.js
# Ingresa tu contraseña deseada
# Copia el INSERT que te da
# Ejecuta ese INSERT en Railway MySQL
```

### 4️⃣ Configurar Variables de Entorno

En Railway, tu servicio Backend → Variables:

```env
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=3306
DB_USER=root
DB_PASSWORD=<tu-password-de-railway>
DB_NAME=railway
JWT_SECRET=cambiar_por_algo_super_seguro_123456
PORT=5000
NODE_ENV=production
```

### 5️⃣ Reiniciar Backend

```
Railway → Tu servicio Backend → "..." → Restart
```

### 6️⃣ ¡Probar!

```
1. Abre tu frontend: https://tu-frontend.vercel.app
2. Login con: admin@totem.com / tu-contraseña
3. ¡A gestionar tótems! 🎉
```

## ✅ Verificar Todo Funciona

Ejecuta este script en Railway MySQL:
```sql
-- Pega el contenido de: verify-railway-db.sql
```

Deberías ver:
- ✅ 10 tablas creadas
- ✅ Datos de ejemplo en instituciones, categorías, etc.
- ✅ 1 usuario admin (después de crearlo)
- ✅ 4 tótems de ejemplo

## 🆘 Problemas Comunes

### "No puedo conectarme a MySQL"
- Verifica que el servicio MySQL esté "Running" en Railway
- Copia las variables EXACTAS desde Railway

### "Table doesn't exist"
- El script railway-setup.sql no se ejecutó completamente
- Vuelve a ejecutarlo

### "Cannot login"
- ¿Creaste el usuario admin con generate-admin-hash.js?
- Verifica: `SELECT * FROM Usuario WHERE rol='admin';`

### "Backend no conecta a BD"
- Verifica TODAS las variables de entorno en Railway
- DB_HOST debe ser el host completo de Railway
- DB_NAME suele ser "railway" por defecto

## 📊 Estructura de la Base de Datos

```
📦 totem_db (railway)
├── 👤 Usuario (autenticación y roles)
├── 🌍 Region (ubicaciones geográficas)
├── 🏢 Institucion (organizaciones)
├── 🏷️ Categoria (clasificación)
├── 🎨 PlantillaColor (temas de color)
├── 🖥️ TOTEM (tótems principales) ⭐
├── 📸 Multimedia (imágenes, videos)
├── 📢 Notificacion (avisos y alertas)
├── 💬 UserChat (conversaciones)
└── 📝 LogActividad (auditoría)
```

## 🎯 Siguiente Paso

Una vez que la BD esté funcionando:

1. **Frontend ya está listo** (lo creamos antes) ✅
2. **Backend necesita las variables** ☝️
3. **Crear usuario admin** ☝️
4. **¡Empezar a usar el sistema!** 🚀

## 📞 Comandos Útiles

```bash
# Generar hash de contraseña
node backend/scripts/generate-admin-hash.js

# Crear admin interactivo (si backend ya está corriendo)
node backend/scripts/create-admin.js

# Verificar base de datos (si backend ya está corriendo)
node backend/scripts/verify-db.js

# Ver logs de Railway
railway logs
```

## 🎨 Credenciales de Prueba

Después de crear el admin, puedes hacer login con:
```
Email: admin@totem.com
Password: [la que configuraste]
```

---

**¿Todo listo?** 
1. ✅ MySQL creado en Railway
2. ✅ railway-setup.sql ejecutado
3. ✅ Usuario admin creado
4. ✅ Variables configuradas
5. ✅ Backend reiniciado

**¡Ya puedes usar tu sistema de tótems!** 🎉
