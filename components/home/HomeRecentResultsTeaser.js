import Link from "next/link";
import { DEFAULT_RESULTS_TEASER_ROWS } from "./homeDefaults";

/**
 * Tabla teaser de resultados con filas configurables.
 * @param {(path: string) => string} localizedHref
 */
export default function HomeRecentResultsTeaser({
  localizedHref,
  rows = DEFAULT_RESULTS_TEASER_ROWS,
  title = "Resultados recientes",
  footnote = "Los resultados completos se publicarán en la sección de rankings cuando estén disponibles.",
}) {
  return (
    <section className="py-16 md:py-20" aria-labelledby="results-heading">
      <div className="container-redesign">
        <h2
          id="results-heading"
          className="font-montserrat text-2xl md:text-3xl font-bold text-primary mb-8 border-l-8 border-secondary pl-4"
        >
          {title}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-outline-variant bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-outline-variant bg-surface-container-low">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-on-surface-variant">
                  Prueba / Evento
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-on-surface-variant">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-on-surface-variant">Binomio</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-on-surface-variant">Categoría</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-on-surface-variant">Más</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {rows.map((row, i) => (
                <tr
                  key={`${row.event}-${i}`}
                  className={
                    i % 2 === 1
                      ? "bg-surface-container-lowest/50 hover:bg-surface-container-lowest"
                      : "hover:bg-surface-container-lowest/80"
                  }
                >
                  <td className="px-6 py-4 font-bold text-primary">{row.event}</td>
                  <td className="px-6 py-4 text-on-surface-variant">{row.date}</td>
                  <td className="px-6 py-4">{row.team}</td>
                  <td className="px-6 py-4">
                    <span className={row.categoryClass}>{row.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={localizedHref(row.linkHref)}
                      className="font-bold text-secondary hover:underline"
                    >
                      {row.linkLabel}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-center text-sm text-on-surface-variant">{footnote}</p>
      </div>
    </section>
  );
}
