import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardClubApprovalsTable, DashboardLayout } from "@/components/dashboard";

export default function AdminClubsPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const [clubs, setClubs] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await apiCall("/api/admin/clubs");
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "No se pudieron cargar clubs");
    setClubs(data.clubs || []);
  };

  useEffect(() => {
    if (!loading && (!user || user.role !== "administrador")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || user.role !== "administrador") return;
    load().catch((e) => setError(e.message));
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const onReview = async (clubId, action) => {
    setBusy(true);
    setError("");
    try {
      const res = await apiCall(`/api/admin/clubs/${clubId}/review`, {
        method: "PATCH",
        body: JSON.stringify({ action }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "No se pudo revisar club");
      await load();
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin>
      <main className="flex-1 p-6">
        <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Gestión de clubs</h1>
        {error ? <p className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <DashboardClubApprovalsTable clubs={clubs} onReview={onReview} loading={busy} />
      </main>
    </DashboardLayout>
  );
}
