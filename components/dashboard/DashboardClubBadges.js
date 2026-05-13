export default function DashboardClubBadges({ ownedClubs, memberClubs }) {
  if ((!ownedClubs || ownedClubs.length === 0) && (!memberClubs || memberClubs.length === 0)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {ownedClubs?.length > 0 ? (
        <div className="rounded-lg border border-secondary bg-secondary-container/30 px-4 py-2">
          <p className="text-[11px] font-bold uppercase tracking-wide text-on-secondary-container">Club que organizas</p>
          <p className="text-sm font-semibold text-primary">{ownedClubs.map((c) => c.name).join(", ")}</p>
        </div>
      ) : null}
      {memberClubs?.length > 0 ? (
        <div className="rounded-lg border border-outline-variant bg-white px-4 py-2">
          <p className="text-[11px] font-bold uppercase tracking-wide text-on-surface-variant">Miembro de</p>
          <p className="text-sm font-semibold text-primary">{memberClubs.map((c) => c.name).join(", ")}</p>
        </div>
      ) : null}
    </div>
  );
}
