import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function AvisoLegal() {
  return (
    <div className="page-shell">
      <SEOHead
        title="Aviso legal – Nosework"
        description="Información legal del sitio web de Nosework."
        canonical="/aviso-legal"
      />
      <Navbar />
      <main className="section-stack">
        <section className="surface-card max-w-4xl mx-auto">
          <h1 className="text-headline-h1 font-montserrat mb-6">Aviso legal</h1>
          <p className="text-on-surface-variant mb-4">
            Este sitio web tiene carácter informativo sobre actividades de Nosework. El uso del sitio implica la aceptación de
            sus condiciones y normativa vigente.
          </p>
          <p className="text-on-surface-variant mb-4">
            Titular: Nosework Trial Community. Contacto: contacto@noseworktrialcommunity.com.
          </p>
          <p className="text-on-surface-variant">
            Queda prohibida la reproducción total o parcial de los contenidos sin autorización expresa.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
