import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerMascotas } from '../db/db'; // 🐾 Acceso a la base local
import MascotaCard from '../components/MascotaCard'; // 🧩 Componente modular
import './WelcomeView.css'; // 🎨 Estilos externos

const WelcomeView = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);

  // 🧠 Cargar mascotas al montar
  useEffect(() => {
    const cargarMascotas = async () => {
      const data = await obtenerMascotas();
      setMascotas(data);
    };
    cargarMascotas();
  }, []);

  // 🧭 Lógica para decidir el flujo al agendar actividad
  const handleAgendarActividad = async () => {
    const mascotasRegistradas = await obtenerMascotas();

    if (mascotasRegistradas.length === 1) {
      navigate('/agendar-actividad', {
        state: { mascotaId: mascotasRegistradas[0].id }
      });
    } else if (mascotasRegistradas.length > 1) {
      navigate('/seleccionar-mascota');
    } else {
      alert('Aún no hay mascotas registradas. Primero registrá una para agendar actividades.');
    }
  };

  return (
    <div className="welcome-container">
      <h2>¿Qué querés hacer?</h2>

      <button onClick={() => navigate('/registrar-mascota')} className="welcome-button">
        Registrar una mascota
      </button>

      <button onClick={handleAgendarActividad} className="welcome-button">
        Agendar una actividad
      </button>

      <button onClick={() => navigate('/ver-actividades')} className="welcome-button">
        Ver actividades guardadas
      </button>

      <button onClick={() => navigate('/ver-mascotas')} className="welcome-button">
        Ver mascotas registradas
      </button>

      {/* 🐾 Render dinámico de mascotas */}
      <div className="mascotas-lista">
        {mascotas.length === 0 ? (
          <MascotaCard mascota={{ id: 0, nombre: 'Tu mascota', foto: '/default-pet.png' }} />
        ) : (
          mascotas.map((m) => <MascotaCard key={m.id} mascota={m} />)
        )}
      </div>
    </div>
  );
};

export default WelcomeView;
