import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function PoliticaCookies() {
  return (
    <div className="page-shell">
      <SEOHead
        title="Política de cookies – Nosework"
        description="Información sobre el uso de cookies en Nosework."
        canonical="/politica-cookies"
      />
      <Navbar />
      <main className="section-stack">
        <section className="surface-card max-w-4xl mx-auto">
          <h1 className="text-headline-h1 font-montserrat mb-6">Política de cookies</h1>
          <p className="text-on-surface-variant mb-4">
            Este sitio utiliza cookies técnicas necesarias para funcionamiento básico, idioma y sesión.
          </p>
          <p className="text-on-surface-variant mb-4">
            También pueden usarse cookies analíticas para mejorar la experiencia de navegación de forma agregada.
          </p>
          <p className="text-on-surface-variant">
            Puedes gestionar tus preferencias desde la configuración de tu navegador.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
