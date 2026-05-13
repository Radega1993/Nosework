/**
 * Geocodificación vía Nominatim (OpenStreetMap), uso gratuito con política de uso razonable.
 * https://operations.osmfoundation.org/policies/nominatim/
 */

const NOMINATIM_SEARCH = "https://nominatim.openstreetmap.org/search";

function buildQuery(location) {
  const country =
    String(location.countryCode || "ES").toUpperCase() === "ES" ? "España" : String(location.countryCode || "").trim();
  const parts = [
    location.addressLine && String(location.addressLine).trim(),
    location.postalCode && String(location.postalCode).trim(),
    location.municipality && String(location.municipality).trim(),
    location.province && String(location.province).trim(),
    country,
  ].filter(Boolean);
  return parts.join(", ");
}

/**
 * @param {{ countryCode?: string, province: string, municipality: string, postalCode: string, addressLine?: string|null }} location
 * @returns {Promise<{ lat: number, lon: number }|{ error: string }>}
 */
export async function geocodeClubLocation(location) {
  const q = buildQuery(location);
  if (!q) {
    return { error: "Falta municipio, provincia o código postal para geolocalizar" };
  }

  const contact =
    process.env.NOMINATIM_CONTACT_EMAIL ||
    process.env.CONTACT_EMAIL ||
    "noreply@nosework-trial.local";
  const url = new URL(NOMINATIM_SEARCH);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");
  url.searchParams.set("q", q);

  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url.toString(), {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": `NoseworkTrial-Website/1.0 (${contact})`,
      },
    });
    if (!res.ok) {
      return { error: "El servicio de geolocalización no está disponible. Inténtalo más tarde." };
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return {
        error:
          "No se encontró la ubicación. Revisa la dirección, el código postal, el municipio y la provincia.",
      };
    }
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return { error: "Respuesta de geolocalización inválida." };
    }
    return { lat, lon };
  } catch (e) {
    if (e.name === "AbortError") {
      return { error: "Tiempo de espera agotado al geolocalizar. Inténtalo de nuevo." };
    }
    console.error("geocodeClubLocation:", e);
    return { error: "No se pudo geolocalizar la dirección." };
  } finally {
    clearTimeout(t);
  }
}
