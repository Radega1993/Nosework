import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function PoliticaPrivacidad() {
  return (
    <div className="page-shell">
      <SEOHead
        title="Política de privacidad – Nosework"
        description="Cómo tratamos los datos personales en Nosework."
        canonical="/politica-privacidad"
      />
      <Navbar />
      <main className="section-stack">
        <section className="surface-card max-w-4xl mx-auto">
          <h1 className="text-headline-h1 font-montserrat mb-6">Política de privacidad</h1>
          <p className="text-on-surface-variant mb-4">
            Los datos enviados en formularios se utilizan exclusivamente para responder consultas y gestionar servicios relacionados
            con las actividades de la comunidad.
          </p>
          <p className="text-on-surface-variant mb-4">
            Base jurídica: consentimiento del usuario al enviar formularios de contacto o inscripción.
          </p>
          <p className="text-on-surface-variant">
            Puedes solicitar acceso, rectificación o eliminación de tus datos escribiendo a contacto@noseworktrialcommunity.com.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
