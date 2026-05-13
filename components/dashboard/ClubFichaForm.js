import { useContext, useEffect, useMemo, useState } from "react";
import AuthContext from "@/contexts/AuthContext";

function emptyForm() {
  return {
    name: "",
    slug: "",
    description: "",
    websiteUrl: "",
    socialInstagram: "",
    socialFacebook: "",
    logoUrl: "",
    coverImageUrl: "",
    foundedYear: "",
    visibility: "public",
    localeDefault: "es",
    publicEmail: "",
    publicPhone: "",
    whatsappUrl: "",
    contactName: "",
    contactHours: "",
    affiliationStatus: "none",
    affiliationNumber: "",
    insuranceCertificateUrl: "",
    acceptsPublicListing: false,
    dataProcessingConsentAt: new Date().toISOString(),
    location: {
      countryCode: "ES",
      adminAreaLevel1: "",
      province: "",
      municipality: "",
      postalCode: "",
      addressLine: "",
      trainingVenueNotes: "",
    },
    serviceCodes: [],
    internalNotes: "",
  };
}

function detailToForm(detail) {
  const primary = detail.locations?.find((l) => l.is_primary) || detail.locations?.[0] || {};
  const sl = detail.social_links || {};
  const description =
    (detail.description && String(detail.description)) ||
    detail.long_description ||
    detail.short_description ||
    "";
  return {
    name: detail.name || "",
    slug: detail.slug || "",
    description,
    websiteUrl: detail.website_url || "",
    socialInstagram: sl.instagram || "",
    socialFacebook: sl.facebook || "",
    logoUrl: detail.logo_url || "",
    coverImageUrl: detail.cover_image_url || "",
    foundedYear: detail.founded_year ?? "",
    visibility: detail.visibility || "public",
    localeDefault: detail.locale_default || "es",
    publicEmail: detail.public_email || "",
    publicPhone: detail.public_phone || "",
    whatsappUrl: detail.whatsapp_url || "",
    contactName: detail.contact_name || "",
    contactHours: detail.contact_hours || "",
    affiliationStatus: detail.affiliation_status || "none",
    affiliationNumber: detail.affiliation_number || "",
    insuranceCertificateUrl: detail.insurance_certificate_url || "",
    acceptsPublicListing: Boolean(detail.accepts_public_listing),
    dataProcessingConsentAt: detail.data_processing_consent_at || new Date().toISOString(),
    location: {
      countryCode: primary.country_code || "ES",
      adminAreaLevel1: primary.admin_area_level_1 || "",
      province: primary.province || "",
      municipality: primary.municipality || "",
      postalCode: primary.postal_code || "",
      addressLine: primary.address_line || "",
      trainingVenueNotes: primary.training_venue_notes || "",
    },
    serviceCodes: Array.isArray(detail.serviceCodes) ? [...detail.serviceCodes] : [],
    internalNotes: detail.internal_notes || "",
  };
}

