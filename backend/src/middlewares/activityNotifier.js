import db from '../models/index.js';

/**
 * activityNotifier
 * - Crea una Notificacion cada vez que una petición POST/PUT/PATCH/DELETE
 *   responde con status 2xx o 3xx.
 * - La notificación queda almacenada en la tabla Notificacion y puede leerse
 *   mediante los endpoints existentes de notificaciones.
 */
export default function activityNotifier(req, res, next) {
  const methods = ['POST', 'PUT', 'PATCH', 'DELETE'];
  if (!methods.includes(req.method)) return next();

  res.on('finish', async () => {
    try {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        const usuarioInfo = req.user ? (req.user.username || req.user.email || `id:${req.user.id}`) : 'anon';
        const titulo = `Cambio: ${req.method} ${req.originalUrl}`;
        const mensaje = `Usuario ${usuarioInfo} realizó ${req.method} en ${req.originalUrl}`;
        // Ajusta los campos según el modelo Notificacion en tu proyecto
        await db.Notificacion.create({
          titulo,
          mensaje,
          tipo: 'info',
          prioridad: 'media',
          totem_id: req.body.totem_id || null,
          fecha_inicio: new Date(),
          activo: true
        }).catch(err => console.error('activityNotifier create error:', err));
      }
    } catch (err) {
      console.error('activityNotifier error:', err);
    }
  });

  next();
}