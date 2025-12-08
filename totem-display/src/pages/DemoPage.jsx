import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DemoPage.css';

const DemoPage = () => {
  const [totemId, setTotemId] = useState('');
  const navigate = useNavigate();

  const openTotem = () => {
    if (!totemId || totemId < 1) {
      alert('Por favor, ingresa un ID de tótem válido (número mayor a 0)');
      return;
    }
    navigate(`/totem?totem=${totemId}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      openTotem();
    }
  };

  return (
    <div className="demo-container">
      <div className="demo-content">
        <h1>🖥️ Sistema de Tótems Digitales</h1>
        <p className="subtitle">Aplicación profesional React + Vite para mostrar información en pantallas digitales</p>

        <div className="section">
          <h2>📋 Características Principales</h2>
          <ul className="feature-list">
            <li>⚡ React + Vite para máximo rendimiento</li>
            <li>🎠 Carrusel automático de imágenes y videos</li>
            <li>🔔 Sistema de notificaciones en tiempo real</li>
            <li>🚨 Alertas de emergencia con modal destacado</li>
            <li>ℹ️ Información institucional completa</li>
            <li>🔄 Actualización automática cada minuto</li>
            <li>🕐 Reloj digital en tiempo real</li>
            <li>📱 Diseño responsive y profesional</li>
            <li>💤 Prevención de apagado de pantalla</li>
          </ul>
        </div>

        <div className="section">
          <h2>🚀 Cómo Usar</h2>
          <p><strong>Ingresa el ID del tótem:</strong></p>
          <div className="totem-selector">
            <input
              type="number"
              value={totemId}
              onChange={(e) => setTotemId(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ejemplo: 1"
              min="1"
            />
            <button className="btn" onClick={openTotem}>
              Abrir Tótem
            </button>
          </div>

          <div className="info-box">
            <strong>💡 Nota:</strong> Necesitas tener al menos un tótem creado en el sistema.
            Si no tienes ninguno, créalo desde el panel de administración primero.
          </div>
        </div>

        <div className="section">
          <h2>🔗 Enlaces Útiles</h2>
          <div className="links">
            <a href="https://totem-admin.onrender.com" target="_blank" rel="noopener noreferrer" className="btn">
              Panel de Administración
            </a>
          </div>
        </div>

        <div className="section">
          <h2>⚙️ Configuración para Tótems Físicos</h2>
          <p><strong>Modo Kiosko Chrome/Edge:</strong></p>
          <code>chrome.exe --kiosk "URL" --start-fullscreen</code>

          <p style={{ marginTop: '1rem' }}><strong>Recomendaciones:</strong></p>
          <ul className="feature-list">
            <li>📺 Resolución: 1920x1080 (Full HD)</li>
            <li>🌐 Conexión estable a internet</li>
            <li>⚡ Deshabilitar ahorro de energía</li>
            <li>🚀 Configurar inicio automático</li>
          </ul>
        </div>

        <div className="warning-box">
          <strong>⚠️ Importante:</strong> Asegúrate de que el backend esté funcionando y que el tótem
          exista en la base de datos antes de intentar visualizarlo.
        </div>

        <div className="section">
          <h2>📊 Flujo de Trabajo</h2>
          <ol style={{ paddingLeft: '1.5rem' }}>
            <li>Crear institución en el panel admin</li>
            <li>Crear tótem y asociarlo a la institución</li>
            <li>Subir multimedia (imágenes/videos) al tótem</li>
            <li>Crear notificaciones para el tótem</li>
            <li>Abrir la aplicación del tótem con su ID</li>
          </ol>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '2px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280' }}>
            Sistema desarrollado con React + Vite para gestión profesional de tótems digitales
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
