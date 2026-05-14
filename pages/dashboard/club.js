import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
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
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-outline-variant bg-white p-1">
        {/* eslint-disable-next-line @next/next/no-img-element -- URL externa o subida sin dominio fijo en next.config */}
        <img src={trimmed} alt={label ? `Logo de ${label}` : ""} className="h-full w-full object-contain" />
      </div>
    );
  }
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-outline-variant bg-surface-container-highest"
      aria-hidden
    >
      <span className="material-symbols-outlined text-on-surface-variant text-2xl">pets</span>
    </div>
  );
}

export default function MiClubPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const [dash, setDash] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      setErr("");
      try {
        const res = await apiCall("/api/me/dashboard");
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || data.message || "No se pudo cargar");
        if (!cancelled) setDash(data);
      } catch (e) {
        if (!cancelled) setErr(e.message);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, apiCall]);

  const ownedClubs = dash?.ownedClubs || [];
  const memberClubs = dash?.memberClubs || [];

  const ownedIds = useMemo(() => new Set(ownedClubs.map((c) => c.id)), [ownedClubs]);
  const memberOnly = useMemo(() => memberClubs.filter((c) => !ownedIds.has(c.id)), [memberClubs, ownedIds]);

  const isAdmin = user?.role === "administrador";

  if (loading || (!user && router.isReady)) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando…
      </div>
    );
  }

  if (!user) return null;

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={isAdmin}>
      <main className="flex-1 p-6 lg:p-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">Mi club</h1>
          <p className="text-on-surface-variant text-sm max-w-xl">
            Gestiona tu club, invita a miembros o consulta el club en el que entrenas. Si eres responsable de un club,
            puedes publicar una prueba con el botón «Crear prueba o evento».
          </p>
        </div>

        {err ? <p className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">{err}</p> : null}

        <section className="mb-10 rounded-xl border border-outline-variant bg-surface-container-low p-6 shadow-sm">
          <h2 className="font-montserrat text-lg font-bold text-primary mb-2">Registrar un club nuevo</h2>
          <p className="text-sm text-on-surface-variant mb-4 max-w-xl">
            Crea la ficha de tu club en la plataforma. El equipo revisará la solicitud antes de publicarla en el directorio.
          </p>
          <Link
            href={localizedHref("/dashboard/clubs/crear")}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white shadow-md hover:opacity-95 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          >
            <span className="material-symbols-outlined text-xl text-white" aria-hidden>
              add
            </span>
            Registrar un club nuevo
          </Link>
        </section>

        {ownedClubs.length > 0 ? (
          <section className="space-y-6 mb-10">
            <h2 className="font-montserrat text-lg font-bold text-primary border-b border-outline-variant pb-2">Tu club</h2>
            {ownedClubs.map((club) => (
              <div
                key={club.id}
                className="rounded-2xl border-2 border-secondary/40 bg-gradient-to-br from-secondary-container/40 to-white p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex flex-wrap items-start gap-4 min-w-0">
                    <ClubLogoThumb url={club.logo_url} label={club.name} />
                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wide text-on-secondary-container mb-1">Organizas</p>
                      <p className="font-montserrat text-2xl font-bold text-primary">{club.name}</p>
                      <p className="text-sm text-on-surface-variant mt-1">
                        Estado: <span className="font-semibold capitalize">{statusLabel(club.status)}</span>
                        {club.slug ? <span className="ml-2 font-mono text-xs">· {club.slug}</span> : null}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}/editar`)}
                    className="shrink-0 text-sm font-semibold text-primary underline-offset-2 hover:underline"
                  >
                    Editar ficha
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}/members`)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary py-4 px-4 font-bold text-center text-white shadow-md hover:opacity-95 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-xl text-white shrink-0" aria-hidden>
                      groups
                    </span>
                    <span className="text-white">Ver miembros</span>
                  </Link>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}/invitations`)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-secondary py-4 px-4 font-bold text-center text-white shadow-md hover:brightness-105 transition-all"
                  >
                    <span className="material-symbols-outlined text-xl text-white shrink-0" aria-hidden>
                      person_add
                    </span>
                    <span className="text-white">Invitar miembros</span>
                  </Link>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}/requests`)}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary py-4 px-4 font-bold text-center hover:bg-primary/5 transition-colors sm:col-span-2"
                  >
                    <span className="material-symbols-outlined shrink-0" aria-hidden>
                      inbox
                    </span>
                    Solicitudes para unirse
                  </Link>
                  {dash?.capabilities?.canOrganizeEvents ? (
                    <Link
                      href={localizedHref(`/dashboard/clubs/${club.id}/evento/nuevo`)}
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-secondary bg-secondary-container/50 text-primary py-4 px-4 font-bold text-center hover:bg-secondary-container transition-colors sm:col-span-2"
                    >
                      <span className="material-symbols-outlined shrink-0" aria-hidden>
                        event
                      </span>
                      Crear prueba o evento
                    </Link>
                  ) : null}
                </div>
              </div>
            ))}
          </section>
        ) : null}

        {memberOnly.length > 0 ? (
          <section className="space-y-4 mb-10">
            <h2 className="font-montserrat text-lg font-bold text-primary border-b border-outline-variant pb-2">Como miembro</h2>
            <p className="text-sm text-on-surface-variant">Eres miembro de estos clubes (no eres el responsable de organización).</p>
            <div className="space-y-3">
              {memberOnly.map((club) => (
                <div
                  key={club.id}
                  className="rounded-xl border border-outline-variant bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <ClubLogoThumb url={club.logo_url} label={club.name} />
                    <div className="min-w-0">
                      <p className="font-montserrat font-bold text-primary text-lg">{club.name}</p>
                      <p className="text-xs text-on-surface-variant capitalize mt-1">{statusLabel(club.status)}</p>
                    </div>
                  </div>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 px-5 font-bold text-sm shrink-0 text-white hover:opacity-95 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    <span className="material-symbols-outlined text-lg text-white" aria-hidden>
                      visibility
                    </span>
                    <span className="text-white">Ver mi club</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {ownedClubs.length === 0 && memberOnly.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant bg-surface-container-low p-8 text-center mb-10">
            <p className="text-on-surface-variant mb-4">Aún no tienes un club registrado ni perteneces a ninguno.</p>
            <Link
              href={localizedHref("/dashboard/invitations")}
              className="inline-block text-sm font-semibold text-primary underline mb-6"
            >
              Revisa si tienes invitaciones pendientes
            </Link>
          </div>
        ) : null}
      </main>
    </DashboardLayout>
  );
}
