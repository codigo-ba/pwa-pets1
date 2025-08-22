//src/views/AgendarDesparasitacion
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { agregarActividad } from '../db/db'; // 📦 Persistencia modular
import { generarAlertaDesdeActividad } from '../db/alertas'; // 🚨 Generación curatorial
import './AgendarDesparasitacion.css'; // 🎨 Estilos específicos

const AgendarDesparasitacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mascotaId = location.state?.mascotaId; // 📌 Recibido desde AgendarActividad

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
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
      tipo: 'Desparasitación', // 🐛 Tipo definido por esta vista
      fecha,
      hora,
      notas,
    };

    // 💾 Persistencia y recuperación de ID generado
    const idGenerado = await agregarActividad(actividad);
    const actividadConId = { ...actividad, id: idGenerado };

    // 🚨 Generación curatorial de alerta vinculada
    await generarAlertaDesdeActividad(actividadConId);

    alert('La fecha fue agendada con éxito.');
    alert('No olvides que las desparasitaciones tienen un tiempo de utilidad. ¡Revisá la próxima fecha!');
    navigate('/bienvenida'); // 🔙 Redirigir a vista principal
  };

  // 🧭 Vista inicial: ingreso de datos
  if (!confirmar) {
    return (
      <div className="desparasitacion-container">
        <h2>Agendar desparasitación</h2>

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

        <button className="desparasitacion-button" onClick={() => setConfirmar(true)}>
          Confirmar fecha y hora
        </button>

        <button className="desparasitacion-button" onClick={() => navigate('/agendar-actividad')}>
          Volver
        </button>
      </div>
    );
  }

  // ✅ Vista de confirmación antes de guardar
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
