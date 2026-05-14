/** Utilidades compartidas listado / filtros de eventos (campos extendidos + legacy). */

export function trimEventStr(s) {
  return s == null ? "" : String(s).trim();
}

export function formatEventLocationLine(event) {
  const venue = trimEventStr(event.venue_address);
  const mun = trimEventStr(event.municipality);
  const prov = trimEventStr(event.province);
  const pc = trimEventStr(event.postal_code);
  const locality = [pc, mun].filter(Boolean).join(" ");
  const tail = [locality, prov].filter(Boolean).join(", ");
  const parts = [venue, tail].filter(Boolean);
  if (parts.length) return parts.join(" · ");
  return trimEventStr(event.location) || trimEventStr(event.city) || trimEventStr(event.address) || "";
}

/** Códigos de nivel en minúsculas p. ej. basic, advanced (desde levels_json o legacy level). */
export function getEventLevelCodes(event) {
  const codes = [];
  if (event.level) {
    const l = trimEventStr(event.level).toLowerCase();
    if (l.includes("avan")) codes.push("advanced");
    else if (l.includes("base") || l.includes("bás")) codes.push("basic");
    else codes.push(l);
  }
  if (codes.length) return codes;
  try {
    const raw = event.levels_json;
    if (!raw) return ["basic", "advanced"];
    const j = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(j) || j.length === 0) return ["basic", "advanced"];
    return j.map((x) => String(x).toLowerCase().trim()).filter(Boolean);
  } catch {
    return ["basic", "advanced"];
  }
}

export function eventMatchesLevelFilter(event, filterLevels) {
  if (!filterLevels || filterLevels.length === 0) return true;
  const codes = getEventLevelCodes(event);
  return filterLevels.some((f) => {
    const fl = String(f).toLowerCase();
    if (!fl) return true;
    if (fl === "ort") {
      const s = `${event.level || ""} ${event.kind || ""}`.toLowerCase();
      return s.includes("ort");
    }
    if (fl === "base" || fl === "básico" || fl === "basic") {
      return codes.includes("basic");
    }
    if (fl === "avanzado" || fl === "advanced") {
      return codes.includes("advanced");
    }
    return codes.some((c) => c === fl || c.includes(fl));
  });
}
