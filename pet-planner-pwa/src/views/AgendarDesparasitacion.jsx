import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../db/db';
import './AgendarDesparasitacion.css';

const AgendarDesparasitacion = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const navigate = useNavigate();

  const handleGuardar = async () => {
    const actividad = {
      tipo: 'Desparasitación',
      fecha,
      hora,
      notas,
    };

    await db.actividades.add(actividad);

    alert('La fecha fue agendada con éxito.');
    alert('No olvides que las desparasitaciones tienen un tiempo de utilidad. ¡Revisá la próxima fecha!');
    navigate('/bienvenida');
  };

  if (!confirmar) {
    return (
      <div className="desparasitacion-container">
        <h2>Agendar desparasitación</h2>

        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <label>Hora:</label>
        <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} />

        <label>Notas:</label>
        <textarea value={notas} onChange={(e) => setNotas(e.target.value)} />

        <button className="desparasitacion-button" onClick={() => setConfirmar(true)}>
          Confirmar fecha y hora
        </button>

        <button className="desparasitacion-button" onClick={() => navigate('/agendar-actividad')}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="desparasitacion-container">
      <h2>¿La fecha y hora son correctas?</h2>
      <p><strong>Fecha:</strong> {fecha}</p>
      <p><strong>Hora:</strong> {hora}</p>
      <p><strong>Notas:</strong> {notas}</p>

      <button className="desparasitacion-button" onClick={handleGuardar}>
        Sí, agendar
      </button>

      <button className="desparasitacion-button" onClick={() => setConfirmar(false)}>
        No, volver a editar
      </button>
    </div>
  );
};

export default AgendarDesparasitacion;
