//pet-planner-pwa/src/views/WelcomeView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeView.css'; // 🎨 Estilos externos

const WelcomeView = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h2>¿Qué querés hacer?</h2>

      {/* 🧭 Navegación a registrar mascota */}
      <button onClick={() => navigate('/registrar-mascota')} className="welcome-button">
        Registrar una mascota
      </button>

      {/* 🧭 Navegación a agendar actividad */}
      <button onClick={() => navigate('/agendar-actividad')} className="welcome-button">
        Agendar una actividad
      </button>

      {/* 🧭 Navegación a ver actividades */}
      <button onClick={() => navigate('/ver-actividades')} className="welcome-button">
        Ver actividades guardadas
      </button>

      {/* 🆕 Botón para ver mascotas registradas */}
      <button onClick={() => navigate('/ver-mascotas')} className="welcome-button">
        Ver mascotas registradas
      </button>
    </div>
  );
};

export default WelcomeView;


