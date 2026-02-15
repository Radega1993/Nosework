import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import AuthContext from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
        { name: "Qué es", path: "/que-es-nosework-trial" },
        { name: "Reglamento", path: "/reglamento" },
        { name: "Cómo Empezar", path: "/como-empezar" },
        { name: "Eventos", path: "/eventos" }, // Updated from /events to /eventos
        { name: "Quiénes Somos", path: "/about" },
        { name: "Contacto", path: "/contact" },
    ];

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const closeMenu = () => setMenuOpen(false);

    const navLinkClass =
        "relative px-4 py-2 text-white/90 hover:text-gold transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy after:absolute after:left-4 after:right-4 after:bottom-1 after:h-0.5 after:bg-gold after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left";

    return (
        <>
            <nav
                className="bg-navy fixed top-0 left-0 w-full z-50 shadow-md"
                role="navigation"
                aria-label="Menú principal"
            >
                <div className="container-redesign flex justify-between items-center h-20">
                    {/* Logo - izquierda */}
                    <Link
                        href={localizedHref("/")}
                        className="flex items-center space-x-2 text-white font-bold text-xl hover:text-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy rounded"
                    >
                        <span>NTC</span>
                        <span className="hidden sm:inline text-sm font-medium text-white/90">
                            Nosework Trial
                        </span>
                    </Link>

                    {/* Navegación desktop - centro/derecha */}
                    <ul className="hidden lg:flex items-center space-x-1">
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
                    </ul>

                    {/* Idioma + Login/Logout - derecha */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <LanguageSwitcher />
                        {user ? (
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-white/90 hover:text-gold hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-gold hover:bg-gold-hover text-navy font-semibold rounded-lg transition-colors duration-200 text-sm shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>

                    {/* Botón hamburguesa móvil */}
                    <button
                        type="button"
                        className="lg:hidden p-2 text-white hover:text-gold transition-colors rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
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
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                    onClick={closeMenu}
                    aria-label="Cerrar menú"
                />
            )}

            {/* Drawer móvil - desliza desde la derecha */}
            <div
                className={`lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-navy shadow-xl z-50 transform transition-transform duration-300 ease-out ${
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
                                className="block px-4 py-3 text-white hover:text-gold hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                                onClick={closeMenu}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {user && (
                            <Link
                                href="/dashboard"
                                className="block px-4 py-3 text-white hover:text-gold hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                                onClick={closeMenu}
                            >
                                Dashboard
                            </Link>
                        )}
                    </ul>
                    <div className="mt-auto pt-4 border-t border-white/20 space-y-2">
                        <div className="px-4">
                            <LanguageSwitcher />
                        </div>
                        {user ? (
                            <button
                                type="button"
                                onClick={() => {
                                    logout();
                                    closeMenu();
                                }}
                                className="w-full text-left px-4 py-3 text-white/90 hover:text-gold hover:bg-white/10 rounded-lg transition-colors duration-200 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="block px-4 py-3 bg-gold hover:bg-gold-hover text-navy font-semibold rounded-lg text-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
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
