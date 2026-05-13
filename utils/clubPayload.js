/**
 * Mapeo de cuerpo validado (Joi) a columnas de clubs + ubicación.
 */

const SHORT_MAX = 400;

function splitDescription(description) {
  const full = String(description || "").trim();
  const short = full.length <= SHORT_MAX ? full : full.slice(0, SHORT_MAX);
  return { shortDescription: short, longDescription: full };
}

export function mapValidatedToClubCore(v, slugNormalized) {
  const name = v.name.trim();
  const { shortDescription, longDescription } = splitDescription(v.description);
  return {
    slug: slugNormalized,
    name,
    displayName: name,
    legalName: null,
    shortDescription,
    longDescription,
    websiteUrl: v.websiteUrl ? String(v.websiteUrl).trim() : "",
    socialLinks: v.socialLinks || {},
    logoUrl: v.logoUrl ? String(v.logoUrl).trim() : "",
    coverImageUrl: v.coverImageUrl ? String(v.coverImageUrl).trim() : "",
    foundedYear:
      v.foundedYear === "" || v.foundedYear === null || typeof v.foundedYear === "undefined"
        ? null
        : Number(v.foundedYear),
    memberCountEstimate: null,
    visibility: v.visibility || "public",
    localeDefault: v.localeDefault || "es",
    publicEmail: v.publicEmail ? String(v.publicEmail).trim() : "",
    publicPhone: v.publicPhone ? String(v.publicPhone).trim() : "",
    whatsappUrl: v.whatsappUrl ? String(v.whatsappUrl).trim() : "",
    contactName: v.contactName ? String(v.contactName).trim() : "",
    contactHours: v.contactHours ? String(v.contactHours).trim() : "",
    affiliationStatus: v.affiliationStatus || "none",
    affiliationNumber: v.affiliationNumber ? String(v.affiliationNumber).trim() : "",
    insuranceCertificateUrl: v.insuranceCertificateUrl ? String(v.insuranceCertificateUrl).trim() : "",
    acceptsPublicListing: Boolean(v.acceptsPublicListing),
    dataProcessingConsentAt: v.dataProcessingConsentAt ? String(v.dataProcessingConsentAt).trim() : "",
  };
}

export function mapValidatedToLocation(v, coords) {
  const loc = v.location;
  return {
    countryCode: loc.countryCode || "ES",
    adminAreaLevel1: loc.adminAreaLevel1 ? String(loc.adminAreaLevel1).trim() : null,
    province: String(loc.province).trim(),
    municipality: String(loc.municipality).trim(),
    postalCode: String(loc.postalCode).trim(),
    addressLine: loc.addressLine ? String(loc.addressLine).trim() : null,
    latitude: coords != null && Number.isFinite(coords.lat) ? coords.lat : null,
    longitude: coords != null && Number.isFinite(coords.lon) ? coords.lon : null,
    trainingVenueNotes: loc.trainingVenueNotes ? String(loc.trainingVenueNotes).trim() : null,
  };
}
