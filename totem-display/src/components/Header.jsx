import React from 'react';
import { useClock } from '../hooks/useClock';
import './Header.css';

const Header = ({ institucion, totem }) => {
  const { formatTime, formatDate } = useClock();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-container">
          {institucion?.logo_url && (
            <img src={institucion.logo_url} alt="Logo" className="logo" />
          )}
        </div>
        
        <div className="institution-info">
          <h1 className="institution-name">
            {institucion?.nombre || 'Cargando...'}
          </h1>
          {institucion?.descripcion && (
            <p className="institution-description">{institucion.descripcion}</p>
          )}
        </div>
        
        <div className="datetime-container">
          <div className="time">{formatTime()}</div>
          <div className="date">{formatDate()}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
