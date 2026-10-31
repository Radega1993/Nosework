import dynamic from "next/dynamic";

const ClubsLeafletMap = dynamic(() => import("./ClubsLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[420px] items-center justify-center bg-mint text-sm text-on-surface-variant">
      Cargando mapa…
    </div>
  ),
});

/**
 * Panel filtros + mapa real (Leaflet/OSM) con todos los clubes ubicados.
 */
export default function ClubsFiltersMap({
  draftProvince,
  draftServices,
  onProvinceChange,
  onServiceToggle,
  onApply,
  provinceOptions = [],
  serviceFilters = [],
  mapClubs = [],
  onSelectClub,
}) {
  const pinCount = mapClubs.filter((c) => c.lat != null && c.lng != null).length;

  return (
    <section className="max-w-container-max mx-auto px-6 py-10 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container p-6 rounded-xl shadow-soft border border-outline-variant">
            <h3 className="font-montserrat text-lg font-semibold text-primary mb-4">Buscador de clubes</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1.5">
                  Provincia
                </label>
                <select
                  className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
                  value={draftProvince}
                  onChange={(e) => onProvinceChange(e.target.value)}
                >
                  <option value="Todas">Todas las provincias</option>
                  {provinceOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-2">
                  Servicios
                </label>
                <div className="space-y-2">
                  {serviceFilters.map((f) => (
                    <label key={f.id} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-outline-variant text-primary focus:ring-secondary"
                        checked={Boolean(draftServices[f.id])}
                        onChange={() => onServiceToggle(f.id)}
                      />
                      {f.label}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={onApply}
                className="w-full bg-secondary text-on-secondary font-bold py-2.5 rounded-lg hover:brightness-105 transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed px-1">
            {pinCount} clubes en el mapa. Los pines dorados son ubicaciones aproximadas (provincia o municipio sin
            dirección exacta) y se irán afinando.
          </p>
        </div>

        <div className="lg:col-span-8 h-[420px] lg:h-[520px] rounded-xl relative overflow-hidden shadow-soft border border-outline-variant bg-mint">
          <ClubsLeafletMap clubs={mapClubs} onSelectClub={onSelectClub} />
        </div>
      </div>
    </section>
  );
}
