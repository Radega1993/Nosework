export default function DashboardAdminKpis({ metrics = {} }) {
  const cards = [
    { label: "Clubs pendientes", value: metrics.pending || 0 },
    { label: "Clubs aprobados", value: metrics.approved || 0 },
    { label: "Clubs rechazados", value: metrics.rejected || 0 },
    { label: "Clubs archivados", value: metrics.archived || 0 },
  ];

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
      {cards.map((card) => (
        <article key={card.label} className="rounded-xl border border-outline-variant bg-surface-container-low p-4">
          <p className="text-xs uppercase tracking-wide text-on-surface-variant">{card.label}</p>
          <p className="text-2xl font-bold text-primary mt-1">{card.value}</p>
        </article>
      ))}
    </section>
  );
}
