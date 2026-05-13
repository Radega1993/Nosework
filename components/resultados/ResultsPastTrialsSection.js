import Link from "next/link";

function formatShortDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr.includes("T") ? dateStr : `${dateStr}T12:00:00`);
  if (Number.isNaN(d.getTime())) return dateStr;
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d);
}

/**
 * Pruebas que ya tienen filas en event_results.
 */
export default function ResultsPastTrialsSection({ events = [], localizedHref, loading }) {
  if (loading) {
    return (
      <section className="mb-10">
        <h2 className="font-montserrat text-xl font-bold text-primary mb-4">Pruebas con resultados</h2>
        <p className="text-on-surface-variant text-sm">Cargando…</p>
      </section>
    );
  }

  if (!events.length) {
    return (
      <section className="mb-10">
        <h2 className="font-montserrat text-xl font-bold text-primary mb-4">Pruebas con resultados</h2>
        <p className="text-on-surface-variant text-sm bg-white rounded-xl border border-outline-variant p-6">
          Cuando se publiquen resultados en la base de datos, aparecerán aquí con enlace a la clasificación de cada
          prueba.
        </p>
      </section>
    );
  }

  return (
    <section className="mb-10">
      <h2 className="font-montserrat text-xl font-bold text-primary mb-4">Pruebas con resultados</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {events.map((ev) => (
          <li key={ev.id}>
            <Link
              href={localizedHref(`/eventos/${ev.id}/resultados`)}
              className="flex items-center justify-between gap-3 p-4 rounded-xl bg-white border border-outline-variant shadow-soft hover:border-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              <div className="min-w-0">
                <p className="font-bold text-primary truncate">{ev.title}</p>
                <p className="text-sm text-on-surface-variant">{formatShortDate(ev.date)}</p>
              </div>
              <span className="shrink-0 text-sm font-bold text-secondary">
                {ev.result_count} {ev.result_count === 1 ? "fila" : "filas"}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant" aria-hidden>
                chevron_right
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
