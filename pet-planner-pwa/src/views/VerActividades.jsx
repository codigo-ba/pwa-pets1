// src/views/ver-actividades.jsx
import { useEffect, useState } from 'react';
import { obtenerActividades, borrarActividad } from '../db/db';
import './VerActividades.css';


export default function VerActividades() {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    cargarActividades();
  }, []);

  const cargarActividades = async () => {
    const data = await obtenerActividades();
    setActividades(data);
  };

  const handleBorrar = async (id) => {
    const confirmar = window.confirm('¿Eliminar esta actividad?');
    if (confirmar) {
      await borrarActividad(id);
      await cargarActividades(); // recarga la lista
    }
  };

  return (
    <section>
      <h2>Actividades agendadas</h2>
      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        <ul>
          {actividades.map((act) => (
            <li key={act.id}>
              <strong>{act.tipo}</strong> - {act.fecha}
              <button onClick={() => handleBorrar(act.id)}>🗑️ Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
