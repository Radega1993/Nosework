/** Fecha mostrada en tablas de resultados (trial_date o fecha del evento). */
export function formatResultDateDisplay(trialDate, eventDate) {
  const raw = trialDate && String(trialDate).trim() !== "" ? trialDate : eventDate;
  if (!raw) return "—";
  const d = new Date(raw.includes("T") ? raw : `${raw}T12:00:00`);
  if (Number.isNaN(d.getTime())) return raw;
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(d);
}

export function positionLabel(position) {
  if (position == null || position === "") return "—";
  const n = Number(position);
  if (!Number.isFinite(n)) return String(position);
  return `${n}º`;
}
