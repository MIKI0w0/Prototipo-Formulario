import React from 'react';
import './Notificaciones.css'; 

function Notificaciones({ mensaje, error }) {
  if (!mensaje && !error) return null; // No renderiza si no hay nada que mostrar

  return (
    <div className="notificaciones-container">
      {mensaje && <div className="notificaciones-mensaje">{mensaje}</div>}
      {error && <div className="notificaciones-error">{error}</div>}
    </div>
  );
}

export default Notificaciones;