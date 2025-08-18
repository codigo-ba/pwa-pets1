//pet-planner-pwa/src/db/db.js
import Dexie from 'dexie';

const db = new Dexie('PetPlannerDB');

db.version(1).stores({
  mascotas: '++id, nombre, foto',
  actividades: '++id, mascotaId, tipo, fecha, notas'
});

export default db;

// 🐶 Mascotas
export const agregarMascota = async (mascota) => {
  return await db.mascotas.add(mascota);
};

export const obtenerMascotas = async () => {
  return await db.mascotas.toArray();
};

export const mascotaExiste = async (nombre) => {
  const mascotas = await db.mascotas.toArray();
  return mascotas.some((m) => m.nombre === nombre);
};

export const borrarMascota = async (id) => {
  await db.mascotas.delete(id);
};

// 📅 Actividades
export const agregarActividad = async (actividad) => {
  return await db.actividades.add(actividad);
};

export const obtenerActividades = async () => {
  return await db.actividades.toArray();
};

export const borrarActividad = async (id) => {
  await db.actividades.delete(id);
};

