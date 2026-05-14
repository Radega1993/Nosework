import Link from "next/link";
import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";

export default function EventCard({ event, onEdit, onDelete, manageParticipantsHref }) {
  const audienceLabel =
    event.audience === EVENT_AUDIENCE.MEMBERS_ONLY ? "Solo miembros" : "Abierto";

  const loc = [event.municipality, event.province].filter(Boolean).join(", ");
  const price =
    event.price_euros != null && event.price_euros !== ""
      ? `${Number(event.price_euros).toLocaleString("es-ES", { minimumFractionDigits: 0, maximumFractionDigits: 2 })} €`
      : null;

  return (
    <div className="bg-white p-4 shadow-soft rounded-xl border border-outline-variant">
      <h3 className="text-lg font-bold text-primary font-montserrat">{event.title}</h3>
      {loc ? <p className="text-sm text-on-surface-variant mt-1">{loc}</p> : null}
      {price ? <p className="text-sm font-semibold text-on-surface mt-1">Precio prueba: {price}</p> : null}
      <p className="text-sm text-on-surface mt-2 line-clamp-3">{event.description}</p>
      <p className="text-sm text-on-surface-variant mt-2">{event.date}</p>
      <div className="flex flex-wrap gap-2 mt-2 text-xs">
        {event.club_id != null && (
          <span className="bg-surface-container-highest text-on-surface-variant px-2 py-0.5 rounded">Club #{event.club_id}</span>
        )}
        <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-semibold">{audienceLabel}</span>
        {event.kind ? (
          <span className="bg-surface-container-highest text-on-surface px-2 py-0.5 rounded">{event.kind}</span>
        ) : null}
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {manageParticipantsHref ? (
          <Link
            href={manageParticipantsHref}
            className="w-full text-center rounded-lg border-2 border-primary text-primary px-4 py-2 text-sm font-bold hover:bg-primary/5 transition-colors"
          >
            Gestionar participantes
          </Link>
        ) : null}
        <div className="flex justify-between gap-2">
          <button
            type="button"
            onClick={() => onEdit(event)}
            className="bg-primary hover:opacity-95 text-white px-4 py-2 rounded-lg text-sm font-bold"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={() => onDelete(event.id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
