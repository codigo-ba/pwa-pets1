// src/utils/fechaUtils.js

/**
 * Convierte los campos fecha y hora de una actividad en un objeto Date válido.
 * Retorna null si la fecha es inválida o está ausente.
 */
export const parseActividadFechaHora = (actividad) => {
  const { fecha, hora } = actividad;
  if (!fecha) return null;

  const fechaCompleta = hora ? `${fecha}T${hora}` : `${fecha}T00:00`;
  const dateObj = new Date(fechaCompleta);

  return isNaN(dateObj.getTime()) ? null : dateObj;
};
