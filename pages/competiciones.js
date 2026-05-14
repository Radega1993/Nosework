import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Button from "@/components/Button";
import HeroSection from "@/components/HeroSection";
import dynamic from "next/dynamic";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  ImageBadgeCardGrid,
  HorizontalProcessTimeline,
  RequirementsLegendSplit,
  DataTableSection,
} from "@/components/sections";
import {
  COMPETICIONES_HERO,
  COMPETICIONES_EVENT_CARDS,
  COMPETICIONES_PROCESS,
  COMPETICIONES_REQUIREMENTS,
  COMPETICIONES_LEGEND,
  COMPETICIONES_LEVELS_TABLE,
  COMPETICIONES_CTA,
} from "@/components/nosework/competicionesContent";

const CompeticionesUpcomingStrip = dynamic(
  () => import("@/components/nosework/CompeticionesUpcomingStrip"),
  { ssr: false }
);

export default function Competiciones() {
  const { localizedHref } = useLocalizedLink();

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SEOHead
        title="Competiciones – Nosework Trial"
        description="Tipos de pruebas, desarrollo de una jornada competitiva, requisitos y niveles Base y Avanzado. Consulta calendario y reglamento."
        canonical="/competiciones"
        ogImage="/images/og-image.jpg"
        additionalMeta={{
          keywords:
            "competiciones nosework, pruebas nosework trial, nivel base avanzado, calendario nosework",
        }}
      />

      <Navbar />

      <HeroSection
        layout="compact"
        title={COMPETICIONES_HERO.title}
        subtitle={COMPETICIONES_HERO.subtitle}
        backgroundImage="/images/hero-dog.webp"
      />

      <CompeticionesUpcomingStrip />

      <main>
        <ImageBadgeCardGrid items={COMPETICIONES_EVENT_CARDS} />
        <HorizontalProcessTimeline title={COMPETICIONES_PROCESS.title} steps={COMPETICIONES_PROCESS.steps} />
        <RequirementsLegendSplit
          requirementsTitle={COMPETICIONES_REQUIREMENTS.title}
          requirements={COMPETICIONES_REQUIREMENTS.items}
          legendTitle={COMPETICIONES_LEGEND.title}
          legendItems={COMPETICIONES_LEGEND.items}
        />
        <DataTableSection
          title={COMPETICIONES_LEVELS_TABLE.title}
          columns={COMPETICIONES_LEVELS_TABLE.columns}
          rows={COMPETICIONES_LEVELS_TABLE.rows}
        />

        <section className="py-16 md:py-20 text-center border-t border-outline-variant">
          <div className="max-w-2xl mx-auto px-6">
            <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-4">{COMPETICIONES_CTA.title}</h2>
            <p className="text-body-lg text-on-surface-variant mb-8">{COMPETICIONES_CTA.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <Button
                href={localizedHref("/eventos")}
                className="inline-flex items-center justify-center gap-2 !bg-secondary !text-on-secondary border-0 hover:!brightness-110 rounded-lg px-8 py-4 text-lg font-bold shadow-soft"
              >
                Ver calendario de pruebas
                <span className="material-symbols-outlined" aria-hidden>
                  calendar_month
                </span>
              </Button>
              <Button href={localizedHref("/reglamento")} variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-lg px-8 py-4 text-lg">
                Ver reglamento
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
