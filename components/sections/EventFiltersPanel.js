import { useEffect, useMemo, useState } from "react";
import {
  monthInputValueFromFilters,
  CALENDARIO_FILTER_LABELS as L,
  CALENDARIO_SECTIONS,
} from "@/components/nosework/calendarioPruebasLabels";

const inputClass =
  "rounded-lg border border-outline-variant px-3 py-2 text-on-surface bg-white focus:ring-2 focus:ring-secondary focus:border-secondary outline-none w-full";

/**
 * Panel de filtros estilo FDDN. Al aplicar, llama onApply con el patch para useEventFilters.updateFilters.
 */
export default function EventFiltersPanel({
  dateFrom,
  dateTo,
  filters,
  locations = [],
  typeOptions = [],
  onApply,
  searchSlot,
}) {
  const [month, setMonth] = useState("");
  const [province, setProvince] = useState("");
  const [level, setLevel] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const derivedMonth = monthInputValueFromFilters(dateFrom, dateTo);

  const locOptions = useMemo(() => {
    const s = new Set(locations.filter(Boolean));
    if (filters?.location) s.add(filters.location);
    return [...s].sort();
  }, [locations, filters?.location]);

  useEffect(() => {
    setMonth(derivedMonth);
  }, [derivedMonth]);

  useEffect(() => {
    if (!filters) return;
    setProvince(filters.location || "");
    setLevel(filters.level?.[0] || "");
    setType(filters.type?.[0] || "");
    setStatus(filters.status?.[0] || "");
  }, [filters]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let nextFrom = "";
    let nextTo = "";
    if (month) {
      const [y, m] = month.split("-").map(Number);
      nextFrom = `${y}-${String(m).padStart(2, "0")}-01`;
      const last = new Date(y, m, 0);
      nextTo = `${y}-${String(m).padStart(2, "0")}-${String(last.getDate()).padStart(2, "0")}`;
    }

    onApply({
      dateFrom: nextFrom,
      dateTo: nextTo,
      location: province.trim(),
      level: level ? [level] : [],
      type: type ? [type] : [],
      status: status ? [status] : [],
    });
  };

  const mergedTypes = [...L.types];
  typeOptions.forEach((t) => {
    const v = String(t).toLowerCase().replace(/\s+/g, "-");
    if (!mergedTypes.some((x) => x.value === v)) {
      mergedTypes.push({ value: v, label: String(t) });
    }
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-surface-container p-4 md:p-6 mb-8">
      {searchSlot && <div className="mb-4">{searchSlot}</div>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">{L.month}</label>
          <input
            type="month"
            className={inputClass}
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            aria-label={L.month}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">{L.province}</label>
          <select
            className={inputClass}
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            aria-label={L.province}
          >
            <option value="">{L.all}</option>
            {locOptions.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">{L.level}</label>
          <select className={inputClass} value={level} onChange={(e) => setLevel(e.target.value)} aria-label={L.level}>
            {L.levels.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">{L.type}</label>
          <select className={inputClass} value={type} onChange={(e) => setType(e.target.value)} aria-label={L.type}>
            {mergedTypes.map((opt) => (
              <option key={opt.value || "all"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold uppercase tracking-wide text-on-surface-variant">{L.status}</label>
          <select
            className={inputClass}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label={L.status}
          >
            {L.statuses.map((opt) => (
              <option key={opt.value || "all-s"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="h-11 md:h-[42px] rounded-lg bg-secondary text-on-secondary font-bold hover:brightness-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          {CALENDARIO_SECTIONS.filterButton}
        </button>
      </form>
    </div>
  );
}
