import React, { useEffect } from 'react';
import { getTotemId } from '../config';
import { useTotemData } from '../hooks/useTotemData';
import Header from '../components/Header';
import Notifications from '../components/Notifications';
import Carousel from '../components/Carousel';
import InfoSection from '../components/InfoSection';

const TotemDisplay = () => {
  const totemId = getTotemId();
  const { totem, institucion, multimedia, notificaciones, loading, error } = useTotemData(totemId);

  // Prevenir que la pantalla se apague
  useEffect(() => {
    let wakeLock = null;

    const requestWakeLock = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
          console.log('Wake Lock activado');
        }
      } catch (err) {
        console.error('Error activando Wake Lock:', err);
      }
    };

    requestWakeLock();

    const handleVisibilityChange = () => {
      if (wakeLock !== null && document.visibilityState === 'visible') {
        requestWakeLock();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Cargando información del tótem...</h2>
        <p>Por favor espere</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <h2>Error</h2>
        <p>{error}</p>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
          Use ?totem=ID en la URL para especificar un tótem
        </p>
      </div>
    );
  }

  return (
    <>
      <Header institucion={institucion} totem={totem} />
      
      <Notifications notificaciones={notificaciones} />
      
      <main className="main-content">
        <Carousel multimedia={multimedia} />
        <InfoSection institucion={institucion} totem={totem} />
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <p>Sistema de Información Digital - Tótem Interactivo</p>
          <div className="footer-badge">
            <span className="status-dot"></span>
            <span>En línea</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default TotemDisplay;
