import { useEffect, useState } from 'react';
import { obtenerActividades, obtenerMascotas, borrarActividad } from '../db/db'; // 🧩 Acceso a datos
import { eliminarAlertasPorActividad } from '../db/alertas'; // 🧹 Sincronización curatorial
import ActividadCard from '../components/ActividadCard'; // 🧱 Componente modular
import './VerActividades.css'; // 🎨 Estilos locales

export default function VerActividades() {
  const [actividades, setActividades] = useState([]);
  const [mascotas, setMascotas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const acts = await obtenerActividades();
    const masc = await obtenerMascotas();
    setActividades(acts);
    setMascotas(masc);
  };

  const handleBorrar = async (id) => {
    const confirmar = window.confirm('¿Eliminar esta actividad?');
    if (confirmar) {
      await borrarActividad(id);
      await eliminarAlertasPorActividad(id); // 🧹 Elimina alertas asociadas
      await cargarDatos();
    }
  };

  const obtenerNombreMascota = (id) => {
    return mascotas.find((m) => m.id === id)?.nombre || 'Mascota desconocida';
  };

  return (
    <section>
      <h2>Actividades agendadas</h2>
      {actividades.length === 0 ? (
        <p>No hay actividades registradas.</p>
      ) : (
        <ul className="actividades-lista">
          {actividades.map((act) => {
            const nombreMascota = obtenerNombreMascota(act.mascotaId);
            return (
              <li key={act.id} className="actividad-item">
                <ActividadCard
                  actividad={act}
                  nombreMascota={nombreMascota}
                  onBorrar={handleBorrar}
                />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
