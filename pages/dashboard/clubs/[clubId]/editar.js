import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardSidebar, ClubFichaForm } from "@/components/dashboard";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function EditarClubPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const clubId = Number(router.query.clubId);
  const [ownedClubs, setOwnedClubs] = useState([]);

  const isAdmin = user?.role === "administrador";

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await apiCall("/api/me/dashboard");
        const data = await res.json().catch(() => ({}));
        if (res.ok && !cancelled) setOwnedClubs(data.ownedClubs || []);
      } catch {
        if (!cancelled) setOwnedClubs([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, apiCall]);

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

  const canEdit = isAdmin || ownedClubs.some((c) => Number(c.id) === clubId);
  if (!canEdit) {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex">
        <DashboardSidebar onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={isAdmin} />
        <main className="flex-1 md:ml-72 p-6">
          <p className="text-red-700">No tienes permiso para editar este club.</p>
          <Link href={localizedHref("/dashboard/club")} className="text-primary font-semibold mt-4 inline-block">
            Volver a Mi club
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      <DashboardSidebar onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={isAdmin} />
      <main className="flex-1 md:ml-72 p-6 space-y-6 max-w-4xl">
        <div>
          <Link href={localizedHref("/dashboard/club")} className="text-sm font-semibold text-primary hover:underline">
            ← Volver a Mi club
          </Link>
          <h1 className="font-montserrat text-2xl font-bold text-primary mt-3">Editar ficha del club</h1>
        </div>
        <ClubFichaForm
          editingId={clubId}
          showDelete
          onDone={() => router.push(localizedHref("/dashboard/club"))}
        />
      </main>
    </div>
  );
}
