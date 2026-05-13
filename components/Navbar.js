import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "@/contexts/AuthContext";
/* Selector ES/CA oculto temporalmente: versión solo castellano. Descomentar cuando se reactive el catalán.
import LanguageSwitcher from "@/components/LanguageSwitcher";
*/
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { localizedHref } = useLocalizedLink();

    // 9.7 Cerrar drawer con Escape
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

    const navLinkClass =
        "relative px-3 py-2 text-white/90 hover:text-secondary-container transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary after:absolute after:left-3 after:right-3 after:bottom-1 after:h-0.5 after:bg-secondary-container after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left";

    return (
        <>
            <nav
                className="bg-primary fixed top-0 left-0 w-full z-50 shadow-md"
                role="navigation"
                aria-label="Menú principal"
            >
                <div className="container-redesign flex justify-between items-center gap-4 h-20">
                    {/* Logo - izquierda */}
                    <Link
                        href={localizedHref("/")}
                        className="flex items-center space-x-2 text-white font-bold text-xl hover:text-secondary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded"
                    >
                        <span>FDDN</span>
                        <span className="hidden sm:inline text-sm font-medium text-white/90">
                            Federación Nosework
                        </span>
                    </Link>

                    {/* Navegación desktop - centro/derecha */}
                    <ul className="hidden xl:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link href={localizedHref(link.path)} className={navLinkClass}>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        {user && (
                            <li>
                                <Link href="/dashboard" className={navLinkClass}>
                                    Dashboard
                                </Link>
                            </li>
                        )}
                        {user?.role === "administrador" && (
                            <li>
                                <Link href="/dashboard/admin" className={navLinkClass}>
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Idioma + Login/Logout - derecha */}
                    <div className="hidden xl:flex items-center space-x-4">
                        {/* <LanguageSwitcher /> */}
                        {user ? (
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-white/90 hover:text-secondary-container hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-secondary-container hover:bg-[#abd600] text-on-secondary-container font-semibold rounded-lg transition-colors duration-200 text-sm shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>

                    {/* Botón hamburguesa móvil */}
                    <button
                        type="button"
                        className="xl:hidden p-2 text-white hover:text-secondary-container transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                        onClick={toggleMenu}
                        aria-expanded={menuOpen}
                        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden
                        >
                            {menuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Overlay cuando el drawer está abierto */}
            {menuOpen && (
                <button
                    type="button"
                    className="xl:hidden fixed inset-0 bg-black/50 z-40 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-inset"
                    onClick={closeMenu}
                    aria-label="Cerrar menú"
                />
            )}

            {/* Drawer móvil - desliza desde la derecha */}
            <div
                className={`xl:hidden fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-primary shadow-xl z-50 transform transition-transform duration-300 ease-out ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación"
            >
                <div className="flex flex-col h-full pt-20 px-4 pb-6">
                    <ul className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                href={localizedHref(link.path)}
                                className="block px-4 py-3 text-white hover:text-secondary-container hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-inset"
                                onClick={closeMenu}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user && (
                            <Link
                                href="/dashboard"
                                className="block px-4 py-3 text-white hover:text-secondary-container hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-inset"
                                onClick={closeMenu}
                            >
                                Dashboard
                            </Link>
                        )}
                        {user?.role === "administrador" && (
                            <Link
                                href="/dashboard/admin"
                                className="block px-4 py-3 text-white hover:text-secondary-container hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-inset"
                                onClick={closeMenu}
                            >
                                Admin
                            </Link>
                        )}
                    </ul>
                    <div className="mt-auto pt-4 border-t border-white/20 space-y-2">
                        {/* <div className="px-4">
                            <LanguageSwitcher />
                        </div> */}
                        {user ? (
                            <button
                                type="button"
                                onClick={() => {
                                    logout();
                                    closeMenu();
                                }}
                                className="w-full text-left px-4 py-3 text-white/90 hover:text-secondary-container hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-inset"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="block px-4 py-3 bg-secondary-container hover:bg-[#abd600] text-on-secondary-container font-semibold rounded-lg text-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container focus-visible:ring-inset"
                                onClick={closeMenu}
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
