import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../db/db';
import './AgendarVacuna.css';

const AgendarVacuna = () => {
  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const navigate = useNavigate();

  const handleGuardar = async () => {
    const actividad = {
      tipo: 'Vacuna',
      vacuna: tipo,
      fecha,
    };

    await db.actividades.add(actividad);

    alert('Vacuna registrada con éxito.');
    navigate('/bienvenida');
  };

  if (!confirmar) {
    return (
      <div className="vacuna-container">
        <h2>Registrar vacuna</h2>

        <label>Tipo de vacuna:</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="">Seleccionar</option>
          <option value="Rabia">Rabia</option>
          <option value="Triple">Triple</option>
          <option value="Parvovirus">Parvovirus</option>
          <option value="Otra">Otra</option>
        </select>

        <label>Fecha de aplicación:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />

        <button className="vacuna-button" onClick={() => setConfirmar(true)}>
          Confirmar datos
        </button>

        <button className="vacuna-button" onClick={() => navigate('/agendar-actividad')}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="vacuna-container">
      <h2>¿Confirmás los datos?</h2>
      <p><strong>Vacuna:</strong> {tipo}</p>
      <p><strong>Fecha:</strong> {fecha}</p>

      <button className="vacuna-button" onClick={handleGuardar}>
        Sí, registrar
      </button>

      <button className="vacuna-button" onClick={() => setConfirmar(false)}>
        No, volver a editar
      </button>
    </div>
  );
};

export default AgendarVacuna;
