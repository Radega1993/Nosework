import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import {
  COMO_EMPEZAR_HERO,
  COMO_EMPEZAR_TIMELINE,
  COMO_EMPEZAR_CTA_CARDS,
  COMO_EMPEZAR_MATERIAL_ITEMS,
  COMO_EMPEZAR_COMMON_MISTAKES,
  COMO_EMPEZAR_FAQ_ITEMS,
} from "@/data/comoEmpezarPage";
import {
  ComoEmpezarHero,
  ComoEmpezarTimeline,
  ComoEmpezarQuickActions,
  ComoEmpezarMaterialsGrid,
  ComoEmpezarMistakesFaq,
} from "@/components/como-empezar";

export default function ComoEmpezar() {
  const { localizedHref } = useLocalizedLink();

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SEOHead
        title="Como Empezar en Nosework Trial - Guia para Principiantes 2025"
        description="Guia para empezar en Nosework Trial con pasos, material basico, errores comunes y preguntas frecuentes."
        canonical="/como-empezar"
        ogImage="/images/og-image.jpg"
        additionalMeta={{
          keywords:
            "como empezar nosework, guia nosework trial, entrenar perro deteccion, primeros pasos nosework",
        }}
      />

      <Navbar />

      <main>
        <ComoEmpezarHero
          hero={COMO_EMPEZAR_HERO}
          startHref={localizedHref("/que-es-nosework-trial")}
          rulesHref={localizedHref("/reglamento")}
        />
        <ComoEmpezarTimeline timeline={COMO_EMPEZAR_TIMELINE} />
        <ComoEmpezarQuickActions items={COMO_EMPEZAR_CTA_CARDS} localizedHref={localizedHref} />
        <ComoEmpezarMaterialsGrid items={COMO_EMPEZAR_MATERIAL_ITEMS} />
        <ComoEmpezarMistakesFaq
          mistakes={COMO_EMPEZAR_COMMON_MISTAKES}
          faqItems={COMO_EMPEZAR_FAQ_ITEMS}
        />
      </main>

      <Footer />
    </div>
  );
}

