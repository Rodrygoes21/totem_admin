import { useState, useEffect } from 'react';
import { totemService, institucionService, multimediaService, notificacionService } from '../services/api';
import { API_CONFIG } from '../config';

export const useTotemData = (totemId) => {
  const [totem, setTotem] = useState(null);
  const [institucion, setInstitucion] = useState(null);
  const [multimedia, setMultimedia] = useState([]);
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!totemId) {
      setError('No se ha especificado un ID de tótem');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Cargar datos del tótem
      const totemResponse = await totemService.getById(totemId);
      if (totemResponse.success) {
        setTotem(totemResponse.data);

        // Cargar institución
        if (totemResponse.data.institucion_id) {
          const institucionResponse = await institucionService.getById(
            totemResponse.data.institucion_id
          );
          if (institucionResponse.success) {
            setInstitucion(institucionResponse.data);
          }
        }
      }

      // Cargar multimedia
      const multimediaResponse = await multimediaService.getByTotem(totemId);
      if (multimediaResponse.success) {
        const sorted = multimediaResponse.data.sort((a, b) => a.orden - b.orden);
        setMultimedia(sorted);
      }

      // Cargar notificaciones
      const notifResponse = await notificacionService.getByTotem(totemId);
      if (notifResponse.success) {
        const now = new Date();
        const activeNotifs = notifResponse.data.filter((n) => {
          const start = new Date(n.fecha_inicio);
          const end = n.fecha_fin ? new Date(n.fecha_fin) : null;
          return now >= start && (!end || now <= end);
        });
        setNotificaciones(activeNotifs);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error loading totem data:', err);
      setError('Error al cargar los datos del tótem');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Auto-refresh
    const interval = setInterval(() => {
      fetchData();
    }, API_CONFIG.REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [totemId]);

  return { totem, institucion, multimedia, notificaciones, loading, error, refetch: fetchData };
};
