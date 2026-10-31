import Link from "next/link";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AuthContext from "@/contexts/AuthContext";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [navReady, setNavReady] = useState(false);
  const { localizedHref } = useLocalizedLink();
  const router = useRouter();

  useEffect(() => {
    setNavReady(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [menuOpen]);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Nosework", path: "/que-es-nosework-trial" },
    { name: "Competiciones", path: "/competiciones" },
    { name: "Calendario", path: "/eventos" },
    { name: "Resultados", path: "/resultados-rankings" },
    { name: "Clubes", path: "/clubs" },
    { name: "Niveles", path: "/niveles-titulos" },
  ];

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const isActive = (path) => {
    if (!navReady || !router.isReady) return false;
    const href = localizedHref(path);
    const asPath = router.asPath.split("?")[0].split("#")[0];
    if (path === "/") return asPath === href || asPath === `${href}/`;
    return asPath === href || asPath.startsWith(`${href}/`);
  };

  const navLinkClass = (path) =>
    `relative px-1 py-2 text-[13px] font-bold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded-sm ${
      isActive(path)
        ? "text-primary border-b-2 border-gold pb-1.5"
        : "text-[#4f655a] hover:text-primary"
    }`;

  return (
    <>
      <nav
        className="fixed top-0 left-0 z-50 w-full border-b border-outline-variant bg-[rgba(250,249,245,0.97)] backdrop-blur-[14px]"
        role="navigation"
        aria-label="Menú principal"
      >
        <div className="container-redesign flex h-[72px] items-center justify-between gap-4 md:h-[90px]">
          <Link
            href={localizedHref("/")}
            className="flex items-center gap-2 sm:gap-3 text-primary transition-opacity hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
          >
            <Image
              src="/logonosework/nosework-trial-community-long-black-transp.png"
              alt="Nosework Trial Community"
              width={220}
              height={48}
              className="h-7 w-auto sm:h-9 max-w-[min(100%,200px)] sm:max-w-[240px]"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-6 xl:flex">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link href={localizedHref(link.path)} className={navLinkClass(link.path)}>
                  {link.name}
                </Link>
              </li>
            ))}
            {user ? (
              <li>
                <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                  Dashboard
                </Link>
              </li>
            ) : null}
            {user?.role === "administrador" ? (
              <li>
                <Link href="/dashboard/admin" className={navLinkClass("/dashboard/admin")}>
                  Admin
                </Link>
              </li>
            ) : null}
          </ul>

          <div className="hidden items-center gap-4 xl:flex">
            <Link
              href={localizedHref("/reglamento")}
              className="text-[12px] font-semibold text-[#58735b] hover:text-primary"
            >
              Reglamento
            </Link>
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-[11px] bg-primary px-[17px] py-[13px] text-[12px] font-bold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-[11px] bg-primary px-[17px] py-[13px] text-[12px] font-bold text-white transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                Acceder ↗
              </Link>
            )}
          </div>

          <button
            type="button"
            className="rounded p-2 text-primary transition-colors hover:bg-mint xl:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 xl:hidden focus:outline-none"
          onClick={closeMenu}
          aria-label="Cerrar menú"
        />
      ) : null}

      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[90vw] transform border-l border-outline-variant bg-cream shadow-xl transition-transform duration-300 ease-out xl:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className="flex h-full flex-col px-4 pb-6 pt-24">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={localizedHref(link.path)}
                className="block rounded-lg px-4 py-3 font-semibold text-primary hover:bg-mint"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <Link href="/dashboard" className="block rounded-lg px-4 py-3 font-semibold text-primary hover:bg-mint" onClick={closeMenu}>
                Dashboard
              </Link>
            ) : null}
            <Link
              href={localizedHref("/reglamento")}
              className="block rounded-lg px-4 py-3 font-semibold text-primary hover:bg-mint"
              onClick={closeMenu}
            >
              Reglamento
            </Link>
          </ul>
          <div className="mt-auto space-y-2 border-t border-outline-variant pt-4">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="w-full rounded-[11px] bg-primary px-4 py-3 text-left text-sm font-bold text-white"
              >
                Cerrar sesión
              </button>
            ) : (
              <Link
                href="/login"
                className="block rounded-[11px] bg-primary px-4 py-3 text-center text-sm font-bold text-white"
                onClick={closeMenu}
              >
                Acceder
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
