import Image from "next/image";
import Link from "next/link";
import { isEventDateBeforeToday } from "@/utils/eventDates";

function formatEventDate(dateStr) {
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

const STATUS_BADGE = {
  open: { className: "bg-secondary-container text-on-secondary-container", label: "Inscripción abierta" },
  waitlist: { className: "bg-[#FF8C00] text-white", label: "Lista de espera" },
  closed: { className: "bg-surface-container text-primary", label: "Cerrado" },
  upcoming: { className: "bg-surface-container text-primary", label: "Próximamente" },
};

/**
 * Normaliza evento API mínimo → props tarjeta FDDN.
 */
export function normalizeEventForFddnCard(event) {
  const statusRaw = event.status?.toLowerCase?.() || "";
  let statusKey = "upcoming";
  if (statusRaw === "open") statusKey = "open";
  else if (statusRaw === "closed") statusKey = "closed";
  else if (statusRaw === "waitlist" || statusRaw === "lista-espera") statusKey = "waitlist";
  else if (statusRaw === "pending" || statusRaw === "pendiente") statusKey = "upcoming";

  const levels = [];
  if (event.level) levels.push(String(event.level));
  if (levels.length === 0) levels.push("Base", "Avanzado");

  const hasSpots =
    event.spotsCurrent != null &&
    event.spotsTotal != null &&
    !Number.isNaN(Number(event.spotsTotal)) &&
    Number(event.spotsTotal) > 0;

  return {
    title: event.title || "Evento",
    dateLabel: event.date ? formatEventDate(event.date) : "Fecha por confirmar",
    location: event.location || event.city || "Ubicación por confirmar",
    organizer: event.organizer || event.club || "Organizador por confirmar",
    judge: event.judge || "Juez por confirmar",
    levels,
    statusKey,
    price: event.price != null && event.price !== "" ? `${event.price}€` : null,
    spots: hasSpots
      ? { current: Number(event.spotsCurrent), total: Number(event.spotsTotal) }
      : null,
    imageUrl: event.image || "/images/hero-dog.webp",
    imageAlt: event.imageAlt || event.title || "Evento Nosework Trial",
  };
}

export default function EventListingCardFddn({ event, detailHref, inscripcionHref, localizedHref }) {
  const n = normalizeEventForFddnCard(event);
  const isPast = event.date && isEventDateBeforeToday(event.date);
  const resultsHref = localizedHref && event.id != null ? localizedHref(`/eventos/${event.id}/resultados`) : null;
  const badge = STATUS_BADGE[n.statusKey] || STATUS_BADGE.upcoming;
  const pct = n.spots ? Math.min(100, Math.round((n.spots.current / n.spots.total) * 100)) : 0;
  const full = n.spots && n.spots.current >= n.spots.total;
  const canEnroll = n.statusKey === "open" && !full;
  const enrollHref = inscripcionHref || `${detailHref}#inscripcion`;

  return (
    <article className="bg-white rounded-xl overflow-hidden shadow-soft border border-surface-container-highest hover:shadow-hover transition-all group flex flex-col h-full">
      <div className="h-48 relative overflow-hidden shrink-0">
        <Image
          src={n.imageUrl}
          alt={n.imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-[13px] font-semibold ${badge.className}`}>{badge.label}</span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3 className="font-montserrat text-headline-h3 font-semibold text-primary leading-snug">{n.title}</h3>
          {n.price && <span className="text-primary font-bold shrink-0">{n.price}</span>}
        </div>
        <div className="space-y-2 text-on-surface-variant text-body-md mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl shrink-0" aria-hidden>
              calendar_today
            </span>
            {n.dateLabel}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl shrink-0" aria-hidden>
              location_on
            </span>
            {n.location}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl shrink-0" aria-hidden>
              pets
            </span>
            {n.organizer}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl shrink-0" aria-hidden>
              gavel
            </span>
            {n.judge}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {n.levels.map((lv) => (
            <span
              key={lv}
              className="px-2 py-1 bg-surface-container text-primary rounded-full text-xs font-bold uppercase tracking-wide"
            >
              {lv}
            </span>
          ))}
        </div>
        {n.spots && (
          <div className="flex justify-between items-center mb-4 border-t border-surface-container pt-3 gap-3">
            <span className="text-on-surface-variant text-body-md">
              Plazas:{" "}
              {full ? (
                <span className="text-red-700 font-bold">Completo</span>
              ) : (
                <span className="text-primary font-bold">
                  {n.spots.current}/{n.spots.total}
                </span>
              )}
            </span>
            <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden shrink-0">
              <div
                className={`h-full ${full ? "bg-red-600 w-full" : "bg-secondary"}`}
                style={!full ? { width: `${pct}%` } : undefined}
              />
            </div>
          </div>
        )}
        <div className="mt-auto space-y-2">
          {isPast && resultsHref && (
            <Link
              href={resultsHref}
              className="block w-full py-2.5 rounded-lg bg-secondary-container text-on-secondary-container font-bold text-center hover:brightness-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Resultados
            </Link>
          )}
          <div className="grid grid-cols-2 gap-2">
            <Link
              href={detailHref}
              className="py-2.5 rounded-lg border border-primary text-primary font-bold text-center hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              Detalles
            </Link>
            {canEnroll ? (
              <Link
                href={enrollHref}
                className="py-2.5 rounded-lg bg-primary text-on-primary font-bold text-center hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Inscribirme
              </Link>
            ) : (
              <span
                className="py-2.5 rounded-lg bg-primary/30 text-on-primary font-bold text-center cursor-not-allowed opacity-80"
                aria-disabled="true"
              >
                {n.statusKey === "closed" ? "Cerrado" : full ? "Completo" : "Pronto"}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
