/**
 * Tabla de últimos cambios normativos o mensaje si no hay filas.
 */
export default function NormativasChangelogTable({ rows, emptyMessage }) {
  return (
    <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 md:p-8 rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <span className="material-symbols-outlined text-primary text-2xl" aria-hidden>
          history
        </span>
        <h3 className="font-montserrat text-lg md:text-xl font-semibold text-primary">Últimos cambios</h3>
      </div>
      {rows.length === 0 ? (
        <p className="text-on-surface-variant text-sm md:text-base leading-relaxed border border-dashed border-outline-variant rounded-lg p-6 bg-surface-container-low">
          {emptyMessage}
        </p>
      ) : (
        <div className="overflow-x-auto -mx-2">
          <table className="w-full text-left border-collapse min-w-[520px]">
            <thead>
              <tr className="bg-surface-container text-on-surface-variant text-xs font-bold uppercase tracking-wider">
                <th className="p-3 border-b border-outline-variant text-left">Fecha</th>
                <th className="p-3 border-b border-outline-variant text-left">Artículo</th>
                <th className="p-3 border-b border-outline-variant text-left">Resumen del cambio</th>
              </tr>
            </thead>
            <tbody className="text-sm md:text-base text-on-surface-variant">
              {rows.map((row, i) => (
                <tr
                  key={`${row.date}-${row.article}-${i}`}
                  className={`border-b border-outline-variant last:border-0 hover:bg-surface-container-low transition-colors ${
                    i % 2 === 1 ? "bg-surface-container-low/80" : ""
                  }`}
                >
                  <td className="p-3 font-bold text-on-surface whitespace-nowrap">{row.date}</td>
                  <td className="p-3 text-primary font-medium whitespace-nowrap">{row.article}</td>
                  <td className="p-3">{row.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
