// src/components/ActividadCard.jsx
import React from 'react';
import './ActividadCard.css'; // 🎨 Estilos locales

const ActividadCard = ({ actividad, nombreMascota, onBorrar }) => {
  const { tipo, subtipo, fecha, hora, notas, id } = actividad;

  return (
    <div className="actividad-card">
      <h3>{nombreMascota || 'Mascota'} — {tipo}{subtipo && ` (${subtipo})`}</h3>
      <p><strong>Fecha:</strong> {fecha} {hora && `— ${hora}`}</p>
      {notas && <p className="actividad-notas">{notas}</p>}
      {onBorrar && (
        <button onClick={() => onBorrar(id)} className="borrar-button">
          🗑️ Eliminar
        </button>
      )}
    </div>
  );
};

export default ActividadCard;
