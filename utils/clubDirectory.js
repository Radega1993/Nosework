/**
 * Lectura/escritura de ficha completa de club (ubicación + servicios).
 */

export function normalizeSlug(raw) {
  return String(raw || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getClubRow(db, clubId) {
  return db.prepare(`SELECT * FROM clubs WHERE id = ?`).get(clubId);
}

export function getClubPrimaryLocation(db, clubId) {
  return db
    .prepare(
      `SELECT * FROM club_locations
       WHERE club_id = ? AND is_primary = 1
       LIMIT 1`
    )
    .get(clubId);
}

export function getClubLocations(db, clubId) {
  return db.prepare(`SELECT * FROM club_locations WHERE club_id = ? ORDER BY is_primary DESC, id ASC`).all(clubId);
}

export function getClubServiceCodes(db, clubId) {
  return db
    .prepare(
      `SELECT t.code, t.label, t.category
       FROM club_service_tags cst
       JOIN service_taxonomy t ON t.id = cst.taxonomy_id
       WHERE cst.club_id = ?
       ORDER BY t.sort_order, t.label`
    )
    .all(clubId);
}

export function getClubDetailPayload(db, clubId) {
  const club = getClubRow(db, clubId);
  if (!club) return null;
  const displayName = club.display_name?.trim() || club.name;
  const description = (club.long_description || club.short_description || "").trim();
  const locations = getClubLocations(db, clubId);
  const services = getClubServiceCodes(db, clubId);
  let socialLinks = {};
  if (club.social_links) {
    try {
      socialLinks = JSON.parse(club.social_links);
    } catch (e) {
      socialLinks = {};
    }
  }
  return {
    ...club,
    display_name: displayName,
    description,
    social_links: socialLinks,
    locations,
    services,
    serviceCodes: services.map((s) => s.code),
  };
}

export function isSlugTaken(db, slug, excludeClubId) {
  const row = db.prepare(`SELECT id FROM clubs WHERE slug = ?`).get(slug);
  if (!row) return false;
  if (excludeClubId && Number(row.id) === Number(excludeClubId)) return false;
  return true;
}

const SLUG_MAX = 80;

/**
 * Genera un slug único a partir del nombre (normalizado + sufijo numérico si hace falta).
 * @param {import("better-sqlite3").Database} db
 * @param {string} name
 * @param {number|null} excludeClubId
 */
export function allocateUniqueSlug(db, name, excludeClubId) {
  let base = normalizeSlug(name);
  if (!base || base.length < 3) {
    base = `club-${Date.now().toString(36)}`;
  }
  base = base.slice(0, Math.min(72, SLUG_MAX - 6));
  let candidate = base;
  let n = 2;
  for (let i = 0; i < 50000; i += 1) {
    if (!isSlugTaken(db, candidate, excludeClubId)) return candidate;
    const suffix = `-${n}`;
    const maxBase = SLUG_MAX - suffix.length;
    candidate = base.slice(0, Math.max(1, maxBase)) + suffix;
    n += 1;
  }
  return `club-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`.slice(0, SLUG_MAX);
}

/**
 * Devuelve ids únicos en el orden de aparición de `codes`, o null si falta algún código.
 */
export function resolveTaxonomyIdsByCodes(db, codes) {
  if (!codes || !codes.length) return [];
  const unique = [...new Set(codes)];
  const placeholders = unique.map(() => "?").join(",");
  const rows = db
    .prepare(`SELECT id, code FROM service_taxonomy WHERE code IN (${placeholders})`)
    .all(...unique);
  if (rows.length !== unique.length) return null;
  const byCode = Object.fromEntries(rows.map((r) => [r.code, r.id]));
  for (const c of codes) {
    if (byCode[c] == null) return null;
  }
  const seen = new Set();
  const ordered = [];
  for (const c of codes) {
    const id = byCode[c];
    if (!seen.has(id)) {
      seen.add(id);
      ordered.push(id);
    }
  }
  return ordered;
}

export function upsertClubCore(db, payload, { ownerUserId, clubId, status }) {
  const {
    slug,
    legalName,
    displayName,
    shortDescription,
    longDescription,
    websiteUrl,
    socialLinks,
    logoUrl,
    coverImageUrl,
    foundedYear,
    memberCountEstimate,
    visibility,
    localeDefault,
    publicEmail,
    publicPhone,
    whatsappUrl,
    contactName,
    contactHours,
    affiliationStatus,
    affiliationNumber,
    insuranceCertificateUrl,
    acceptsPublicListing,
    dataProcessingConsentAt,
    internalNotes,
    name,
  } = payload;

  const socialJson =
    socialLinks && typeof socialLinks === "object" ? JSON.stringify(socialLinks) : socialLinks || null;

  if (clubId) {
    db.prepare(
      `UPDATE clubs SET
        slug = ?,
        name = ?,
        display_name = ?,
        legal_name = ?,
        short_description = ?,
        long_description = ?,
        website_url = ?,
        social_links = ?,
        logo_url = ?,
        cover_image_url = ?,
        founded_year = ?,
        member_count_estimate = ?,
        visibility = ?,
        locale_default = ?,
        public_email = ?,
        public_phone = ?,
        whatsapp_url = ?,
        contact_name = ?,
        contact_hours = ?,
        affiliation_status = ?,
        affiliation_number = ?,
        insurance_certificate_url = ?,
        accepts_public_listing = ?,
        data_processing_consent_at = ?,
        internal_notes = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).run(
      slug,
      name,
      displayName,
      legalName || null,
      shortDescription || null,
      longDescription || null,
      websiteUrl || null,
      socialJson,
      logoUrl || null,
      coverImageUrl || null,
      foundedYear ?? null,
      memberCountEstimate ?? null,
      visibility || "public",
      localeDefault || "es",
      publicEmail || null,
      publicPhone || null,
      whatsappUrl || null,
      contactName || null,
      contactHours || null,
      affiliationStatus || "none",
      affiliationNumber || null,
      insuranceCertificateUrl || null,
      acceptsPublicListing ? 1 : 0,
      dataProcessingConsentAt || null,
      internalNotes || null,
      clubId
    );
    return clubId;
  }

  const result = db
    .prepare(
      `INSERT INTO clubs (
        slug, name, display_name, legal_name, short_description, long_description,
        website_url, social_links, logo_url, cover_image_url,
        founded_year, member_count_estimate, visibility, source, locale_default,
        public_email, public_phone, whatsapp_url, contact_name, contact_hours,
        affiliation_status, affiliation_number, insurance_certificate_url,
        accepts_public_listing, data_processing_consent_at, submitted_at,
        owner_user_id, status, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'user_created', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
    )
    .run(
      slug,
      name,
      displayName,
      legalName || null,
      shortDescription || null,
      longDescription || null,
      websiteUrl || null,
      socialJson,
      logoUrl || null,
      coverImageUrl || null,
      foundedYear ?? null,
      memberCountEstimate ?? null,
      visibility || "public",
      localeDefault || "es",
      publicEmail || null,
      publicPhone || null,
      whatsappUrl || null,
      contactName || null,
      contactHours || null,
      affiliationStatus || "none",
      affiliationNumber || null,
      insuranceCertificateUrl || null,
      acceptsPublicListing ? 1 : 0,
      dataProcessingConsentAt || null,
      ownerUserId,
      status
    );
  return result.lastInsertRowid;
}

export function replacePrimaryLocation(db, clubId, loc) {
  db.prepare(`DELETE FROM club_locations WHERE club_id = ? AND is_primary = 1`).run(clubId);
  db.prepare(
    `INSERT INTO club_locations (
      club_id, country_code, admin_area_level_1, province, municipality, postal_code,
      address_line, latitude, longitude, is_primary, training_venue_notes, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`
  ).run(
    clubId,
    loc.countryCode || "ES",
    loc.adminAreaLevel1 || null,
    loc.province || null,
    loc.municipality || null,
    loc.postalCode || null,
    loc.addressLine || null,
    loc.latitude ?? null,
    loc.longitude ?? null,
    loc.trainingVenueNotes || null
  );
}

export function replaceClubServiceTags(db, clubId, taxonomyIds) {
  db.prepare(`DELETE FROM club_service_tags WHERE club_id = ?`).run(clubId);
  const ins = db.prepare(`INSERT INTO club_service_tags (club_id, taxonomy_id) VALUES (?, ?)`);
  for (const tid of taxonomyIds) {
    ins.run(clubId, tid);
  }
}
