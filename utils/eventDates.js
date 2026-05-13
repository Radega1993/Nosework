/**
 * Parsea la fecha de un evento (YYYY-MM-DD o ISO) como mediodía local para evitar desfases UTC.
 * @param {string} dateStr
 * @returns {Date|null}
 */
export function parseEventLocalDate(dateStr) {
  if (!dateStr) return null;
  const ymd = String(dateStr).split("T")[0];
  const parts = ymd.split("-").map(Number);
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  return new Date(y, m - 1, d, 12, 0, 0, 0);
}

/**
 * YYYY-MM-DD del día local del evento (coherente con parseEventLocalDate / calendario).
 * @param {string} dateStr
 * @returns {string|null}
 */
export function getEventLocalYmd(dateStr) {
  const d = parseEventLocalDate(dateStr);
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Normaliza dateFrom/dateTo del filtro a YYYY-MM-DD. */
export function normalizeFilterYmd(value) {
  if (!value) return null;
  const ymd = String(value).split("T")[0];
  return /^\d{4}-\d{2}-\d{2}$/.test(ymd) ? ymd : null;
}

/** true si el día del evento es estrictamente anterior al inicio de hoy (hora local). */
export function isEventDateBeforeToday(dateStr) {
  const eventDay = parseEventLocalDate(dateStr);
  if (!eventDay) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const ed = new Date(eventDay);
  ed.setHours(0, 0, 0, 0);
  return ed < today;
}

/** Comparación por día calendario local entre event.date y un Date (p. ej. selección calendario). */
export function isEventOnSameLocalDay(dateStr, calendarDate) {
  if (!dateStr || !calendarDate) return false;
  const a = parseEventLocalDate(dateStr);
  if (!a) return false;
  const b = new Date(calendarDate);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
