import Link from "next/link";
import { formatResultDateDisplay, positionLabel } from "@/utils/resultsFormat";

const COLS =
  "FECHA,PRUEBA,NIVEL,PERRO,GUÍA,CLUB,TIEMPO,PENAL.,POS.,TÍTULO".split(",");

function visiblePageIndices(page, totalPages, max = 5) {
  if (totalPages <= max) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }
  let start = Math.max(0, page - Math.floor(max / 2));
  let end = Math.min(totalPages, start + max);
  start = Math.max(0, end - max);
  return Array.from({ length: end - start }, (_, i) => start + i);
}

export default function ResultsDetailTable({
  rows = [],
  total = 0,
  limit = 15,
  offset = 0,
  loading,
  emptyHint,
  localizedHref,
  showEventLink = true,
  onOffsetChange,
}) {
  const start = total === 0 ? 0 : offset + 1;
  const end = Math.min(offset + rows.length, total);
  const page = Math.floor(offset / limit);
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const pageIndices = visiblePageIndices(page, totalPages, 5);

  return (
    <div className="bg-white rounded-xl shadow-soft border border-outline-variant overflow-hidden">
      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:bg-primary [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-primary-container text-on-primary-container border-b border-outline-variant">
              {COLS.map((c) => (
                <th key={c} className="p-4 text-xs font-bold uppercase tracking-wide whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {loading ? (
              <tr>
                <td colSpan={10} className="p-10 text-center text-on-surface-variant">
                  Cargando resultados…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-10 text-center text-on-surface-variant">
                  {emptyHint}
                </td>
              </tr>
            ) : (
              rows.map((r, idx) => (
                <tr
                  key={r.id}
                  className={`hover:bg-surface-container transition-colors ${idx % 2 === 1 ? "bg-surface/80" : ""}`}
                >
                  <td className="p-4 text-sm text-on-surface whitespace-nowrap">
                    {formatResultDateDisplay(r.trial_date, r.event_date)}
                  </td>
                  <td className="p-4 text-sm font-bold text-primary max-w-[200px]">
                    {showEventLink && localizedHref ? (
                      <Link
                        href={localizedHref(`/eventos/${r.event_id}/resultados`)}
                        className="hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded"
                      >
                        {r.trial_title}
                      </Link>
                    ) : (
                      r.trial_title
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center justify-center bg-primary text-on-primary rounded-full w-9 h-9 text-xs font-bold">
                      {r.level}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-semibold">{r.dog_name}</td>
                  <td className="p-4 text-sm">{r.handler_name}</td>
                  <td className="p-4 text-sm max-w-[140px] truncate" title={r.club || ""}>
                    {r.club || "—"}
                  </td>
                  <td className="p-4 text-sm font-mono whitespace-nowrap">{r.time_text || "—"}</td>
                  <td className="p-4 text-center text-sm font-bold">{r.penalties ?? 0}</td>
                  <td className="p-4 text-center">
                    {Number(r.position) === 1 ? (
                      <span className="bg-secondary text-on-secondary px-2 py-1 rounded text-xs font-bold">
                        {positionLabel(r.position)}
                      </span>
                    ) : (
                      <span className="text-sm font-bold">{positionLabel(r.position)}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {r.title ? (
                      <span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full text-[11px] font-bold">
                        {r.title}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {!loading && total > 0 && (
        <div className="p-4 border-t border-outline-variant bg-surface flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-sm text-on-surface-variant">
            Mostrando {start}-{end} de {total} resultados
          </span>
          <div className="flex gap-2 items-center flex-wrap justify-center">
            <button
              type="button"
              disabled={offset <= 0}
              onClick={() => onOffsetChange?.(Math.max(0, offset - limit))}
              className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Página anterior"
            >
              <span className="material-symbols-outlined text-base" aria-hidden>
                chevron_left
              </span>
            </button>
            {pageIndices.map((pi) => (
              <button
                key={pi}
                type="button"
                className={`px-3 py-2 rounded-lg text-sm font-bold min-w-[2.5rem] ${
                  pi === page ? "bg-primary text-on-primary" : "hover:bg-surface-container"
                }`}
                onClick={() => onOffsetChange?.(pi * limit)}
              >
                {pi + 1}
              </button>
            ))}
            <button
              type="button"
              disabled={offset + limit >= total}
              onClick={() => onOffsetChange?.(offset + limit)}
              className="p-2 rounded-lg border border-outline-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Página siguiente"
            >
              <span className="material-symbols-outlined text-base" aria-hidden>
                chevron_right
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
