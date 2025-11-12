# 🚂 Guía de Configuración de Base de Datos en Railway

## 📋 Paso a Paso para Crear la Base de Datos en Railway

### 1. Acceder a Railway

1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con tu cuenta
3. Ve a tu proyecto o crea uno nuevo

### 2. Crear el Servicio MySQL

1. En tu proyecto de Railway, haz clic en **"+ New"**
2. Selecciona **"Database"**
3. Elige **"Add MySQL"**
4. Railway creará automáticamente una instancia de MySQL

### 3. Obtener las Credenciales de Conexión

Una vez creado el servicio MySQL:

1. Haz clic en el servicio MySQL
2. Ve a la pestaña **"Connect"** o **"Variables"**
3. Copia las siguientes variables:
   - `MYSQL_HOST` o `MYSQLHOST`
   - `MYSQL_PORT` o `MYSQLPORT`
   - `MYSQL_USER` o `MYSQLUSER`
   - `MYSQL_PASSWORD` o `MYSQLPASSWORD`
   - `MYSQL_DATABASE` o `MYSQLDATABASE`

### 4. Ejecutar el Script SQL

#### Opción A: Usando la Interfaz Web de Railway (Recomendado)

1. En el servicio MySQL, busca el botón **"Query"** o **"Data"**
2. Se abrirá un editor SQL
3. Copia todo el contenido del archivo `railway-setup.sql`
4. Pégalo en el editor
5. Ejecuta el script (botón "Run" o similar)
6. Verifica que todas las tablas se hayan creado correctamente

#### Opción B: Usando MySQL Client desde Terminal

```bash
# Instalar MySQL client si no lo tienes (Windows)
# Descarga desde: https://dev.mysql.com/downloads/mysql/

# Conectar a Railway MySQL
mysql -h <MYSQL_HOST> -u <MYSQL_USER> -p<MYSQL_PASSWORD> -P <MYSQL_PORT> <MYSQL_DATABASE>

# Una vez conectado, ejecuta el script:
source railway-setup.sql

# O ejecuta directamente:
mysql -h <MYSQL_HOST> -u <MYSQL_USER> -p<MYSQL_PASSWORD> -P <MYSQL_PORT> <MYSQL_DATABASE> < railway-setup.sql
```

#### Opción C: Usando MySQL Workbench (GUI)

