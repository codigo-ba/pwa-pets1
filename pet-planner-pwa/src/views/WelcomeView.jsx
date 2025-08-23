// src/views/WelcomeView.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerMascotas } from '../db/db'; // 🐾 Acceso a la base local
import MascotaCard from '../components/MascotaCard'; // 🧩 Componente modular
import Loader from '../components/Loader'; // ⏳ Componente de carga visual

const WelcomeView = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true); // ⏳ Estado de carga inicial

  // 🧠 Cargar mascotas al montar
  useEffect(() => {
    const cargarMascotas = async () => {
      setCargando(true); // 🔄 Activa loader
      const data = await obtenerMascotas();
      setMascotas(data);
      setCargando(false); // ✅ Finaliza carga
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
    <div className="contenedor">
      <h2 className="titulo">¿Qué querés hacer?</h2>

      <button onClick={() => navigate('/registrar-mascota')} className="boton boton-verde">
        Registrá una mascota
      </button>

      <button onClick={handleAgendarActividad} className="boton boton-naranja">
        Agendá una actividad
      </button>

      <button onClick={() => navigate('/ver-actividades')} className="boton boton-naranja-light">
        Actividades guardadas
      </button>

      <button onClick={() => navigate('/ver-mascotas')} className="boton boton-verde-light">
        Mascotas registradas
      </button>

      {/*<button onClick={() => navigate('/alertas')} className="boton boton-rojo">
        Ver alertas
      </button>*/}

      {/* 🐾 Render dinámico de mascotas con loader */}
      <div className="card">
        {cargando ? (
          <Loader mensaje="Cargando mascotas..." />
        ) : mascotas.length === 0 ? (
          <MascotaCard mascota={{ id: 0, nombre: 'Tu mascota', foto: '/default-pet.png' }} />
        ) : (
          mascotas.map((m) => <MascotaCard key={m.id} mascota={m} />)
        )}
      </div>
    </div>
  );
};

export default WelcomeView;
