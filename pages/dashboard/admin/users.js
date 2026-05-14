import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard";

export default function AdminUsersPage() {
  const { user, loading, apiCall, logout } = useContext(AuthContext);
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "administrador")) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user || user.role !== "administrador") return;
    (async () => {
      try {
        const res = await apiCall("/api/admin/users");
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || "No se pudieron cargar usuarios");
        setUsers(data.users || []);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DashboardLayout onLogout={logout} isJudge={Boolean(user?.is_judge)} isAdmin>
      <main className="flex-1 p-6">
        <h1 className="font-montserrat text-2xl font-bold text-primary mb-4">Usuarios</h1>
        {error ? <p className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-red-700">{error}</p> : null}
        <div className="overflow-x-auto rounded-xl border border-outline-variant bg-white">
          <table className="w-full text-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Usuario</th>
                <th className="px-4 py-3 text-left">Rol</th>
                <th className="px-4 py-3 text-left">Clubs</th>
                <th className="px-4 py-3 text-left">Membresías</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-t border-outline-variant">
                  <td className="px-4 py-3">{u.id}</td>
                  <td className="px-4 py-3">{u.display_name}</td>
                  <td className="px-4 py-3">{u.role}</td>
                  <td className="px-4 py-3">{u.owned_clubs}</td>
                  <td className="px-4 py-3">{u.active_memberships}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardLayout>
  );
}
