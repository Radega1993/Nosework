/**
 * Geocodificación: Nominatim (OSM) + respaldo Photon (Komoot), uso razonable.
 * Nominatim: https://operations.osmfoundation.org/policies/nominatim/
 */

const NOMINATIM_SEARCH = "/search";
const PHOTON_API = process.env.PHOTON_API_URL || "https://photon.komoot.io/api";

function nominatimBaseUrl() {
  const raw = process.env.NOMINATIM_BASE_URL || "https://nominatim.openstreetmap.org";
  return String(raw).replace(/\/$/, "");
}

function trim(s) {
  return s == null ? "" : String(s).trim();
}

/** Quita tipo de vía muy repetido para mejores aciertos en ES (Calle/Carrer…). */
function stripRoadTypePrefix(addressLine) {
  if (!addressLine) return "";
  return trim(addressLine).replace(
    /^(calle|carrer|avenida|avinguda|avda\.?|av\.?|plaza|plaça|pza\.?|camino|camí|carretera|ctra\.?|paseo|passeig|pg\.?)\s+/i,
    ""
  );
}

function buildQueryLegacy(location) {
  const country =
    String(location.countryCode || "ES").toUpperCase() === "ES" ? "España" : trim(location.countryCode);
  const parts = [
    location.addressLine && trim(location.addressLine),
    location.postalCode && trim(location.postalCode),
    location.municipality && trim(location.municipality),
    location.province && trim(location.province),
    country,
  ].filter(Boolean);
  return parts.join(", ");
}

/** CP + municipio primero (mejor en Nominatim/Photon para España). */
function buildQueryPostalFirst(location) {
  const country =
    String(location.countryCode || "ES").toUpperCase() === "ES" ? "España" : trim(location.countryCode);
  const road = stripRoadTypePrefix(location.addressLine);
  const head = [trim(location.postalCode), trim(location.municipality), road].filter(Boolean).join(" ");
  if (!head) return "";
  return [head, trim(location.province), country].filter(Boolean).join(", ");
}

function normalizeText(s) {
  return trim(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function scorePhotonFeature(feature, location) {
  const p = feature.properties || {};
  let score = 0;
  const pcWant = normalizeText(location.postalCode).replace(/\s/g, "");
  const pcGot = normalizeText(p.postcode).replace(/\s/g, "");
  if (pcWant && pcGot && pcGot === pcWant) score += 50;
  else if (pcWant && pcGot && pcGot.slice(0, 2) === pcWant.slice(0, 2)) score += 8;

  const cityWant = normalizeText(location.municipality);
  const cityGot = normalizeText(p.city || p.town || p.village || p.locality || "");
  if (cityWant && cityGot) {
    if (cityGot === cityWant) score += 40;
    else if (cityGot.includes(cityWant) || cityWant.includes(cityGot)) score += 22;
  }

  if (String(p.countrycode || "").toLowerCase() === "es") score += 3;
  const typ = p.type;
  if (typ === "house") score += 10;
  if (typ === "street") score += 6;
  return score;
}

function pickBestPhotonFeature(features, location) {
  if (!Array.isArray(features) || features.length === 0) return null;
  let best = features[0];
  let bestScore = scorePhotonFeature(best, location);
  for (let i = 1; i < features.length; i++) {
    const sc = scorePhotonFeature(features[i], location);
    if (sc > bestScore) {
      best = features[i];
      bestScore = sc;
    }
  }
  return best;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function nominatimFetch(searchParams) {
  const contact =
    process.env.NOMINATIM_CONTACT_EMAIL ||
    process.env.CONTACT_EMAIL ||
    "noreply@nosework-trial.local";
  const url = new URL(NOMINATIM_SEARCH, nominatimBaseUrl());
  searchParams.forEach((v, k) => {
    if (v != null && String(v).trim() !== "") url.searchParams.set(k, v);
  });

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "Accept-Language": "es,en;q=0.8",
        "User-Agent": `NoseworkTrial-Website/1.0 (${contact})`,
      },
    });
    if (!res.ok) {
      return { type: "error", error: "El servicio de geolocalización no está disponible. Inténtalo más tarde." };
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return { type: "empty" };
    }
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return { type: "error", error: "Respuesta de geolocalización inválida." };
    }
    return { type: "ok", lat, lon };
  } catch (e) {
    if (e.name === "AbortError") {
      return { type: "error", error: "Tiempo de espera agotado al geolocalizar. Inténtalo de nuevo." };
    }
    console.error("nominatimFetch:", e);
    return { type: "error", error: "No se pudo geolocalizar la dirección." };
  } finally {
    clearTimeout(t);
  }
}

