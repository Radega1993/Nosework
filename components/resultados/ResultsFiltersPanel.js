/**
 * Filtros alineados al mockup (año, nivel, provincia, club, perro, guía).
 */
export default function ResultsFiltersPanel({
  year,
  level,
  province,
  club,
  dog,
  handler,
  yearOptions = [],
  levelOptions = [],
  provinceOptions = [],
  onChange,
  onApply,
}) {
  return (
    <div className="bg-surface-container-low rounded-xl p-6 mb-6 border border-outline-variant">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary" aria-hidden>
          filter_list
        </span>
        <span className="font-bold text-primary">Filtrar resultados</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">Año</label>
          <select
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
            value={year}
            onChange={(e) => onChange("year", e.target.value)}
          >
            <option value="">Todos</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">Nivel</label>
          <select
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
            value={level}
            onChange={(e) => onChange("level", e.target.value)}
          >
            <option value="Todos">Todos</option>
            {levelOptions.map((lv) => (
              <option key={lv} value={lv}>
                {lv}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">Provincia</label>
          <select
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
            value={province}
            onChange={(e) => onChange("province", e.target.value)}
          >
            <option value="Todas">Todas</option>
            {provinceOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">Club</label>
          <input
            type="text"
            placeholder="Buscar club…"
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
            value={club}
            onChange={(e) => onChange("club", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">Perro</label>
          <input
            type="text"
            placeholder="Nombre perro…"
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
            value={dog}
            onChange={(e) => onChange("dog", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">Guía</label>
          <input
            type="text"
            placeholder="Nombre guía…"
            className="bg-white border border-outline-variant rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary focus:border-secondary"
            value={handler}
            onChange={(e) => onChange("handler", e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={onApply}
          className="px-5 py-2.5 bg-primary text-on-primary font-bold rounded-lg text-sm hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
}
