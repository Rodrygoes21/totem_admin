import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config';
import './Carousel.css';

const Carousel = ({ multimedia }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (multimedia.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % multimedia.length);
    }, API_CONFIG.CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [multimedia.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % multimedia.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + multimedia.length) % multimedia.length);
  };

  if (multimedia.length === 0) {
    return (
      <section className="carousel-section">
        <div className="carousel-container">
          <div className="carousel-empty">
            <h3>No hay contenido multimedia disponible</h3>
            <p>Por favor, agregue imágenes o videos desde el panel de administración</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="carousel-section">
      <div className="carousel-container">
        <div className="carousel">
          {multimedia.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-item ${index === currentSlide ? 'active' : ''}`}
            >
              {item.tipo_multimedia === 'video' ? (
                <video autoPlay muted loop playsInline>
                  <source src={item.url} type="video/mp4" />
                  Tu navegador no soporta video HTML5.
                </video>
              ) : item.tipo_multimedia === 'imagen' ? (
                <img src={item.url} alt={item.titulo} />
              ) : null}
              
              {(item.titulo || item.descripcion) && (
                <div className="carousel-caption">
                  {item.titulo && <h3>{item.titulo}</h3>}
                  {item.descripcion && <p>{item.descripcion}</p>}
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="carousel-button prev" onClick={prevSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button className="carousel-button next" onClick={nextSlide}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div className="carousel-indicators">
          {multimedia.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
