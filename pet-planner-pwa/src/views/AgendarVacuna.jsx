import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { agregarActividad } from '../db/db'; // 📦 Persistencia modular
import { generarAlertaDesdeActividad } from '../db/alertas'; // 🚨 Generación curatorial
import './AgendarVacuna.css'; // 🎨 Estilos específicos

const AgendarVacuna = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mascotaId = location.state?.mascotaId; // 📌 Recibido desde AgendarActividad

  const [tipo, setTipo] = useState('');
  const [fecha, setFecha] = useState('');
  const [confirmar, setConfirmar] = useState(false);

  // 🧠 Guardar actividad con vínculo curatorial y generar alerta
  const handleGuardar = async () => {
    if (!mascotaId) {
      alert('Error: No se recibió el ID de mascota. Volvé a seleccionar una mascota.');
      navigate('/bienvenida');
      return;
    }

    // 🧩 Construcción del objeto actividad
    const actividad = {
      mascotaId, // ✅ vínculo persistente
      tipo: 'Vacuna',
      subtipo: tipo, // 🧬 Subtipo específico
      fecha,
    };

    // 💾 Persistencia y recuperación de ID generado
    const idGenerado = await agregarActividad(actividad);
    const actividadConId = { ...actividad, id: idGenerado };

    // 🚨 Generación curatorial de alerta vinculada
    await generarAlertaDesdeActividad(actividadConId);

    alert('Vacuna registrada con éxito.');
    navigate('/bienvenida'); // 🔙 Redirigir a vista principal
  };

  // 🧭 Vista inicial: ingreso de datos
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
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
        />

        <button className="vacuna-button" onClick={() => setConfirmar(true)}>
          Confirmar datos
        </button>

        <button className="vacuna-button" onClick={() => navigate('/agendar-actividad')}>
          Volver
        </button>
      </div>
    );
  }

  // ✅ Vista de confirmación antes de guardar
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