1. Descarga e instala [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
2. Crea una nueva conexión con las credenciales de Railway:
   - Connection Name: Railway Totem DB
   - Connection Method: Standard (TCP/IP)
   - Hostname: `<MYSQL_HOST>`
   - Port: `<MYSQL_PORT>`
   - Username: `<MYSQL_USER>`
   - Password: `<MYSQL_PASSWORD>`
   - Default Schema: `<MYSQL_DATABASE>`
3. Haz clic en "Test Connection"
4. Si la conexión es exitosa, abre la conexión
5. Ve a **File > Open SQL Script**
6. Selecciona el archivo `railway-setup.sql`
7. Ejecuta el script (botón del rayo ⚡)

#### Opción D: Usando DBeaver (GUI - Recomendado)

1. Descarga e instala [DBeaver Community](https://dbeaver.io/download/)
2. Crea una nueva conexión:
   - Database: MySQL
   - Server Host: `<MYSQL_HOST>`
   - Port: `<MYSQL_PORT>`
   - Database: `<MYSQL_DATABASE>`
   - Username: `<MYSQL_USER>`
   - Password: `<MYSQL_PASSWORD>`
3. Test Connection
4. Abre SQL Editor
5. Copia y pega el contenido de `railway-setup.sql`
6. Ejecuta (Ctrl+Enter o botón Execute)

### 5. Configurar Variables de Entorno en Railway

Una vez que la base de datos esté creada:

1. Ve a tu servicio de **Backend** en Railway
2. Ve a la pestaña **"Variables"**
3. Agrega las siguientes variables (si no están):

```env
# Base de datos
DB_HOST=<MYSQL_HOST de Railway>
DB_PORT=<MYSQL_PORT de Railway>
DB_USER=<MYSQL_USER de Railway>
DB_PASSWORD=<MYSQL_PASSWORD de Railway>
DB_NAME=<MYSQL_DATABASE de Railway>

# JWT
JWT_SECRET=tu_secreto_jwt_super_seguro_cambiar_en_produccion

# Puerto
PORT=5000

# Node Environment
NODE_ENV=production
```

### 6. Crear Usuario Administrador

Después de desplegar el backend en Railway:

#### Opción A: Usando Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar a tu proyecto
railway link

# Ejecutar el script de creación de admin
railway run node backend/scripts/create-admin.js
```

#### Opción B: SSH directo al contenedor

```bash
# En la interfaz de Railway, ve a tu servicio de backend
# Busca la opción "Shell" o "Terminal"
# Ejecuta:
cd backend/scripts
node create-admin.js
```

#### Opción C: Modificar el script SQL

Si prefieres crear el usuario desde el SQL, modifica esta línea en `railway-setup.sql`:

```sql
-- Usuario Administrador
-- Ejecuta primero este comando en Node.js para generar el hash:
-- const bcrypt = require('bcryptjs');
-- console.log(bcrypt.hashSync('TU_CONTRASEÑA_AQUI', 10));

INSERT INTO Usuario (nombre, username, email, contrasenia, rol, activo) VALUES 
('Administrador del Sistema', 'admin', 'admin@totem.com', 'AQUI_VA_EL_HASH_BCRYPT', 'admin', TRUE);
```

### 7. Verificar la Instalación

#### Verificar que las tablas existen:

```sql
SHOW TABLES;
```

Deberías ver:
- ✅ Usuario
- ✅ Region
- ✅ Institucion
- ✅ Categoria
- ✅ PlantillaColor
- ✅ TOTEM
- ✅ Multimedia
- ✅ Notificacion
- ✅ UserChat
- ✅ LogActividad

#### Verificar datos de ejemplo:

```sql
SELECT COUNT(*) as total FROM Region;
SELECT COUNT(*) as total FROM Institucion;
SELECT COUNT(*) as total FROM Categoria;
SELECT COUNT(*) as total FROM PlantillaColor;
SELECT COUNT(*) as total FROM TOTEM;
SELECT COUNT(*) as total FROM Usuario;
```

#### Verificar el usuario admin:

```sql
SELECT id, nombre, username, email, rol, activo FROM Usuario WHERE rol = 'admin';
```

### 8. Reiniciar el Backend

1. Ve a tu servicio de backend en Railway
2. Haz clic en los tres puntos **"..."**
3. Selecciona **"Restart"**
4. Espera a que el servicio se reinicie

### 9. Probar la Conexión

Una vez que todo esté configurado:

1. Accede a tu backend URL: `https://tu-proyecto.railway.app/api`
2. Prueba el endpoint de salud: `https://tu-proyecto.railway.app/api/health`
3. Intenta hacer login desde el frontend

## 🔧 Troubleshooting

### Error: "ER_NOT_SUPPORTED_AUTH_MODE"

```bash
# Conéctate a MySQL y ejecuta:
ALTER USER '<MYSQL_USER>'@'%' IDENTIFIED WITH mysql_native_password BY '<MYSQL_PASSWORD>';
FLUSH PRIVILEGES;
```

### Error: "Table doesn't exist"

Verifica que el script SQL se ejecutó completamente:

```sql
SHOW TABLES;
```

### Error: "Access denied"

Verifica las credenciales en las variables de entorno del backend.

### No puedo conectarme desde Workbench/DBeaver

Asegúrate de:
1. Usar el host correcto (generalmente termina en `.railway.app`)
2. Usar el puerto correcto (generalmente 3306 pero puede variar)
3. Permitir conexiones SSL (en Railway suele ser necesario)

### El backend no se conecta a la BD

1. Verifica que las variables de entorno estén correctamente configuradas
2. Revisa los logs del backend en Railway
3. Asegúrate de que el servicio MySQL esté corriendo

## 📝 Notas Importantes

1. **Contraseña del Admin**: Por defecto, el script crea un usuario admin con un hash de ejemplo. Debes crear un usuario admin real usando el script `create-admin.js` después del despliegue.

2. **Datos de Ejemplo**: El script incluye datos de ejemplo (instituciones, categorías, tótems). Puedes eliminarlos o modificarlos según necesites.

3. **Backups**: Railway hace backups automáticos, pero considera hacer backups manuales periódicos.

4. **Seguridad**: Cambia todas las contraseñas por defecto y usa variables de entorno seguras.

## 🎯 Orden Recomendado de Ejecución

1. ✅ Crear servicio MySQL en Railway
2. ✅ Ejecutar `railway-setup.sql` en MySQL
3. ✅ Configurar variables de entorno en el backend
4. ✅ Desplegar o reiniciar el backend
5. ✅ Crear usuario administrador con `create-admin.js`
6. ✅ Probar login desde el frontend

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs en Railway (pestaña "Logs")
2. Verifica las variables de entorno
3. Asegúrate de que todas las tablas existen
4. Verifica que el usuario admin existe y es válido

---

**¡Listo!** Tu base de datos debería estar funcionando correctamente en Railway. 🚀
