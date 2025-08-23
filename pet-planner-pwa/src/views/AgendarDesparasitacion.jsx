//src/views/AgendarDesparasitacion.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { agregarActividad } from '../db/db';
import { generarAlertaDesdeActividad } from '../db/alertas';
import '../styles/FormularioActividad.css'; // 🎨 Estilos curatoriales compartidos

const AgendarDesparasitacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mascotaId = location.state?.mascotaId;

  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [notas, setNotas] = useState('');
  const [confirmar, setConfirmar] = useState(false);

  const handleGuardar = async () => {
    if (!mascotaId) {
      alert('Error: No se recibió el ID de mascota. Volvé a seleccionar una mascota.');
      navigate('/bienvenida');
      return;
    }

    const actividad = {
      mascotaId,
      tipo: 'Desparasitación',
      fecha,
      hora,
      notas,
    };

    const idGenerado = await agregarActividad(actividad);
    const actividadConId = { ...actividad, id: idGenerado };

    await generarAlertaDesdeActividad(actividadConId);

    alert('La fecha fue agendada con éxito.');
    alert('No olvides que las desparasitaciones tienen un tiempo de utilidad. ¡Revisá la próxima fecha!');
    navigate('/bienvenida');
  };

  return (
    <div className="formulario-container">
      {!confirmar ? (
        <>
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

          <div className="botonera">
            <button className="boton-primario" onClick={() => setConfirmar(true)}>
              Confirmar fecha y hora
            </button>
            <button className="boton-secundario" onClick={() => navigate('/agendar-actividad')}>
              Volver
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>¿La fecha y hora son correctas?</h2>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Notas:</strong> {notas}</p>

          <div className="botonera">
            <button className="boton-primario" onClick={handleGuardar}>
              Sí, agendar
            </button>
            <button className="boton-secundario" onClick={() => setConfirmar(false)}>
              No, volver a editar
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AgendarDesparasitacion;
