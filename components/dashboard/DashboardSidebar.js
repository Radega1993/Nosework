import Link from "next/link";
import { useRouter } from "next/router";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const navClass = (active) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    active
      ? "bg-secondary-container text-on-secondary-container font-bold"
      : "text-on-surface-variant hover:bg-surface-container-highest"
  }`;

/**
 * Navegación lateral del área deportista (siempre visible con DashboardLayout).
 */
export default function DashboardSidebar({ onLogout, isJudge, isAdmin = false }) {
  const router = useRouter();
  const { localizedHref } = useLocalizedLink();
  const path = router.pathname || "";
  const asPath = router.asPath || "";

  const dashboardHref = localizedHref("/dashboard");
  const perrosHref = `${dashboardHref}#mis-perros`;

  const isDashboardHome = path === "/dashboard";
  const isPerrosAnchor = isDashboardHome && asPath.includes("mis-perros");
  const isClubArea =
    path === "/dashboard/club" || path.startsWith("/dashboard/clubs");
  const isInvitations = path === "/dashboard/invitations";
  const isAdminSection = path.startsWith("/dashboard/admin");

  return (
    <aside className="w-full md:w-72 md:fixed md:inset-y-0 md:left-0 z-[60] bg-surface-container border-b md:border-b-0 md:border-r border-outline-variant p-4 md:p-5 flex flex-row md:flex-col md:h-screen shadow-xl overflow-x-auto md:overflow-y-auto shrink-0">
      <div className="mb-4 md:mb-6 pr-4 min-w-[140px] md:min-w-0">
        <p className="font-montserrat text-lg font-bold text-primary leading-tight">NTC</p>
        <p className="text-on-surface-variant text-xs">Área privada</p>
      </div>

      <nav className="flex md:flex-col gap-1 md:flex-1 md:overflow-y-auto md:min-h-0">
        <Link href={localizedHref("/")} className={navClass(false)}>
          <span className="material-symbols-outlined text-xl" aria-hidden>
            home
          </span>
          Inicio
        </Link>
        <Link href={dashboardHref} className={navClass(isDashboardHome && !isPerrosAnchor)} aria-current={isDashboardHome && !isPerrosAnchor ? "page" : undefined}>
          <span className="material-symbols-outlined text-xl" aria-hidden>
            person
          </span>
          Área deportista
        </Link>
        <Link href={perrosHref} className={navClass(isPerrosAnchor)} aria-current={isPerrosAnchor ? "page" : undefined}>
          <span className="material-symbols-outlined text-xl" aria-hidden>
            pets
          </span>
          Mis perros
        </Link>
        <Link href={localizedHref("/resultados-rankings")} className={navClass(false)}>
          <span className="material-symbols-outlined text-xl" aria-hidden>
            leaderboard
          </span>
          Resultados
        </Link>
        <Link href={localizedHref("/dashboard/club")} className={navClass(isClubArea)} aria-current={isClubArea ? "page" : undefined}>
          <span className="material-symbols-outlined text-xl" aria-hidden>
            groups
          </span>
          Mi club
        </Link>
        <span className={`${navClass(false)} opacity-50 cursor-not-allowed`} title="Próximamente">
          <span className="material-symbols-outlined text-xl" aria-hidden>
            school
          </span>
          Formación
        </span>
        <span
          className={`${navClass(false)} ${isJudge ? "" : "opacity-50 cursor-not-allowed"}`}
          title={isJudge ? "Juez" : "Funcionalidad de juez: próximamente"}
          aria-disabled={!isJudge}
        >
          <span className="material-symbols-outlined text-xl" aria-hidden>
            gavel
          </span>
          Juez {!isJudge ? "(pronto)" : ""}
        </span>
        <Link href={localizedHref("/dashboard/invitations")} className={navClass(isInvitations)} aria-current={isInvitations ? "page" : undefined}>
          <span className="material-symbols-outlined text-xl" aria-hidden>
            mail
          </span>
          Invitaciones
        </Link>
        {isAdmin ? (
          <Link href={localizedHref("/dashboard/admin")} className={navClass(isAdminSection)} aria-current={isAdminSection ? "page" : undefined}>
            <span className="material-symbols-outlined text-xl" aria-hidden>
              admin_panel_settings
            </span>
            Panel admin
          </Link>
        ) : null}
      </nav>

      <div className="mt-4 md:mt-auto pt-3 md:pt-4 border-t border-outline-variant shrink-0">
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-bold text-sm hover:opacity-95 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden>
            logout
          </span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
