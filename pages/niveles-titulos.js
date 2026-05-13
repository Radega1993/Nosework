import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  NivelesHero,
  NivelesExcellenceTimeline,
  NivelesComparativaTable,
  NivelesBentoGrid,
  NivelesCertificadoPreview,
} from "@/components/niveles";
import {
  NIVELES_HERO,
  NIVELES_TIMELINE_STEPS,
  NIVELES_COMPARATIVA,
  NIVELES_BENTO_BLOCKS,
  NIVELES_CERTIFICADO,
} from "@/data/nivelesTitulosPage";

export default function NivelesTitulos() {
  const { localizedHref } = useLocalizedLink();
  const reglamentoHref = localizedHref("/reglamento");
  const eventosHref = localizedHref("/eventos");

  return (
    <div className="bg-surface min-h-screen text-on-surface overflow-x-hidden">
      <SEOHead
        title="Niveles y títulos – Nosework Trial"
        description="Trayectoria competitiva: ORT, niveles 1 a 3, élite y nacional. Tabla comparativa, requisitos y acreditación oficial."
        canonical="/niveles-titulos"
        ogImage="/images/og-image.jpg"
      />
      <Navbar />

      <main>
        <NivelesHero hero={NIVELES_HERO} reglamentoHref={reglamentoHref} eventosHref={eventosHref} />
        <NivelesExcellenceTimeline steps={NIVELES_TIMELINE_STEPS} />
        <NivelesComparativaTable comparativa={NIVELES_COMPARATIVA} />
        <NivelesBentoGrid blocks={NIVELES_BENTO_BLOCKS} reglamentoHref={reglamentoHref} />
        <NivelesCertificadoPreview cert={NIVELES_CERTIFICADO} />
      </main>

      <Footer />
    </div>
  );
}
