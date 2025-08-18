import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AgendarActividad.css'; // 🎨 Estilos específicos

const AgendarActividad = () => {
  const navigate = useNavigate();

  return (
    <div className="agendar-container">
      <h2>¿Qué agendamos?</h2>

      <button
        className="agendar-button"
        onClick={() => navigate('/agendar-actividad/consulta')}
      >
        Consulta
      </button>

      <button
        className="agendar-button"
        onClick={() => navigate('/agendar-actividad/vacunas')}
      >
        Vacunas
      </button>

      <button
        className="agendar-button"
        onClick={() => navigate('/agendar-actividad/desparasitacion')}
      >
        Desparasitación
      </button>

      <button
        className="agendar-button"
        onClick={() => navigate('/agendar-actividad/otras')}
      >
        Otras
      </button>
    </div>
  );
};

export default AgendarActividad;
