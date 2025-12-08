import React from 'react';
import './InfoSection.css';

const InfoSection = ({ institucion, totem }) => {
  const parseServicios = (servicios) => {
    if (!servicios) return [];
    return servicios.split(',').map((s) => s.trim()).filter((s) => s);
  };

  return (
    <section className="info-section">
      <div className="info-grid">
        {/* Servicios */}
        <div className="info-card">
          <div className="info-card-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h3>Servicios</h3>
          </div>
          <div className="info-card-content">
            {institucion?.servicios ? (
              <ul>
                {parseServicios(institucion.servicios).map((servicio, index) => (
                  <li key={index}>{servicio}</li>
                ))}
              </ul>
            ) : (
              <p>No hay servicios disponibles</p>
            )}
          </div>
        </div>

        {/* Horarios */}
        <div className="info-card">
          <div className="info-card-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <h3>Horarios de Atención</h3>
          </div>
          <div className="info-card-content">
            {institucion?.horario_atencion ? (
              <p>{institucion.horario_atencion}</p>
            ) : (
              <p>No hay horarios disponibles</p>
            )}
          </div>
        </div>

        {/* Contacto */}
        <div className="info-card">
          <div className="info-card-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <h3>Contacto</h3>
          </div>
          <div className="info-card-content">
            {institucion ? (
              <ul>
                {institucion.telefono && <li>📞 {institucion.telefono}</li>}
                {institucion.email && <li>📧 {institucion.email}</li>}
                {institucion.sitio_web && <li>🌐 {institucion.sitio_web}</li>}
              </ul>
            ) : (
              <p>No hay información de contacto</p>
            )}
          </div>
        </div>

        {/* Ubicación */}
        <div className="info-card">
          <div className="info-card-header">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <h3>Ubicación</h3>
          </div>
          <div className="info-card-content">
            <p>{totem?.ubicacion || 'No disponible'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
