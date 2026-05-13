import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardSidebar } from "@/components/dashboard";
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
    <div className="min-h-screen bg-surface text-on-surface flex">
      <DashboardSidebar onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={isAdmin} />
      <main className="flex-1 md:ml-72 p-6 lg:p-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-montserrat text-3xl font-bold text-primary mb-2">Mi club</h1>
          <p className="text-on-surface-variant text-sm max-w-xl">
            Gestiona tu club, invita a miembros o consulta el club en el que entrenas. El alta de un club nuevo es un trámite puntual; la tienes enlazada abajo del todo.
          </p>
        </div>

        {err ? <p className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700">{err}</p> : null}

        {ownedClubs.length > 0 ? (
          <section className="space-y-6 mb-10">
            <h2 className="font-montserrat text-lg font-bold text-primary border-b border-outline-variant pb-2">Tu club</h2>
            {ownedClubs.map((club) => (
              <div
                key={club.id}
                className="rounded-2xl border-2 border-secondary/40 bg-gradient-to-br from-secondary-container/40 to-white p-6 shadow-soft"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-on-secondary-container mb-1">Organizas</p>
                    <p className="font-montserrat text-2xl font-bold text-primary">{club.name}</p>
                    <p className="text-sm text-on-surface-variant mt-1">
                      Estado: <span className="font-semibold capitalize">{statusLabel(club.status)}</span>
                      {club.slug ? <span className="ml-2 font-mono text-xs">· {club.slug}</span> : null}
                    </p>
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
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary text-on-primary py-4 px-4 font-bold text-center shadow-md hover:opacity-95 transition-opacity"
                  >
                    <span className="material-symbols-outlined" aria-hidden>
                      groups
                    </span>
                    Ver miembros
                  </Link>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}/invitations`)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-secondary text-on-secondary py-4 px-4 font-bold text-center shadow-md hover:brightness-105 transition-all"
                  >
                    <span className="material-symbols-outlined" aria-hidden>
                      person_add
                    </span>
                    Invitar miembros
                  </Link>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}/requests`)}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-primary text-primary py-4 px-4 font-bold text-center hover:bg-primary/5 transition-colors sm:col-span-2"
                  >
                    <span className="material-symbols-outlined" aria-hidden>
                      inbox
                    </span>
                    Solicitudes para unirse
                  </Link>
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
                  className="rounded-xl border border-outline-variant bg-white p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <p className="font-montserrat font-bold text-primary text-lg">{club.name}</p>
                    <p className="text-xs text-on-surface-variant capitalize mt-1">{club.status}</p>
                  </div>
                  <Link
                    href={localizedHref(`/dashboard/clubs/${club.id}/members`)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-on-primary py-3 px-5 font-bold text-sm shrink-0"
                  >
                    <span className="material-symbols-outlined text-lg" aria-hidden>
                      visibility
                    </span>
                    Ver mi club
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

        <section className="rounded-xl border border-dashed border-outline-variant bg-surface-container-low/50 p-5">
          <h2 className="font-montserrat text-sm font-bold text-on-surface-variant uppercase tracking-wide mb-2">Alta de club (poco habitual)</h2>
          <p className="text-sm text-on-surface-variant mb-4">
            Usa este enlace solo si quieres registrar un club nuevo en la plataforma. El proceso incluye revisión por el equipo.
          </p>
          <Link
            href={localizedHref("/dashboard/clubs/crear")}
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant bg-white px-4 py-2 text-sm font-semibold text-primary hover:bg-surface-container-highest transition-colors"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden>
              add
            </span>
            Registrar un club nuevo
          </Link>
        </section>
      </main>
    </div>
  );
}
