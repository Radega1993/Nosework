import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

function statusLabel(status) {
  const map = {
    pending: "En revisión",
    approved: "Aprobado",
    rejected: "Rechazado",
    archived: "Archivado",
  };
  return map[status] || status;
}

function ClubLogoThumb({ url, label }) {
  const trimmed = url && String(url).trim();
  if (trimmed) {
    return (
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-outline-variant bg-white p-1">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={trimmed} alt={label ? `Logo de ${label}` : ""} className="h-full w-full object-contain" />
      </div>
    );
  }
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-outline-variant bg-surface-container-highest"
      aria-hidden
    >
      <span className="material-symbols-outlined text-on-surface-variant text-2xl">pets</span>
    </div>
  );
}

export default function ClubFichaDashboardPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const clubId = Number(router.query.clubId);
  const [club, setClub] = useState(null);
  const [err, setErr] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const isAdmin = user?.role === "administrador";
  const isOwner = Boolean(user && club && Number(club.owner_user_id) === Number(user.id));

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !router.isReady || !clubId || Number.isNaN(clubId)) return;
    let cancelled = false;
    (async () => {
      setPageLoading(true);
      setErr("");
      try {
        const res = await apiCall(`/api/clubs/${clubId}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "No se pudo cargar la ficha");
        if (!cancelled) setClub(data.club || null);
      } catch (e) {
        if (!cancelled) {
          setErr(e.message);
          setClub(null);
        }
      } finally {
        if (!cancelled) setPageLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, router.isReady, clubId, apiCall]);

  if (loading || (!user && router.isReady)) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando…
      </div>
    );
  }

  if (!user) return null;

  if (!router.isReady || !clubId || Number.isNaN(clubId)) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando…
      </div>
    );
  }

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={isAdmin}>
      <main className="flex-1 p-6 lg:p-8 max-w-3xl">
        <Link href={localizedHref("/dashboard/club")} className="text-sm font-semibold text-primary hover:underline">
          ← Volver a Mi club
        </Link>

        {pageLoading ? (
          <p className="mt-8 text-on-surface-variant">Cargando ficha…</p>
        ) : err ? (
          <div className="mt-8 rounded border border-red-200 bg-red-50 p-4 text-red-800">
            <p className="font-semibold">{err}</p>
            <p className="text-sm mt-2">Si crees que deberías ver este club, comprueba que sigues siendo miembro activo.</p>
          </div>
        ) : club ? (
          <article className="mt-6 space-y-8">
            <header className="flex flex-wrap items-start gap-4">
              <ClubLogoThumb url={club.logo_url} label={club.display_name || club.name} />
              <div className="min-w-0 flex-1">
                <h1 className="font-montserrat text-3xl font-bold text-primary">{club.display_name || club.name}</h1>
                <p className="text-sm text-on-surface-variant mt-1 capitalize">
                  Estado: <span className="font-semibold">{statusLabel(club.status)}</span>
                  {club.slug ? <span className="ml-2 font-mono text-xs">· {club.slug}</span> : null}
                </p>
                {club.owner_name ? (
                  <p className="text-sm text-on-surface-variant mt-2">
                    Responsable: <span className="font-medium text-on-surface">{club.owner_name}</span>
                  </p>
                ) : null}
              </div>
            </header>

            {club.description ? (
              <section>
                <h2 className="font-montserrat text-lg font-bold text-primary mb-2">Descripción</h2>
                <div className="rounded-xl border border-outline-variant bg-white p-4 text-sm text-on-surface whitespace-pre-wrap">
                  {club.description}
                </div>
              </section>
            ) : null}

            {Array.isArray(club.locations) && club.locations.length > 0 ? (
              <section>
                <h2 className="font-montserrat text-lg font-bold text-primary mb-2">Ubicación</h2>
                <ul className="space-y-3">
                  {club.locations.map((loc) => (
                    <li key={loc.id} className="rounded-xl border border-outline-variant bg-white p-4 text-sm">
                      {loc.is_primary ? (
                        <p className="text-xs font-bold uppercase text-primary mb-2">Principal</p>
                      ) : null}
                      <p className="font-medium">
                        {[loc.municipality, loc.province].filter(Boolean).join(", ")}
                      </p>
                      {loc.address_line ? <p className="text-on-surface-variant mt-1">{loc.address_line}</p> : null}
                      {loc.postal_code ? <p className="text-on-surface-variant">CP {loc.postal_code}</p> : null}
                      {loc.training_venue_notes ? (
                        <p className="text-on-surface-variant mt-2 whitespace-pre-wrap">{loc.training_venue_notes}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {Array.isArray(club.services) && club.services.length > 0 ? (
              <section>
                <h2 className="font-montserrat text-lg font-bold text-primary mb-2">Servicios y disciplinas</h2>
                <ul className="flex flex-wrap gap-2">
                  {club.services.map((s) => (
                    <li key={s.code} className="rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">
                      {s.label}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section>
              <h2 className="font-montserrat text-lg font-bold text-primary mb-2">Contacto</h2>
              <dl className="rounded-xl border border-outline-variant bg-white p-4 text-sm space-y-2">
                {club.public_email ? (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-on-surface-variant shrink-0">Email</dt>
                    <dd>
                      <a href={`mailto:${club.public_email}`} className="text-primary font-semibold hover:underline break-all">
                        {club.public_email}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {club.public_phone ? (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-on-surface-variant shrink-0">Teléfono</dt>
                    <dd>
                      <a href={`tel:${club.public_phone}`} className="text-primary font-semibold hover:underline">
                        {club.public_phone}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {club.website_url ? (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-on-surface-variant shrink-0">Web</dt>
                    <dd>
                      <a
                        href={club.website_url}
                        className="text-primary font-semibold hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {club.website_url}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {club.whatsapp_url ? (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-on-surface-variant shrink-0">WhatsApp</dt>
                    <dd>
                      <a
                        href={club.whatsapp_url}
                        className="text-primary font-semibold hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Enlace
                      </a>
                    </dd>
                  </div>
                ) : null}
                {club.social_links?.instagram ? (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-on-surface-variant shrink-0">Instagram</dt>
                    <dd>
                      <a
                        href={club.social_links.instagram}
                        className="text-primary font-semibold hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {club.social_links.instagram}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {club.social_links?.facebook ? (
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <dt className="text-on-surface-variant shrink-0">Facebook</dt>
                    <dd>
                      <a
                        href={club.social_links.facebook}
                        className="text-primary font-semibold hover:underline break-all"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {club.social_links.facebook}
                      </a>
                    </dd>
                  </div>
                ) : null}
                {!club.public_email &&
                !club.public_phone &&
                !club.website_url &&
                !club.whatsapp_url &&
                !club.social_links?.instagram &&
                !club.social_links?.facebook ? (
                  <p className="text-on-surface-variant">Sin datos de contacto públicos registrados.</p>
                ) : null}
              </dl>
            </section>

            {club.contact_name || club.contact_hours ? (
              <section className="rounded-xl border border-outline-variant bg-surface-container-low p-4 text-sm">
                {club.contact_name ? (
                  <p>
                    <span className="text-on-surface-variant">Persona de contacto: </span>
                    <span className="font-medium">{club.contact_name}</span>
                  </p>
                ) : null}
                {club.contact_hours ? (
                  <p className={club.contact_name ? "mt-2" : ""}>
                    <span className="text-on-surface-variant">Horario: </span>
                    <span className="whitespace-pre-wrap">{club.contact_hours}</span>
                  </p>
                ) : null}
              </section>
            ) : null}

            {isOwner || isAdmin ? (
              <section className="rounded-2xl border-2 border-secondary/40 bg-gradient-to-br from-secondary-container/30 to-white p-6">
                <h2 className="font-montserrat text-lg font-bold text-primary mb-3">Gestión del club</h2>
                <div className="grid sm:grid-cols-2 gap-2">
                  <Link
                    href={localizedHref(`/dashboard/clubs/${clubId}/editar`)}
                    className="rounded-lg border border-primary text-primary py-3 px-4 text-center text-sm font-bold hover:bg-primary/5"
                  >
                    Editar ficha
                  </Link>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${clubId}/members`)}
                    className="rounded-lg bg-primary text-white py-3 px-4 text-center text-sm font-bold hover:opacity-95"
                  >
                    Miembros
                  </Link>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${clubId}/invitations`)}
                    className="rounded-lg bg-secondary text-on-secondary py-3 px-4 text-center text-sm font-bold hover:brightness-105"
                  >
                    Invitaciones
                  </Link>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${clubId}/requests`)}
                    className="rounded-lg border-2 border-primary text-primary py-3 px-4 text-center text-sm font-bold hover:bg-primary/5 sm:col-span-2"
                  >
                    Solicitudes para unirse
                  </Link>
                </div>
              </section>
            ) : null}
          </article>
        ) : null}
      </main>
    </DashboardLayout>
  );
}
