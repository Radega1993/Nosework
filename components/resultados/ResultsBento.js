/**
 * Top binomios y top clubes (estilo mockup resultados_y_rankings_fddn).
 */
export default function ResultsBento({ binomios = [], clubs = [], emptyHint }) {
  const hasBinomios = binomios.length > 0;
  const hasClubs = clubs.length > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
      <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-soft border border-outline-variant flex flex-col">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl" aria-hidden>
              emoji_events
            </span>
            <h2 className="font-montserrat text-xl md:text-2xl font-semibold text-primary">Top 5 nacional</h2>
          </div>
          <span className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">Ranking acumulado</span>
        </div>
        {!hasBinomios ? (
          <p className="text-on-surface-variant text-sm py-6 text-center">{emptyHint}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 flex-grow">
            {binomios.map((b, i) => {
              const rank = i + 1;
              const initials = `${(b.dog_name || "?").slice(0, 1)}${(b.handler_name || "?").slice(0, 1)}`.toUpperCase();
              const big = rank === 1;
              return (
                <div
                  key={`${b.handler_name}-${b.dog_name}-${i}`}
                  className={`flex flex-col items-center text-center p-3 rounded-lg border transition-transform hover:-translate-y-0.5 ${
                    big
                      ? "bg-surface border-b-4 border-secondary shadow-md"
                      : "bg-surface-container border border-outline-variant"
                  }`}
                >
                  <div className={`relative ${big ? "w-20 h-20" : "w-16 h-16"} mb-2`}>
                    <div
                      className={`w-full h-full rounded-full flex items-center justify-center font-bold text-on-primary bg-primary border-2 ${
                        big ? "border-secondary text-lg" : "border-outline-variant text-sm"
                      }`}
                    >
                      {initials}
                    </div>
                    <div
                      className={`absolute -bottom-1 -right-1 rounded-full flex items-center justify-center font-bold text-xs ${
                        big ? "bg-secondary text-on-secondary w-7 h-7" : "bg-primary text-on-primary w-6 h-6"
                      }`}
                    >
                      {rank}
                    </div>
                  </div>
                  <p className={`font-bold text-primary truncate w-full ${big ? "" : "text-sm"}`}>{b.dog_name}</p>
                  <p className="text-xs text-on-surface-variant truncate w-full max-w-[10rem]">{b.handler_name}</p>
                  <p className={`mt-1 font-bold ${big ? "text-secondary" : "text-primary"}`}>
                    {Math.round(Number(b.total_points) || 0)} pts
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-primary text-on-primary p-6 rounded-xl shadow-soft flex flex-col justify-between border border-primary-container">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-secondary-container text-2xl" aria-hidden>
              groups
            </span>
            <h2 className="font-montserrat text-lg md:text-xl font-semibold">Top clubes</h2>
          </div>
          {!hasClubs ? (
            <p className="text-on-primary-container text-sm py-4">{emptyHint}</p>
          ) : (
            <ul className="space-y-2">
              {clubs.map((c, i) => (
                <li
                  key={c.club || i}
                  className="flex items-center justify-between p-3 bg-primary-container rounded-lg text-sm"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span className={`font-bold shrink-0 ${i === 0 ? "text-secondary" : "text-secondary-fixed-dim"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate">{c.club}</span>
                  </span>
                  <span className="font-bold shrink-0 ml-2">{Math.round(Number(c.total_points) || 0)} pts</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-on-primary-container text-xs mt-4 border-t border-on-primary-container/30 pt-3">
          Puntos sumados en todas las pruebas con resultados publicados.
        </p>
      </div>
    </div>
  );
}
