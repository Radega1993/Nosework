/**
 * Toggle Lista | Calendario (mockup FDDN).
 */
export default function ListCalendarViewToggle({ view, onViewChange, listLabel = "Lista", calendarLabel = "Calendario" }) {
  return (
    <div
      className="inline-flex p-1 bg-surface-container rounded-lg border border-outline-variant/60"
      role="tablist"
      aria-label="Vista de eventos"
    >
      <button
        type="button"
        role="tab"
        aria-selected={view === "list"}
        onClick={() => onViewChange("list")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
          view === "list" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-primary"
        }`}
      >
        <span className="material-symbols-outlined text-lg" aria-hidden>
          format_list_bulleted
        </span>
        {listLabel}
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={view === "calendar"}
        onClick={() => onViewChange("calendar")}
        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 ${
          view === "calendar" ? "bg-white text-primary shadow-sm" : "text-on-surface-variant hover:text-primary"
        }`}
      >
        <span className="material-symbols-outlined text-lg" aria-hidden>
          calendar_month
        </span>
        {calendarLabel}
      </button>
    </div>
  );
}
