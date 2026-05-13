/** Copy estático página calendario / eventos (FDDN + NTC). */

export const CALENDARIO_HERO = {
  title: "Calendario de pruebas",
  subtitle:
    "Consulta próximas competiciones, jornadas y eventos de Nosework Trial. Filtra por fecha y visualiza en lista o calendario.",
};

export const CALENDARIO_SECTIONS = {
  upcomingTitle: "Próximos eventos",
  filterButton: "Filtrar pruebas",
  loadMore: "Cargar más eventos",
  emptyTitle: "No hay eventos con estos criterios",
  emptyHint: "Prueba a cambiar el mes, la ubicación o limpia los filtros.",
  calendarHint: "Selecciona un día con marca para filtrar; cambia a lista para ver el detalle.",
};

export const CALENDARIO_FILTER_LABELS = {
  month: "Fecha",
  province: "Provincia / sede",
  level: "Nivel",
  type: "Tipo",
  status: "Estado",
  all: "Todas",
  allM: "Todos",
  levels: [
    { value: "", label: "Todos" },
    { value: "ORT", label: "ORT" },
    { value: "Base", label: "Base" },
    { value: "Avanzado", label: "Avanzado" },
  ],
  types: [
    { value: "", label: "Todos" },
    { value: "oficial", label: "Oficial" },
    { value: "seminario", label: "Seminario" },
    { value: "exhibicion", label: "Exhibición" },
  ],
  statuses: [
    { value: "", label: "Todos" },
    { value: "open", label: "Abierto" },
    { value: "closed", label: "Cerrado" },
    { value: "pending", label: "Pendiente" },
  ],
};

/** Si dateFrom/dateTo cubren un mes natural completo, devuelve "YYYY-MM" para input month; si no, "". */
export function monthInputValueFromFilters(dateFrom, dateTo) {
  if (!dateFrom || !dateTo) return "";
  const from = new Date(`${dateFrom}T12:00:00`);
  const to = new Date(`${dateTo}T12:00:00`);
  if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) return "";
  if (from.getDate() !== 1) return "";
  const y = from.getFullYear();
  const m = from.getMonth();
  const last = new Date(y, m + 1, 0);
  if (to.getFullYear() !== y || to.getMonth() !== m || to.getDate() !== last.getDate()) return "";
  return `${y}-${String(m + 1).padStart(2, "0")}`;
}
