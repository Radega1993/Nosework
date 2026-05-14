import DashboardSidebar from "./DashboardSidebar";

/**
 * Shell común del área privada: sidebar fijo + columna de contenido con margen en desktop.
 * Todas las rutas bajo /dashboard/* deben usar este layout para no “perder” el menú al navegar.
 */
export default function DashboardLayout({ children, onLogout, isJudge, isAdmin }) {
  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col md:flex-row">
      <DashboardSidebar onLogout={onLogout} isJudge={isJudge} isAdmin={isAdmin} />
      <div className="flex-1 md:ml-72 min-h-screen w-full min-w-0 flex flex-col">{children}</div>
    </div>
  );
}
