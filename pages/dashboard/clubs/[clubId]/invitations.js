import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardInvitationsTable, DashboardSidebar } from "@/components/dashboard";

export default function ClubInvitationsPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { clubId } = router.query;
  const [invitations, setInvitations] = useState([]);
  const [invitedUserId, setInvitedUserId] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    if (!clubId) return;
    const res = await apiCall(`/api/clubs/${clubId}/invitations`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "No se pudieron cargar invitaciones");
    setInvitations(data.invitations || []);
  };

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !clubId) return;
    load().catch((e) => setError(e.message));
  }, [user, clubId]); // eslint-disable-line react-hooks/exhaustive-deps

  const createInvitation = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await apiCall(`/api/clubs/${clubId}/invitations`, {
        method: "POST",
        body: JSON.stringify({ invitedUserId: Number(invitedUserId) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo enviar invitación");
      setInvitedUserId("");
      await load();
    } catch (e2) {
      setError(e2.message);
    } finally {
      setBusy(false);
    }
  };

  const onAction = async (invitationId) => {
    setBusy(true);
    setError("");
    try {
      const res = await apiCall(`/api/clubs/${clubId}/invitations`, {
        method: "DELETE",
        body: JSON.stringify({ invitationId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo cancelar invitación");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex">
      <DashboardSidebar onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin={user?.role === "administrador"} />
      <main className="flex-1 md:ml-72 p-6 space-y-4">
        <h1 className="font-montserrat text-2xl font-bold text-primary">Invitaciones del club #{clubId}</h1>
        {error ? <p className="rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <form onSubmit={createInvitation} className="rounded-xl border border-outline-variant bg-white p-4 flex gap-2">
          <input
            value={invitedUserId}
            onChange={(e) => setInvitedUserId(e.target.value)}
            placeholder="ID usuario a invitar"
            className="flex-1 rounded border border-outline-variant px-3 py-2"
          />
          <button type="submit" disabled={busy} className="rounded bg-primary px-4 py-2 font-semibold text-white">
            Invitar
          </button>
        </form>
        <DashboardInvitationsTable invitations={invitations} onAction={onAction} loading={busy} ownerMode />
      </main>
    </div>
  );
}
