import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { agregarActividad } from '../db/db'; // 📦 Persistencia modular
import './AgendarOtra.css'; // 🎨 Estilos específicos

const AgendarOtra = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mascotaId = location.state?.mascotaId; // 📌 Recibido desde AgendarActividad

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
  const [confirmar, setConfirmar] = useState(false);

  // 🧠 Guardar actividad con vínculo curatorial
  const handleGuardar = async () => {
    if (!mascotaId) {
      alert('Error: No se recibió el ID de mascota. Volvé a seleccionar una mascota.');
      navigate('/bienvenida');
      return;
    }

    const actividad = {
      mascotaId, // ✅ vínculo persistente
      tipo: 'Otra',
      fecha,
      hora,
      notas,
    };

    await agregarActividad(actividad);

    alert('La fecha fue agendada con éxito.');
    navigate('/bienvenida'); // 🔙 Redirigir a vista principal
  };

  // 🧭 Vista inicial: ingreso de datos
  if (!confirmar) {
    return (
      <div className="otra-container">
        <h2>Agendar otra actividad</h2>

        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <label>Hora:</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />

        <label>Notas:</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <button className="otra-button" onClick={() => setConfirmar(true)}>
          Confirmar fecha y hora
        </button>

        <button className="otra-button" onClick={() => navigate('/agendar-actividad')}>
          Volver
        </button>
      </div>
    );
  }

  // ✅ Vista de confirmación antes de guardar
  return (
    <div className="otra-container">
      <h2>¿La fecha y hora son correctas?</h2>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Notas:</strong> {notas}</p>

      <button className="otra-button" onClick={handleGuardar}>
        Sí, agendar
      </button>

      <button className="otra-button" onClick={() => setConfirmar(false)}>
        No, volver a editar
      </button>
    </div>
  );
};

export default AgendarOtra;
