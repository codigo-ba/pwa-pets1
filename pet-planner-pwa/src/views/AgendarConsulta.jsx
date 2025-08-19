import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { agregarActividad } from '../db/db'; // 📦 Persistencia modular
import './AgendarConsulta.css'; // 🎨 Estilos específicos

const AgendarConsulta = () => {
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
      tipo: 'Consulta',
      fecha,
      hora,
      notas,
    };

    await agregarActividad(actividad);

    alert('La consulta fue agendada con éxito.');
    navigate('/bienvenida'); // 🔙 Redirigir a vista principal
  };

  // 🧭 Vista inicial: ingreso de datos
  if (!confirmar) {
    return (
      <div className="consulta-container">
        <h2>Agendar consulta</h2>

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

        <label>Motivo de la consulta / Dr / Notas:</label>
        <textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
        />

        <button className="consulta-button" onClick={() => setConfirmar(true)}>
          Confirmar fecha y hora
        </button>

        <button className="consulta-button" onClick={() => navigate('/agendar-actividad')}>
          Volver
        </button>
      </div>
    );
  }

  // ✅ Vista de confirmación antes de guardar
  return (
    <div className="consulta-container">
      <h2>¿Confirmás la fecha y hora?</h2>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Notas:</strong> {notas}</p>

      <button className="consulta-button" onClick={handleGuardar}>
        Sí, agendar
      </button>

      <button className="consulta-button" onClick={() => setConfirmar(false)}>
        No, volver a editar
      </button>
    </div>
  );
};

export default AgendarConsulta;
