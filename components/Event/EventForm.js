import { EVENT_AUDIENCE } from "@/utils/eventClubMigrations";
import { EventJudgePicker, EventOsmMapPreview } from "@/components/Event/EventJudgePicker";

const inputClass =
  "w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm text-on-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary";
const labelClass = "block text-sm font-bold text-on-surface mb-1";

export default function EventForm({
  eventData,
  onChange,
  onSubmit,
  onCancel,
  isEditMode,
  clubSelectOptions = [],
  allowEventWithoutClub = false,
  clubLocked = false,
  apiCall = null,
  clubIdForJudgeSearch = null,
  judgeUsers = [],
  onJudgeUsersChange,
  mapPreview = null,
  mapError = "",
  mapLoading = false,
  onPreviewMap,
}) {
  const audience = eventData.audience || EVENT_AUDIENCE.OPEN;
  const showClubSelect = !clubLocked && (allowEventWithoutClub || clubSelectOptions.length > 0);
  const showNoClubWarning = !allowEventWithoutClub && !clubLocked && clubSelectOptions.length === 0;
  const judgeClubId =
    clubIdForJudgeSearch ??
    (eventData.clubId !== "" && eventData.clubId != null ? Number(eventData.clubId) : null);

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {clubLocked && clubSelectOptions[0] ? (
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <p className={labelClass}>Club</p>
          <p className="font-montserrat font-bold text-primary">{clubSelectOptions[0].display_name || clubSelectOptions[0].name}</p>
          <p className="text-xs text-on-surface-variant mt-1">La prueba quedará publicada a nombre de este club.</p>
        </div>
      ) : null}

      {showClubSelect ? (
        <div>
          <label htmlFor="clubId" className={labelClass}>
            Club
          </label>
          <select
            id="clubId"
            name="clubId"
            value={eventData.clubId === null || eventData.clubId === undefined ? "" : String(eventData.clubId)}
            onChange={onChange}
            className={inputClass}
          >
            {allowEventWithoutClub && <option value="">Sin club (evento general)</option>}
            {clubSelectOptions.map((c) => (
              <option key={c.id} value={String(c.id)}>
                {c.display_name || c.name}
                {c.status && c.status !== "approved" ? ` (${c.status})` : ""}
              </option>
            ))}
          </select>
          {!allowEventWithoutClub ? (
            <p className="text-xs text-on-surface-variant mt-1">El evento quedará asociado al club que elijas.</p>
          ) : null}
        </div>
      ) : null}

      {showNoClubWarning ? (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-3">
          No tienes clubs registrados como responsable. Crea un club en «Mi club» para publicar pruebas ligadas a él.
        </p>
      ) : null}

      <fieldset className="space-y-2 rounded-xl border border-outline-variant p-4">
        <legend className={`${labelClass} px-1`}>Audiencia</legend>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="radio"
            name="audience"
            value={EVENT_AUDIENCE.OPEN}
            checked={audience === EVENT_AUDIENCE.OPEN}
            onChange={onChange}
          />
          <span>Abierto (cualquier usuario registrado puede inscribirse)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="radio"
            name="audience"
            value={EVENT_AUDIENCE.MEMBERS_ONLY}
            checked={audience === EVENT_AUDIENCE.MEMBERS_ONLY}
            onChange={onChange}
          />
          <span>Solo miembros del club (membresía activa)</span>
        </label>
      </fieldset>

      {apiCall && onJudgeUsersChange && judgeClubId && !Number.isNaN(judgeClubId) ? (
        <EventJudgePicker clubId={judgeClubId} apiCall={apiCall} judges={judgeUsers} onJudgesChange={onJudgeUsersChange} />
      ) : null}

      <div>
        <label htmlFor="kind" className={labelClass}>
          Tipo de prueba (opcional)
        </label>
        <input
          type="text"
          id="kind"
          name="kind"
          value={eventData.kind || ""}
          onChange={onChange}
          placeholder="Ej. Abierto a todo el mundo, prueba oficial, entreno…"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="date" className={labelClass}>
          Fecha de la prueba
        </label>
        <input type="date" id="date" name="date" value={eventData.date || ""} onChange={onChange} className={inputClass} required />
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="municipality" className={labelClass}>
            Localidad
          </label>
          <input
            type="text"
            id="municipality"
            name="municipality"
            value={eventData.municipality || ""}
            onChange={onChange}
            placeholder="Ej. Viñayo"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label htmlFor="province" className={labelClass}>
            Provincia
          </label>
          <input
            type="text"
            id="province"
            name="province"
            value={eventData.province || ""}
            onChange={onChange}
            placeholder="Ej. León"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="postalCode" className={labelClass}>
            Código postal
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={eventData.postalCode || ""}
            onChange={onChange}
            placeholder="24123"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="venueAddress" className={labelClass}>
            Lugar / dirección (ayuntamiento, polideportivo…)
          </label>
          <input
            type="text"
            id="venueAddress"
            name="venueAddress"
            value={eventData.venueAddress || ""}
            onChange={onChange}
            placeholder="Ej. Ayuntamiento de Carrocera, campo de fútbol…"
            className={inputClass}
          />
        </div>
      </div>

      {typeof onPreviewMap === "function" ? (
        <div className="rounded-xl border border-outline-variant p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className={labelClass}>Mapa</p>
              <p className="text-xs text-on-surface-variant max-w-md">
                Geolocalizamos la dirección para mostrar la prueba en el mapa. Al guardar se vuelve a calcular en el
                servidor.
              </p>
            </div>
            <button
              type="button"
              onClick={onPreviewMap}
              disabled={mapLoading}
              className="shrink-0 rounded-lg bg-secondary px-4 py-2 text-sm font-bold text-on-secondary hover:brightness-105 disabled:opacity-50"
            >
              {mapLoading ? "Geolocalizando…" : "Geolocalizar y ver mapa"}
            </button>
          </div>
          {mapError ? <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-2">{mapError}</p> : null}
          {mapPreview ? <EventOsmMapPreview lat={mapPreview.lat} lon={mapPreview.lon} /> : null}
        </div>
      ) : null}

      <fieldset className="rounded-xl border border-outline-variant p-4 space-y-2">
        <legend className={`${labelClass} px-1`}>Niveles ofrecidos</legend>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            name="levelBasic"
            checked={Boolean(eventData.levelBasic)}
            onChange={onChange}
          />
          <span>Nivel básico</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            name="levelAdvanced"
            checked={Boolean(eventData.levelAdvanced)}
            onChange={onChange}
          />
          <span>Nivel avanzado</span>
        </label>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label htmlFor="priceEuros" className={labelClass}>
            Precio de la prueba (€)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            id="priceEuros"
            name="priceEuros"
            value={eventData.priceEuros ?? ""}
            onChange={onChange}
            placeholder="Ej. 20"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="mealPriceEuros" className={labelClass}>
            Precio comida (€, opcional)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            id="mealPriceEuros"
            name="mealPriceEuros"
            value={eventData.mealPriceEuros ?? ""}
            onChange={onChange}
            placeholder="Ej. 10"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="registrationPhone" className={labelClass}>
          Teléfono / contacto inscripciones
        </label>
        <input
          type="text"
          id="registrationPhone"
          name="registrationPhone"
          value={eventData.registrationPhone || ""}
          onChange={onChange}
          placeholder="Ej. 616 266 444"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="scheduleDetails" className={labelClass}>
          Cronograma y detalles (horarios, comida, charlas…)
        </label>
        <textarea
          id="scheduleDetails"
          name="scheduleDetails"
          value={eventData.scheduleDetails || ""}
          onChange={onChange}
          rows={6}
          placeholder={`Ej.:
Recepción: 8:30 h
Sorteo: 9:00 h
Inicio nivel básico: 9:30 h
Inicio nivel avanzado: 11:30 h
Evaluación y premios: 14:00 h
Comida: 14:30 h (confirmar con 7 días de antelación)`}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="title" className={labelClass}>
          Título de la convocatoria
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={eventData.title || ""}
          onChange={onChange}
          className={inputClass}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Descripción (normas, filosofía, avisos a participantes…)
        </label>
        <textarea
          id="description"
          name="description"
          value={eventData.description || ""}
          onChange={onChange}
          rows={6}
          className={inputClass}
          required
        />
      </div>

      <div className="flex flex-wrap justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-outline-variant bg-surface-container-highest px-5 py-2.5 text-sm font-bold text-on-surface hover:bg-surface-container-high"
        >
          Cancelar
        </button>
        <button type="submit" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary">
          {isEditMode ? "Guardar cambios" : "Publicar prueba"}
        </button>
      </div>
    </form>
  );
}
