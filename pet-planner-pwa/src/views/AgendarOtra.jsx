import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../db/db';
import './AgendarOtra.css';

const AgendarOtra = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const navigate = useNavigate();

  const handleGuardar = async () => {
    const actividad = {
      tipo: 'Otra',
      fecha,
      hora,
      notas,
    };

    await db.actividades.add(actividad);

    alert('La fecha fue agendada con éxito.');
    navigate('/bienvenida');
  };

  if (!confirmar) {
    return (
      <div className="otra-container">
        <h2>Agendar otra actividad</h2>

        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <label>Hora:</label>
        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />

        <label>Notas:</label>
        <textarea value={notas} onChange={(e) => setNotas(e.target.value)} />

        <button className="otra-button" onClick={() => setConfirmar(true)}>
          Confirmar fecha y hora
        </button>

        <button className="otra-button" onClick={() => navigate('/agendar-actividad')}>
          Volver
        </button>
      </div>
    );
  }

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
