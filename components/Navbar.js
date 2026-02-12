import Link from "next/link";
import { useContext, useState } from "react";
import AuthContext from "@/contexts/AuthContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { localizedHref } = useLocalizedLink();

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

    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href={localizedHref("/")} className="flex items-center space-x-2 group">
                        <span className="text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors">
                            NTC
                        </span>
                        <span className="hidden sm:inline text-sm text-gray-600 font-medium">
                            Nosework Trial
                        </span>
                    </Link>

                    {/* Menú Desktop */}
                    <ul className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    href={localizedHref(link.path)}
                                    className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        {user && (
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                                >
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>

                    {/* Login/Logout Desktop */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <LanguageSwitcher />
                        {user ? (
                            <button
                                onClick={logout}
                                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium text-sm"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 font-medium text-sm shadow-md hover:shadow-lg"
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>

                    {/* Menú Móvil Toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-700 hover:text-primary-600 transition-colors"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {menuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Menú Móvil Expandible */}
            <div
                className={`lg:hidden bg-white border-t border-gray-200 transform transition-all duration-300 ease-in-out ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <div className="container mx-auto px-4 py-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={localizedHref(link.path)}
                            className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user && (
                        <Link
                            href="/dashboard"
                            className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200 font-medium"
                            onClick={() => setMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                    )}
                    <div className="pt-4 border-t border-gray-200 space-y-3">
                        <div className="px-4">
                            <LanguageSwitcher />
                        </div>
                        {user ? (
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link
                                href="/login"
                                className="block px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 font-medium text-center"
                                onClick={() => setMenuOpen(false)}
                            >
                                Iniciar Sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
