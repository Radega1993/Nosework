import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardAdminKpis, DashboardLayout } from "@/components/dashboard";

export default function AdminDashboardPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const [metrics, setMetrics] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "administrador")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || user.role !== "administrador") return;
    (async () => {
      try {
        const res = await apiCall("/api/admin/clubs");
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "No se pudieron cargar métricas");
        setMetrics(data.metrics || {});
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin>
      <main className="flex-1 p-6">
        <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Dashboard administrador</h1>
        {error ? <p className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <DashboardAdminKpis metrics={metrics} />
        <div className="grid md:grid-cols-3 gap-3">
          <Link href="/dashboard/admin/clubs" className="rounded-xl border border-outline-variant bg-white p-4 font-semibold text-primary">
            Gestionar clubs
          </Link>
          <Link href="/dashboard/admin/users" className="rounded-xl border border-outline-variant bg-white p-4 font-semibold text-primary">
            Gestionar usuarios
          </Link>
          <Link href="/dashboard/admin/memberships" className="rounded-xl border border-outline-variant bg-white p-4 font-semibold text-primary">
            Gestionar membresías
          </Link>
        </div>
      </main>
    </DashboardLayout>
  );
}
