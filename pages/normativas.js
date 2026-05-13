import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  NormativasHero,
  NormativasFeaturedPanel,
  NormativasChangelogTable,
  NormativasDocStrip,
  NormativasPrinciplesSection,
  NormativasFaqSection,
} from "@/components/normativas";
import {
  NORMATIVAS_HERO,
  NORMATIVAS_FEATURED,
  NORMATIVAS_DOCUMENTS,
  NORMATIVAS_CHANGELOG,
  NORMATIVAS_CHANGELOG_EMPTY_MESSAGE,
  NORMATIVAS_PRINCIPLES_TITLE,
  NORMATIVAS_PRINCIPLES_INTRO,
  NORMATIVAS_PRINCIPLES,
  NORMATIVAS_FAQ_TITLE,
  NORMATIVAS_FAQ,
} from "@/data/normativasPage";

export default function Normativas() {
  const { localizedHref } = useLocalizedLink();
  const reglamentoHref = localizedHref("/reglamento");

  return (
    <div className="bg-surface min-h-screen text-on-surface overflow-x-hidden">
      <SEOHead
        title="Normativas - Nosework Trial Community"
        description="Consulta las normativas y reglas de la Nosework Trial Community. Documentos descargables y FAQs interactivas."
        canonical="/normativas"
        ogImage="/images/normativas-og.jpg"
        additionalMeta={{
          keywords:
            "normativas detección canina, reglas nosework, criterios evaluación nosework, pruebas caninas",
        }}
      />

      <Navbar />

      <main className="space-y-12 md:space-y-16 pb-16">
        <NormativasHero hero={NORMATIVAS_HERO} />

        <div className="max-w-container-max mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <NormativasFeaturedPanel
              featured={NORMATIVAS_FEATURED}
              documents={NORMATIVAS_DOCUMENTS}
              reglamentoHref={reglamentoHref}
            />
            <NormativasChangelogTable rows={NORMATIVAS_CHANGELOG} emptyMessage={NORMATIVAS_CHANGELOG_EMPTY_MESSAGE} />
          </div>
        </div>

        <NormativasDocStrip documents={NORMATIVAS_DOCUMENTS} />

        <NormativasPrinciplesSection
          title={NORMATIVAS_PRINCIPLES_TITLE}
          intro={NORMATIVAS_PRINCIPLES_INTRO}
          items={NORMATIVAS_PRINCIPLES}
        />

        <NormativasFaqSection title={NORMATIVAS_FAQ_TITLE} items={NORMATIVAS_FAQ} />
      </main>

      <Footer />
    </div>
  );
}
