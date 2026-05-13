import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardClubBadges from "@/components/dashboard/DashboardClubBadges";
import DashboardLicenseCard from "@/components/dashboard/DashboardLicenseCard";
import DashboardSeasonSummary from "@/components/dashboard/DashboardSeasonSummary";
import DashboardDogsGrid from "@/components/dashboard/DashboardDogsGrid";
import DashboardUpcoming from "@/components/dashboard/DashboardUpcoming";
import DashboardTitlesTable from "@/components/dashboard/DashboardTitlesTable";
import DashboardOrganizerSection from "@/components/dashboard/DashboardOrganizerSection";
import useMyDogs from "@/hooks/useMyDogs";

export default function DashboardPage() {
  const { user, loading, logout, apiCall } = useContext(AuthContext);
  const router = useRouter();
  const [dash, setDash] = useState(null);
  const [dashError, setDashError] = useState("");
  const [dashLoading, setDashLoading] = useState(true);
  const dogsApi = useMyDogs(apiCall, []);
  const { setDogs, dogs, createDog, updateDog, deleteDog, loading: dogsLoading, error: dogsError } = dogsApi;

  useEffect(() => {
    if (!loading && router.isReady && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user || loading) return;
    let cancelled = false;
    (async () => {
      setDashLoading(true);
      setDashError("");
      try {
        const res = await apiCall("/api/me/dashboard");
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.message || data.error || "No se pudo cargar el panel");
        }
        if (!cancelled) {
          setDash(data);
          setDogs(data.dogs || []);
        }
      } catch (e) {
        if (!cancelled) setDashError(e.message || "Error al cargar");
      } finally {
        if (!cancelled) setDashLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, loading, apiCall, setDogs]);

  if (loading || (!user && router.isReady)) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando…
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col md:flex-row">
      <DashboardSidebar
        onLogout={logout}
        isJudge={Boolean(user.is_judge)}
        isAdmin={Boolean(dash?.capabilities?.isAdmin)}
      />

      <div className="flex-1 md:ml-72 min-h-screen flex flex-col">
        <main className="flex-1 p-6 lg:p-8 max-w-container-max mx-auto w-full">
          {dashLoading ? (
            <p className="text-on-surface-variant">Cargando tu panel…</p>
          ) : dashError ? (
            <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
              {dashError}
            </p>
          ) : dash ? (
            <>
              <DashboardHeader profile={dash.profile} />
              <DashboardClubBadges ownedClubs={dash.ownedClubs} memberClubs={dash.memberClubs} />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                <DashboardLicenseCard profile={dash.profile} />
                <DashboardSeasonSummary stats={dash.stats} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-8 md:mb-10">
                <DashboardDogsGrid
                  dogs={dogs}
                  onCreateDog={createDog}
                  onUpdateDog={updateDog}
                  onDeleteDog={deleteDog}
                  loading={dogsLoading}
                  error={dogsError}
                />
                <DashboardUpcoming upcoming={dash.upcoming} />
              </div>

              <DashboardTitlesTable titles={dash.titles} />

              <section className="mt-8 rounded-xl border border-outline-variant bg-surface-container-low p-4 md:p-5">
                <h2 className="font-montserrat text-lg font-bold text-primary mb-3">Bandejas rápidas</h2>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg bg-white border border-surface-container p-3">
                    <p className="text-on-surface-variant">Solicitudes pendientes en tus clubs</p>
                    <p className="text-xl font-bold text-primary">{dash.workflows?.ownerPendingRequests?.length || 0}</p>
                  </div>
                  <div className="rounded-lg bg-white border border-surface-container p-3">
                    <p className="text-on-surface-variant">Invitaciones para ti</p>
                    <p className="text-xl font-bold text-primary">{dash.workflows?.myPendingInvitations?.length || 0}</p>
                  </div>
                  <div className="rounded-lg bg-white border border-surface-container p-3">
                    <p className="text-on-surface-variant">Solicitudes enviadas por ti</p>
                    <p className="text-xl font-bold text-primary">{dash.workflows?.myPendingJoinRequests?.length || 0}</p>
                  </div>
                </div>
              </section>

              {dash.capabilities?.canOrganizeEvents ? (
                <div className="mt-10">
                  <DashboardOrganizerSection />
                </div>
              ) : null}
            </>
          ) : null}
        </main>

        <footer className="border-t border-outline-variant bg-primary text-white py-5 px-6 text-center text-xs text-white/75">
          Nosework Trial Community — área privada
        </footer>
      </div>
    </div>
  );
}