async function tryNominatimStructured(location) {
  const municipality = trim(location.municipality);
  if (!municipality) return null;

  const sp = new URLSearchParams();
  sp.set("format", "json");
  sp.set("limit", "1");
  sp.set("addressdetails", "0");
  const street = trim(location.addressLine);
  if (street) sp.set("street", street);
  sp.set("city", municipality);
  const pc = trim(location.postalCode);
  if (pc) sp.set("postalcode", pc);
  const prov = trim(location.province);
  if (prov) sp.set("state", prov);
  sp.set("countrycodes", "es");

  const r = await nominatimFetch(sp);
  if (r.type === "ok") return { lat: r.lat, lon: r.lon };
  return null;
}

async function tryNominatimQ(q) {
  if (!trim(q)) return null;
  const sp = new URLSearchParams();
  sp.set("format", "json");
  sp.set("limit", "1");
  sp.set("addressdetails", "0");
  sp.set("q", q);
  const r = await nominatimFetch(sp);
  if (r.type === "ok") return { lat: r.lat, lon: r.lon };
  return null;
}

async function tryPhoton(location) {
  const municipality = trim(location.municipality);
  if (!municipality) return null;

  const pc = trim(location.postalCode);
  const road = stripRoadTypePrefix(location.addressLine);
  const queries = [
    [pc, municipality, road].filter(Boolean).join(" "),
    [pc, municipality, trim(location.addressLine)].filter(Boolean).join(" "),
    [municipality, pc, road].filter(Boolean).join(" "),
  ].filter((q) => trim(q).length > 2);

  const seen = new Set();
  const uniqueQueries = queries.filter((q) => {
    const k = q.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  for (const q of uniqueQueries) {
    const url = new URL(`${PHOTON_API.replace(/\/$/, "")}/`);
    url.searchParams.set("q", q);
    url.searchParams.set("limit", "10");

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 12000);
    try {
      const res = await fetch(url.toString(), {
        signal: controller.signal,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) continue;
      const data = await res.json();
      const features = data.features || [];
      if (!features.length) continue;
      const best = pickBestPhotonFeature(features, location);
      const coords = best?.geometry?.coordinates;
      if (!Array.isArray(coords) || coords.length < 2) continue;
      const lon = Number(coords[0]);
      const lat = Number(coords[1]);
      if (Number.isFinite(lat) && Number.isFinite(lon)) return { lat, lon };
    } catch (e) {
      if (e.name !== "AbortError") console.error("tryPhoton:", e);
    } finally {
      clearTimeout(t);
    }
  }
  return null;
}

/**
 * @param {{ countryCode?: string, province: string, municipality: string, postalCode: string, addressLine?: string|null }} location
 * @returns {Promise<{ lat: number, lon: number }|{ error: string }>}
 */
export async function geocodeClubLocation(location) {
  const municipality = trim(location.municipality);
  if (!municipality) {
    return { error: "Falta municipio, provincia o código postal para geolocalizar" };
  }

  const loc = {
    countryCode: location.countryCode,
    province: trim(location.province),
    municipality,
    postalCode: trim(location.postalCode),
    addressLine: location.addressLine != null ? trim(location.addressLine) : "",
  };

  let coords = await tryNominatimStructured(loc);
  if (coords) return coords;

  const afterFirstNominatim = Date.now();

  coords = await tryPhoton(loc);
  if (coords) return coords;

  await sleep(Math.max(0, 1100 - (Date.now() - afterFirstNominatim)));
  coords = await tryNominatimQ(buildQueryPostalFirst(loc));
  if (coords) return coords;

  await sleep(1100);
  coords = await tryNominatimQ(buildQueryLegacy(loc));
  if (coords) return coords;

  return {
    error:
      "No se encontró la ubicación. Revisa la dirección, el código postal, el municipio y la provincia.",
  };
}
