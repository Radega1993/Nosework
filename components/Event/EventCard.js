import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";

export default function EventCard({ event, onEdit, onDelete }) {
  const audienceLabel =
    event.audience === EVENT_AUDIENCE.MEMBERS_ONLY ? "Solo miembros" : "Abierto";

  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-lg font-bold">{event.title}</h3>
      <p>{event.description}</p>
      <p className="text-sm text-gray-500">{event.date}</p>
      <div className="flex flex-wrap gap-2 mt-2 text-xs">
        {event.club_id != null && (
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded">Club #{event.club_id}</span>
        )}
        <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded">{audienceLabel}</span>
        {event.kind ? (
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{event.kind}</span>
        ) : null}
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => onEdit(event)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={() => onDelete(event.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
