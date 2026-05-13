export default function DashboardTitlesTable({ titles }) {
  return (
    <section className="bg-white rounded-xl shadow-soft border border-surface-container-highest overflow-hidden">
      <div className="p-4 border-b border-surface-variant flex justify-between items-center">
        <h3 className="font-montserrat text-lg font-semibold text-primary flex items-center gap-2">
          <span className="material-symbols-outlined" aria-hidden>
            article
          </span>
          Historial de títulos y certificados
        </h3>
      </div>
      {titles?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low">
              <tr>
                <th className="px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Certificado / título</th>
                <th className="px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Perro</th>
                <th className="px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Fecha</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-variant">
              {titles.map((t, i) => (
                <tr key={`${t.name}-${t.date}-${i}`} className="hover:bg-surface-container-low/80">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden>
                        verified
                      </span>
                      <span className="font-semibold text-primary">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{t.dogName}</td>
                  <td className="px-4 py-3 text-on-surface-variant">{t.date || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="p-6 text-sm text-on-surface-variant text-center">
          Sin títulos indexados aún. Cuando los resultados tengan `handler_user_id` y campo `title`, aparecerán aquí.
        </p>
      )}
    </section>
  );
}
