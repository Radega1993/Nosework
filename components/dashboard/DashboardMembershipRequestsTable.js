export default function DashboardMembershipRequestsTable({ requests = [], onDecision, loading }) {
  return (
    <section className="rounded-xl border border-outline-variant bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
        <h2 className="font-montserrat font-bold text-primary">Solicitudes de membresía</h2>
      </div>
      <ul className="divide-y divide-outline-variant">
        {requests.map((item) => (
          <li key={item.id} className="px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <p className="font-semibold text-primary">{item.display_name || item.user_name || item.email}</p>
              <p className="text-xs text-on-surface-variant">{item.message || "Sin mensaje"}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => onDecision(item.id, "approve")}
                className="px-3 py-1 rounded bg-primary text-white"
              >
                Aprobar
              </button>
              <button
                type="button"
                disabled={loading}
                onClick={() => onDecision(item.id, "reject")}
                className="px-3 py-1 rounded bg-red-700 text-white"
              >
                Rechazar
              </button>
            </div>
          </li>
        ))}
        {requests.length === 0 ? <li className="px-4 py-8 text-center text-on-surface-variant">No hay solicitudes pendientes.</li> : null}
      </ul>
    </section>
  );
}
