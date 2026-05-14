import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardLayout, ClubFichaForm } from "@/components/dashboard";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function CrearClubPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const isAdmin = user?.role === "administrador";

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

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
      <main className="flex-1 p-6 space-y-6 max-w-4xl">
        <div>
          <Link href={localizedHref("/dashboard/club")} className="text-sm font-semibold text-primary hover:underline">
            ← Volver a Mi club
          </Link>
          <h1 className="font-montserrat text-2xl font-bold text-primary mt-3">Registrar un club nuevo</h1>
          <p className="text-on-surface-variant text-sm mt-1">
            Completa la ficha. Se geolocalizará la sede al guardar y el club quedará pendiente de aprobación.
          </p>
        </div>
        <ClubFichaForm editingId={null} onDone={() => router.push(localizedHref("/dashboard/club"))} />
      </main>
    </DashboardLayout>
  );
}
