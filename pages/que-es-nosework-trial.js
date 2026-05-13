import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import SEOHead from "@/components/SEOHead";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  IconFeatureGrid,
  AlternatingTimeline,
  ImageGradientCardGrid,
  BenefitsSplitWithQuote,
  AudiencePillsSection,
  BorderedFaqList,
} from "@/components/sections";
import {
  QUE_ES_HERO,
  QUE_ES_PILLARS_INTRO,
  QUE_ES_PILLARS,
  QUE_ES_TIMELINE,
  QUE_ES_MODALITIES_INTRO,
  QUE_ES_MODALITIES,
  QUE_ES_BENEFITS,
  QUE_ES_AUDIENCE,
  QUE_ES_FAQ,
} from "@/components/nosework/queEsNoseworkContent";

export default function QueEsNoseworkTrial() {
  const { localizedHref } = useLocalizedLink();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: QUE_ES_HERO.title,
    description:
      "Introducción a la detección deportiva Nosework: pilares, desarrollo de una búsqueda, modalidades y beneficios para el binomio.",
    author: { "@type": "Organization", name: "Nosework Trial Community" },
    publisher: { "@type": "Organization", name: "Nosework Trial Community" },
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SEOHead
        title="Qué es Nosework Trial – Detección deportiva y olfato canino"
        description="Qué es la detección deportiva Nosework: pilares (perro, guía, juez), fases de una búsqueda, modalidades y beneficios. Más detalle en el reglamento."
        canonical="/que-es-nosework-trial"
        ogImage="/images/og-image.jpg"
        additionalMeta={{
          keywords:
            "qué es nosework, detección deportiva canina, nosework trial, deporte olfato perros, búsqueda deportiva",
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <Navbar />

      <HeroSection
        layout="interior"
        eyebrow={QUE_ES_HERO.eyebrow}
        title={QUE_ES_HERO.title}
        subtitle={QUE_ES_HERO.subtitle}
        backgroundImage="/images/hero-dog.webp"
        primaryCTA={{
          href: localizedHref("/como-empezar"),
          label: "Empezar ahora",
          ariaLabel: "Ir a la guía para empezar en Nosework Trial",
        }}
        secondaryCTA={{
          href: localizedHref("/reglamento"),
          label: "Ver reglamento",
          ariaLabel: "Consultar el reglamento completo",
        }}
        tertiaryCTA={null}
      />

      <main>
        <IconFeatureGrid heading={QUE_ES_PILLARS_INTRO} items={QUE_ES_PILLARS} />
        <AlternatingTimeline title={QUE_ES_TIMELINE.title} steps={QUE_ES_TIMELINE.steps} />
        <ImageGradientCardGrid heading={QUE_ES_MODALITIES_INTRO} items={QUE_ES_MODALITIES} />
        <BenefitsSplitWithQuote
          title={QUE_ES_BENEFITS.title}
          items={QUE_ES_BENEFITS.items}
          imageSrc={QUE_ES_BENEFITS.imageSrc}
          imageAlt={QUE_ES_BENEFITS.imageAlt}
          quote={QUE_ES_BENEFITS.quote}
        />
        <AudiencePillsSection
          title={QUE_ES_AUDIENCE.title}
          body={QUE_ES_AUDIENCE.body}
          pills={QUE_ES_AUDIENCE.pills}
        />
        <BorderedFaqList title="Preguntas frecuentes" items={QUE_ES_FAQ} />

        <section className="py-14 bg-surface-container border-t border-outline-variant" aria-label="Siguientes pasos">
          <div className="max-w-container-max mx-auto px-6 text-center">
            <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-3">¿Siguiente paso?</h2>
            <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
              Profundiza en el reglamento o mira el calendario de pruebas cuando estén publicadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
              <Button href={localizedHref("/como-empezar")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                Cómo empezar
              </Button>
              <Button href={localizedHref("/reglamento")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                Reglamento
              </Button>
              <Button href={localizedHref("/eventos")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
                Eventos
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
