export default function DashboardInvitationsTable({ invitations = [], onAction, loading, ownerMode = false }) {
  return (
    <section className="rounded-xl border border-outline-variant bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
        <h2 className="font-montserrat font-bold text-primary">Invitaciones</h2>
      </div>
      <ul className="divide-y divide-outline-variant">
        {invitations.map((item) => (
          <li key={item.id} className="px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <p className="font-semibold text-primary">
                {ownerMode ? item.display_name || item.email : item.club_name}
              </p>
              <p className="text-xs text-on-surface-variant">{item.message || "Sin mensaje"}</p>
            </div>
            {item.status === "pending" ? (
              <div className="flex gap-2">
                {ownerMode ? (
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => onAction(item.id, "cancel")}
                    className="px-3 py-1 rounded bg-red-700 text-white"
                  >
                    Cancelar
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => onAction(item.id, "accept")}
                      className="px-3 py-1 rounded bg-primary text-white"
                    >
                      Aceptar
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => onAction(item.id, "reject")}
                      className="px-3 py-1 rounded bg-red-700 text-white"
                    >
                      Rechazar
                    </button>
                  </>
                )}
              </div>
            ) : (
              <span className="text-xs uppercase text-on-surface-variant">{item.status}</span>
            )}
          </li>
        ))}
        {invitations.length === 0 ? <li className="px-4 py-8 text-center text-on-surface-variant">No hay invitaciones.</li> : null}
      </ul>
    </section>
  );
}
