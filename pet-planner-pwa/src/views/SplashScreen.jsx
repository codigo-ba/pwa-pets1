//pet-planner-pwa/src/views/SplashScreen.jsx
import React from 'react';
import './SplashScreen.css'; // Estilos separados para claridad

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <img src="/splash-logo.png" alt="PetCare Planner Logo" className="splash-logo" />
      <p className="splash-subtitle">
        Organizá la salud de tus mascotas. Sin conexión. Sin complicaciones.
      </p>
    </div>
  );
};

export default SplashScreen;

