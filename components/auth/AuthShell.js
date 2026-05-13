import Link from "next/link";

/**
 * Contenedor común para login/registro (paleta FDDN: surface, primary, secondary-container).
 */
export default function AuthShell({ title, subtitle, children, footerLink }) {
  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <header className="border-b border-outline-variant bg-primary py-4 px-6">
        <div className="max-w-container-max mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-montserrat text-lg font-bold text-white hover:text-secondary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded"
          >
            Nosework Trial Community
          </Link>
          <Link
            href="/"
            className="text-sm text-white/85 hover:text-secondary-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-container rounded"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg p-8 md:p-10">
          <h1 className="font-montserrat text-2xl md:text-3xl font-bold text-primary text-center mb-2">{title}</h1>
          {subtitle ? <p className="text-center text-on-surface-variant text-sm mb-8">{subtitle}</p> : <div className="mb-6" />}
          {children}
          {footerLink ? <div className="mt-6 text-center text-sm text-on-surface-variant">{footerLink}</div> : null}
        </div>
      </div>
    </div>
  );
}
