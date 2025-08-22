// src/db/db.js
import Dexie from 'dexie';

// 🧱 Inicialización de la base de datos
const db = new Dexie('PetPlannerDB');

// 🧠 Versión 2: se agrega la store 'alertas' sin romper las existentes
db.version(2).stores({
  mascotas: '++id, nombre, foto', // 🐶 Datos de mascotas
  actividades: '++id, mascotaId, tipo, fecha, notas, hora', // 📅 Actividades con hora incluida
  alertas: '++id, actividadId, tipo, estado, fechaAlerta, mensaje, creadaEn' // 🚨 Alertas curatoriales
});

export default db;

//
// 🐶 Mascotas
//

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

//
// 📅 Actividades
//

export const agregarActividad = async (actividad) => {
  return await db.actividades.add(actividad);
};

export const obtenerActividades = async () => {
  return await db.actividades.toArray();
};

export const borrarActividad = async (id) => {
  await db.actividades.delete(id);
};