function buildApiBody(form, { isAdmin }) {
  const socialLinks = {};
  if (form.socialInstagram?.trim()) socialLinks.instagram = form.socialInstagram.trim();
  if (form.socialFacebook?.trim()) socialLinks.facebook = form.socialFacebook.trim();

  const numOrNull = (v) => {
    if (v === "" || v === null || typeof v === "undefined") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  const body = {
    name: form.name.trim(),
    description: form.description.trim(),
    websiteUrl: form.websiteUrl.trim() || null,
    socialLinks,
    logoUrl: form.logoUrl.trim() || null,
    coverImageUrl: form.coverImageUrl.trim() || null,
    foundedYear: numOrNull(form.foundedYear),
    visibility: form.visibility,
    localeDefault: form.localeDefault,
    publicEmail: form.publicEmail.trim(),
    publicPhone: form.publicPhone.trim(),
    whatsappUrl: form.whatsappUrl.trim() || null,
    contactName: form.contactName.trim() || null,
    contactHours: form.contactHours.trim() || null,
    affiliationStatus: form.affiliationStatus,
    affiliationNumber: form.affiliationNumber.trim() || null,
    insuranceCertificateUrl: form.insuranceCertificateUrl.trim() || null,
    acceptsPublicListing: Boolean(form.acceptsPublicListing),
    dataProcessingConsentAt: form.dataProcessingConsentAt,
    location: {
      countryCode: (form.location.countryCode || "ES").toUpperCase().slice(0, 2),
      adminAreaLevel1: form.location.adminAreaLevel1?.trim() || null,
      province: form.location.province.trim(),
      municipality: form.location.municipality.trim(),
      postalCode: form.location.postalCode.trim(),
      addressLine: form.location.addressLine?.trim() || null,
      trainingVenueNotes: form.location.trainingVenueNotes?.trim() || null,
    },
    serviceCodes: form.serviceCodes,
  };

  if (isAdmin) {
    body.internalNotes = form.internalNotes.trim() || null;
  }

  return body;
}

const inputClass = "w-full rounded border border-outline-variant px-3 py-2 text-sm";
const labelClass = "block text-xs font-bold uppercase tracking-wide text-on-surface-variant mb-1";

/**
 * Formulario alta/edición de ficha de club (geocodificación en API).
 * @param {{ editingId: number | null, onDone?: () => void, showDelete?: boolean }} props
 */
export default function ClubFichaForm({ editingId, onDone, showDelete = false }) {
  const { user, apiCall } = useContext(AuthContext);
  const [taxonomy, setTaxonomy] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "administrador";

  const taxonomyByCategory = useMemo(() => {
    const m = { discipline: [], program: [], facility: [] };
    for (const row of taxonomy) {
      const cat = row.category || "program";
      if (!m[cat]) m[cat] = [];
      m[cat].push(row);
    }
    return m;
  }, [taxonomy]);

  useEffect(() => {
    fetch("/api/clubs/taxonomy")
      .then((r) => r.json())
      .then((d) => setTaxonomy(d.taxonomy || []))
      .catch(() => setTaxonomy([]));
  }, []);

  useEffect(() => {
    if (!editingId || !user) {
      setForm(emptyForm());
      return;
    }
    setForm(emptyForm());
    let cancelled = false;
    (async () => {
      setBusy(true);
      setError("");
      try {
        const res = await apiCall(`/api/clubs/${editingId}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "No se pudo cargar el club");
        if (!cancelled) setForm(detailToForm(data.club));
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [editingId, user, apiCall]);

  const updateField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const updateLocation = (key, value) => {
    setForm((f) => ({ ...f, location: { ...f.location, [key]: value } }));
  };

  const toggleService = (code) => {
    setForm((f) => {
      const has = f.serviceCodes.includes(code);
      return {
        ...f,
        serviceCodes: has ? f.serviceCodes.filter((c) => c !== code) : [...f.serviceCodes, code],
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const url = editingId ? `/api/clubs/${editingId}` : "/api/clubs";
      const method = editingId ? "PUT" : "POST";
      const body = buildApiBody(form, { isAdmin });
      const res = await apiCall(url, { method, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo guardar el club");
      if (onDone) onDone();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async () => {
    if (!editingId || !showDelete) return;
    if (!window.confirm("¿Archivar este club? Podrás contactar con administración si fue un error.")) return;
    setBusy(true);
    setError("");
    try {
      const res = await apiCall(`/api/clubs/${editingId}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo archivar");
      if (onDone) onDone();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  const sectionClass = "rounded-xl border border-outline-variant bg-white p-5 space-y-4";

  return (
    <div className="space-y-6">
      {error ? <p className="rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}

      <form onSubmit={onSubmit} className="space-y-6">
        <div className={sectionClass}>
          <h2 className="font-montserrat font-bold text-primary">Identidad y visibilidad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Nombre oficial (registro)</label>
              <input className={inputClass} value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
            </div>
            {editingId ? (
              <div className="md:col-span-2 rounded-lg bg-surface-container-low px-3 py-2 text-sm text-on-surface-variant">
                <span className="font-bold text-on-surface">URL del club:</span>{" "}
                <span className="font-mono text-primary">{form.slug || "…"}</span>
                <span className="block text-xs mt-1">Se actualiza automáticamente al guardar según el nombre.</span>
              </div>
            ) : null}
            <div className="md:col-span-2">
              <label className={labelClass}>Descripción del club</label>
              <textarea
                className={inputClass}
                rows={6}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
                minLength={10}
                maxLength={8000}
              />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Web</label>
              <input className={inputClass} type="url" value={form.websiteUrl} onChange={(e) => updateField("websiteUrl", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Instagram</label>
              <input className={inputClass} value={form.socialInstagram} onChange={(e) => updateField("socialInstagram", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Facebook</label>
              <input className={inputClass} value={form.socialFacebook} onChange={(e) => updateField("socialFacebook", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Logo (URL)</label>
              <input className={inputClass} value={form.logoUrl} onChange={(e) => updateField("logoUrl", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Imagen cabecera (URL)</label>
              <input className={inputClass} value={form.coverImageUrl} onChange={(e) => updateField("coverImageUrl", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Año fundación</label>
              <input
                className={inputClass}
                type="number"
                value={form.foundedYear}
                onChange={(e) => updateField("foundedYear", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Visibilidad</label>
              <select className={inputClass} value={form.visibility} onChange={(e) => updateField("visibility", e.target.value)}>
                <option value="public">Pública</option>
                <option value="unlisted">No listada</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Idioma ficha</label>
              <select className={inputClass} value={form.localeDefault} onChange={(e) => updateField("localeDefault", e.target.value)}>
                <option value="es">Español</option>
                <option value="ca">Català</option>
              </select>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="font-montserrat font-bold text-primary">Ubicación principal</h2>
          <p className="text-sm text-on-surface-variant">
            Al guardar, las coordenadas se obtienen automáticamente a partir de la dirección (servicio gratuito{" "}
            <a href="https://nominatim.openstreetmap.org/" className="underline text-primary" target="_blank" rel="noreferrer">
              Nominatim / OpenStreetMap
            </a>
            ).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>País (ISO)</label>
              <input className={inputClass} value={form.location.countryCode} onChange={(e) => updateLocation("countryCode", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>CCAA / comunidad</label>
              <input className={inputClass} value={form.location.adminAreaLevel1} onChange={(e) => updateLocation("adminAreaLevel1", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Provincia</label>
              <input className={inputClass} value={form.location.province} onChange={(e) => updateLocation("province", e.target.value)} required />
            </div>
            <div>
              <label className={labelClass}>Municipio</label>
              <input
                className={inputClass}
                value={form.location.municipality}
                onChange={(e) => updateLocation("municipality", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Código postal</label>
              <input className={inputClass} value={form.location.postalCode} onChange={(e) => updateLocation("postalCode", e.target.value)} required />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Dirección (calle y número, recomendado para geolocalizar)</label>
              <input className={inputClass} value={form.location.addressLine} onChange={(e) => updateLocation("addressLine", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Notas sede / entrenamientos</label>
              <textarea
                className={inputClass}
                rows={2}
                value={form.location.trainingVenueNotes}
                onChange={(e) => updateLocation("trainingVenueNotes", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="font-montserrat font-bold text-primary">Oferta (elige al menos una)</h2>
          {[
            { key: "discipline", label: "Disciplinas" },
            { key: "facility", label: "Instalaciones" },
            { key: "program", label: "Programas" },
          ].map(({ key: cat, label: catLabel }) => (
            <div key={cat}>
              <p className="text-sm font-semibold text-on-surface-variant mb-2">{catLabel}</p>
              <div className="flex flex-wrap gap-3">
                {(taxonomyByCategory[cat] || []).map((row) => (
                  <label key={row.code} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-outline-variant text-primary"
                      checked={form.serviceCodes.includes(row.code)}
                      onChange={() => toggleService(row.code)}
                    />
                    {row.label}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={sectionClass}>
          <h2 className="font-montserrat font-bold text-primary">Contacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Email público</label>
              <input
                className={inputClass}
                type="email"
                value={form.publicEmail}
                onChange={(e) => updateField("publicEmail", e.target.value)}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Teléfono público</label>
              <input className={inputClass} value={form.publicPhone} onChange={(e) => updateField("publicPhone", e.target.value)} required />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>WhatsApp (URL o enlace)</label>
              <input className={inputClass} value={form.whatsappUrl} onChange={(e) => updateField("whatsappUrl", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Persona de contacto</label>
              <input className={inputClass} value={form.contactName} onChange={(e) => updateField("contactName", e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Horario</label>
              <input className={inputClass} value={form.contactHours} onChange={(e) => updateField("contactHours", e.target.value)} />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="font-montserrat font-bold text-primary">Afiliación y cumplimiento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Estado afiliación</label>
              <select
                className={inputClass}
                value={form.affiliationStatus}
                onChange={(e) => updateField("affiliationStatus", e.target.value)}
              >
                <option value="none">Sin afiliación</option>
                <option value="applicant">Solicitante</option>
                <option value="affiliated">Afiliado</option>
                <option value="suspended">Suspendido</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Número afiliación</label>
              <input className={inputClass} value={form.affiliationNumber} onChange={(e) => updateField("affiliationNumber", e.target.value)} />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>URL certificado seguro (opcional)</label>
              <input
                className={inputClass}
                value={form.insuranceCertificateUrl}
                onChange={(e) => updateField("insuranceCertificateUrl", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <h2 className="font-montserrat font-bold text-primary">Directorio público</h2>
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 rounded border-outline-variant text-primary"
              checked={form.acceptsPublicListing}
              onChange={(e) => {
                const checked = e.target.checked;
                setForm((f) => ({
                  ...f,
                  acceptsPublicListing: checked,
                  dataProcessingConsentAt: checked ? new Date().toISOString() : f.dataProcessingConsentAt,
                }));
              }}
            />
            <span>
              Consiento aparecer en el directorio público una vez el club esté aprobado (RGPD). Es obligatorio marcarlo para enviar la ficha.
            </span>
          </label>
          <p className="text-xs text-on-surface-variant">Registro del consentimiento: {form.dataProcessingConsentAt || "—"}</p>
        </div>

        {isAdmin ? (
          <div className={sectionClass}>
            <h2 className="font-montserrat font-bold text-primary">Notas internas (solo administración)</h2>
            <textarea
              className={inputClass}
              rows={3}
              value={form.internalNotes}
              onChange={(e) => updateField("internalNotes", e.target.value)}
              placeholder="Visible solo para administradores"
            />
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button type="submit" disabled={busy} className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white disabled:opacity-50">
            {editingId ? "Guardar cambios" : "Crear y enviar a revisión"}
          </button>
          {showDelete && editingId ? (
            <button type="button" disabled={busy} onClick={onDelete} className="rounded-lg bg-red-700 px-6 py-2.5 font-semibold text-white">
              Archivar club
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
