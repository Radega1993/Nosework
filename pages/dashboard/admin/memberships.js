import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard";

export default function AdminMembershipsPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const [memberships, setMemberships] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "administrador")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || user.role !== "administrador") return;
    (async () => {
      try {
        const res = await apiCall("/api/admin/memberships");
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "No se pudieron cargar membresías");
        setMemberships(data.memberships || []);
        setMetrics(data.metrics || {});
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin>
      <main className="flex-1 p-6">
        <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Membresías</h1>
        {error ? <p className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="rounded-xl border border-outline-variant bg-white p-3">
            <p className="text-xs text-on-surface-variant">Solicitudes pendientes</p>
            <p className="font-bold text-xl text-primary">{metrics.pending_requests || 0}</p>
          </div>
          <div className="rounded-xl border border-outline-variant bg-white p-3">
            <p className="text-xs text-on-surface-variant">Invitaciones pendientes</p>
            <p className="font-bold text-xl text-primary">{metrics.pending_invites || 0}</p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-outline-variant bg-white">
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">Club</th>
                <th className="px-4 py-3 text-left">Usuario</th>
                <th className="px-4 py-3 text-left">Rol</th>
                <th className="px-4 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((m) => (
                <tr key={m.id} className="border-t border-outline-variant">
                  <td className="px-4 py-3">{m.club_name}</td>
                  <td className="px-4 py-3">{m.user_name}</td>
                  <td className="px-4 py-3">{m.role}</td>
                  <td className="px-4 py-3">{m.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardLayout>
  );
}
