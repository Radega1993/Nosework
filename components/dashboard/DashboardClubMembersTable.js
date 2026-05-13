export default function DashboardClubMembersTable({ members = [], onRemove, loading }) {
  return (
    <section className="rounded-xl border border-outline-variant bg-white overflow-hidden">
      <div className="px-4 py-3 border-b border-outline-variant bg-surface-container-low">
        <h2 className="font-montserrat font-bold text-primary">Miembros del club</h2>
      </div>
      <ul className="divide-y divide-outline-variant">
        {members.map((member) => (
          <li key={member.user_id} className="px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-primary">{member.display_name || member.email}</p>
              <p className="text-xs text-on-surface-variant">{member.email}</p>
            </div>
            <button
              type="button"
              disabled={loading}
              onClick={() => onRemove(member.user_id)}
              className="px-3 py-1 rounded bg-red-700 text-white"
            >
              Quitar
            </button>
          </li>
        ))}
        {members.length === 0 ? <li className="px-4 py-8 text-center text-on-surface-variant">No hay miembros activos.</li> : null}
      </ul>
    </section>
  );
}
