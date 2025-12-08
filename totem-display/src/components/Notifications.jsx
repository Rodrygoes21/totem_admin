import React, { useState } from 'react';
import './Notifications.css';

const Notifications = ({ notificaciones }) => {
  const [emergencyModal, setEmergencyModal] = useState(null);

  React.useEffect(() => {
    const emergencia = notificaciones.find((n) => n.tipo === 'emergencia');
    if (emergencia) {
      setEmergencyModal(emergencia);
      setTimeout(() => setEmergencyModal(null), 10000);
    }
  }, [notificaciones]);

  const getIcon = (tipo) => {
    const icons = {
      info: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      ),
      success: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      warning: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      error: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
      ),
      emergencia: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
    };
    return icons[tipo] || icons.info;
  };

  if (notificaciones.length === 0) {
    return null;
  }

  return (
    <>
      <div className="notifications-container">
        {notificaciones.map((notif) => (
          <div key={notif.id} className={`notification ${notif.tipo}`}>
            <div className="notification-icon">{getIcon(notif.tipo)}</div>
            <div className="notification-content">
              <h4 className="notification-title">{notif.titulo}</h4>
              <p className="notification-message">{notif.mensaje}</p>
            </div>
            <span className={`notification-priority ${notif.prioridad}`}>
              {notif.prioridad}
            </span>
          </div>
        ))}
      </div>

      {emergencyModal && (
        <div className="modal show" onClick={() => setEmergencyModal(null)}>
          <div className="modal-content emergency" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <h2>{emergencyModal.titulo}</h2>
            </div>
            <div className="modal-body">{emergencyModal.mensaje}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notifications;
