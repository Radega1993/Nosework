export default function DashboardClubApprovalsTable({ clubs = [], onReview, loading }) {
  return (
    <section className="rounded-xl border border-outline-variant bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
        <h2 className="font-montserrat font-bold text-primary">Aprobaciones de clubs</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-primary text-white">
            <tr>
              <th className="text-left px-4 py-3">Club</th>
              <th className="text-left px-4 py-3">Provincia</th>
              <th className="text-left px-4 py-3">Resumen</th>
              <th className="text-left px-4 py-3">Owner</th>
              <th className="text-left px-4 py-3">Estado</th>
              <th className="text-right px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clubs.map((club) => {
              const title = club.display_name || club.name;
              const summary = (club.short_description || "").trim();
              const preview = summary.length > 100 ? `${summary.slice(0, 100)}…` : summary;
              return (
                <tr key={club.id} className="border-t border-outline-variant align-top">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-primary">{title}</p>
                    <p className="text-xs text-on-surface-variant font-mono mt-0.5">{club.slug || "—"}</p>
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">{club.primary_province || "—"}</td>
                  <td className="px-4 py-3 text-on-surface-variant max-w-xs">{preview || "—"}</td>
                  <td className="px-4 py-3">{club.owner_name}</td>
                  <td className="px-4 py-3 capitalize">{club.status}</td>
                  <td className="px-4 py-3">
                    {club.status === "pending" ? (
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => onReview(club.id, "approve")}
                          disabled={loading}
                          className="px-3 py-1 rounded bg-primary text-white"
                        >
                          Aprobar
                        </button>
                        <button
                          type="button"
                          onClick={() => onReview(club.id, "reject")}
                          disabled={loading}
                          className="px-3 py-1 rounded bg-red-700 text-white"
                        >
                          Rechazar
                        </button>
                      </div>
                    ) : null}
                  </td>
                </tr>
              );
            })}
            {clubs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-on-surface-variant">
                  No hay clubs para mostrar.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}
