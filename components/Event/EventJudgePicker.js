import { useCallback, useEffect, useState } from "react";

function EventOsmMapPreview({ lat, lon }) {
  if (lat == null || lon == null || !Number.isFinite(Number(lat)) || !Number.isFinite(Number(lon))) {
    return null;
  }
  const la = Number(lat);
  const lo = Number(lon);
  const dLon = 0.012;
  const dLat = 0.009;
  const bbox = `${lo - dLon},${la - dLat},${lo + dLon},${la + dLat}`;
  const embed = new URL("https://www.openstreetmap.org/export/embed.html");
  embed.searchParams.set("bbox", bbox);
  embed.searchParams.set("layer", "mapnik");
  embed.searchParams.set("marker", `${la},${lo}`);
  const src = embed.toString();
  return (
    <div className="rounded-xl border border-outline-variant overflow-hidden bg-surface-container-low">
      <p className="text-xs text-on-surface-variant px-3 py-2 border-b border-outline-variant">
        Vista aproximada (OpenStreetMap). La ubicación exacta depende de los datos introducidos.
      </p>
      <iframe
        title="Mapa de la prueba"
        src={src}
        className="w-full h-56 border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

function EventJudgePicker({ clubId, apiCall, judges, onJudgesChange }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clubId || q.trim().length < 2) {
      setResults([]);
      return;
    }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await apiCall(`/api/clubs/${clubId}/user-search?q=${encodeURIComponent(q.trim())}`);
        const data = await res.json().catch(() => ({}));
        if (res.ok) setResults(data.users || []);
        else setResults([]);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(t);
  }, [q, clubId, apiCall]);

  const addJudge = useCallback(
    (u) => {
      if (judges.some((j) => Number(j.id) === Number(u.id))) return;
      onJudgesChange([
        ...judges,
        { id: u.id, display_name: u.display_name, is_judge: Boolean(u.is_judge), public_id: u.public_id || null },
      ]);
    },
    [judges, onJudgesChange]
  );

  const removeJudge = useCallback(
    (id) => {
      onJudgesChange(judges.filter((j) => Number(j.id) !== Number(id)));
    },
    [judges, onJudgesChange]
  );

  return (
    <div className="rounded-xl border border-outline-variant p-4 space-y-3">
      <div>
        <p className="block text-sm font-bold text-on-surface mb-1">Jueces (usuarios de la plataforma)</p>
        <p className="text-xs text-on-surface-variant mb-2">
          Busca por nombre, email o ID público. Puedes asignar varios jueces.
        </p>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Escribe al menos 2 caracteres…"
          className="w-full rounded-lg border border-outline-variant bg-white px-3 py-2 text-sm"
          autoComplete="off"
        />
        {loading ? <p className="text-xs text-on-surface-variant mt-2">Buscando…</p> : null}
        {results.length > 0 ? (
          <ul className="mt-2 max-h-40 overflow-y-auto rounded-lg border border-outline-variant divide-y divide-outline-variant bg-white text-sm">
            {results.map((u) => (
              <li key={u.id} className="flex items-center justify-between gap-2 px-3 py-2">
                <div className="min-w-0">
                  <p className="font-medium text-on-surface truncate">{u.display_name}</p>
                  <p className="text-xs text-on-surface-variant">
                    {u.public_id ? `${u.public_id} · ` : ""}
                    {u.is_judge ? "Perfil juez" : "Usuario"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addJudge(u)}
                  disabled={judges.some((j) => Number(j.id) === Number(u.id))}
                  className="shrink-0 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-white disabled:opacity-40"
                >
                  Añadir
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <div>
        <p className="text-xs font-bold text-on-surface mb-2">Jueces asignados</p>
        {judges.length === 0 ? (
          <p className="text-sm text-on-surface-variant">Ninguno aún.</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {judges.map((j) => (
              <li
                key={j.id}
                className="inline-flex items-center gap-1 rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container"
              >
                <span>{j.display_name}</span>
                <button
                  type="button"
                  onClick={() => removeJudge(j.id)}
                  className="ml-1 rounded-full hover:bg-black/10 px-1"
                  aria-label={`Quitar ${j.display_name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export { EventOsmMapPreview, EventJudgePicker };
