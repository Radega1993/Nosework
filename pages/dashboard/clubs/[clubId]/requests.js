import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardMembershipRequestsTable, DashboardLayout } from "@/components/dashboard";

export default function ClubRequestsPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { clubId } = router.query;
  const [requests, setRequests] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    if (!clubId) return;
    const res = await apiCall(`/api/clubs/${clubId}/join-requests`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "No se pudieron cargar solicitudes");
    setRequests((data.requests || []).filter((r) => r.status === "pending"));
  };

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !clubId) return;
    load().catch((e) => setError(e.message));
  }, [user, clubId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onDecision = async (requestId, action) => {
    setBusy(true);
    setError("");
    try {
      const res = await apiCall(`/api/clubs/${clubId}/join-requests`, {
        method: "PATCH",
        body: JSON.stringify({ requestId, action }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo actualizar la solicitud");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={user?.role === "administrador"}>
      <main className="flex-1 p-6">
        <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Solicitudes del club #{clubId}</h1>
        {error ? <p className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <DashboardMembershipRequestsTable requests={requests} onDecision={onDecision} loading={busy} />
      </main>
    </DashboardLayout>
  );
}
