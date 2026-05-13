import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";

export default function EventForm({
  eventData,
  onChange,
  onSubmit,
  onCancel,
  isEditMode,
  clubSelectOptions = [],
  allowEventWithoutClub = false,
}) {
  const audience = eventData.audience || EVENT_AUDIENCE.OPEN;
  const showClubSelect = allowEventWithoutClub || clubSelectOptions.length > 0;

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {showClubSelect && (
        <div>
          <label htmlFor="clubId" className="block text-sm font-bold mb-2">
            Club
          </label>
          <select
            id="clubId"
            name="clubId"
            value={eventData.clubId === null || eventData.clubId === undefined ? "" : String(eventData.clubId)}
            onChange={onChange}
            className="border p-2 w-full rounded"
          >
            {allowEventWithoutClub && <option value="">Sin club (evento general)</option>}
            {clubSelectOptions.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.display_name || c.name}
                {c.status && c.status !== "approved" ? ` (${c.status})` : ""}
              </option>
            ))}
          </select>
          {!allowEventWithoutClub && (
            <p className="text-xs text-gray-500 mt-1">El evento quedará asociado al club que elijas.</p>
          )}
        </div>
      )}
      {!allowEventWithoutClub && clubSelectOptions.length === 0 && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
          No tienes clubs registrados. Crea un club para publicar eventos ligados a él.
        </p>
      )}
      <fieldset className="space-y-2">
        <legend className="block text-sm font-bold mb-1">Audiencia</legend>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="audience"
            value={EVENT_AUDIENCE.OPEN}
            checked={audience === EVENT_AUDIENCE.OPEN}
            onChange={onChange}
          />
          <span className="text-sm">Abierto (cualquier usuario registrado puede inscribirse)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="audience"
            value={EVENT_AUDIENCE.MEMBERS_ONLY}
            checked={audience === EVENT_AUDIENCE.MEMBERS_ONLY}
            onChange={onChange}
          />
          <span className="text-sm">Solo miembros del club (membresía activa)</span>
        </label>
      </fieldset>
      <div>
        <label htmlFor="kind" className="block text-sm font-bold mb-2">
          Tipo (opcional)
        </label>
        <input
          type="text"
          id="kind"
          name="kind"
          value={eventData.kind || ""}
          onChange={onChange}
          placeholder="Ej. entreno, prueba oficial…"
          className="border p-2 w-full rounded"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-bold mb-2">
          Fecha
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={eventData.date}
          onChange={onChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-bold mb-2">
          Título
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={eventData.title}
          onChange={onChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-bold mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={eventData.description}
          onChange={onChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Cancelar
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          {isEditMode ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
}
