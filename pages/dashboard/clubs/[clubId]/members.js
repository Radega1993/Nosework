import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardClubMembersTable, DashboardLayout } from "@/components/dashboard";

export default function ClubMembersPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const { clubId } = router.query;
  const [members, setMembers] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    if (!clubId) return;
    const res = await apiCall(`/api/clubs/${clubId}/members`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "No se pudieron cargar miembros");
    setMembers(data.members || []);
  };

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || !clubId) return;
    load().catch((e) => setError(e.message));
  }, [user, clubId]); // eslint-disable-line react-hooks/exhaustive-deps

  const onRemove = async (userId) => {
    setBusy(true);
    setError("");
    try {
      const res = await apiCall(`/api/clubs/${clubId}/members?userId=${userId}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo eliminar al miembro");
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
        <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Miembros del club #{clubId}</h1>
        {error ? <p className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <DashboardClubMembersTable members={members} onRemove={onRemove} loading={busy} />
      </main>
    </DashboardLayout>
  );
}
