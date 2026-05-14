import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardInvitationsTable, DashboardLayout } from "@/components/dashboard";

export default function DashboardInvitationsPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const [invitations, setInvitations] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await apiCall("/api/me/invitations");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "No se pudieron cargar invitaciones");
    setInvitations(data.invitations || []);
  };

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    load().catch((e) => setError(e.message));
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const onAction = async (invitationId, action) => {
    setBusy(true);
    setError("");
    try {
      const res = await apiCall("/api/me/invitations", {
        method: "PATCH",
        body: JSON.stringify({ invitationId, action }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo procesar la invitación");
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
        <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Mis invitaciones</h1>
        {error ? <p className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <DashboardInvitationsTable invitations={invitations} onAction={onAction} loading={busy} />
      </main>
    </DashboardLayout>
  );
}
