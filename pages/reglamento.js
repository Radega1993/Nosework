import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

const REGLEMENTO_VERSION = "v1.0";
const REGLEMENTO_DATE = "2025-02-01";

const sectionCard =
  "rounded-xl border border-outline-variant bg-surface-container-lowest p-6 md:p-8 shadow-soft scroll-mt-24";
const indexLink =
  "block p-3 rounded-lg text-on-surface font-medium hover:bg-surface-container-highest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary border border-transparent hover:border-outline-variant";

export default function Reglamento() {
  const { localizedHref } = useLocalizedLink();

  return (
    <div className="bg-surface min-h-screen text-on-surface">
      <SEOHead
        title="Reglamento Nosework Trial – Normativa oficial 2025"
        description="Consulta el reglamento oficial de Nosework Trial. Normativa completa, niveles Base y Avanzado, tipos de búsqueda, sistema de puntuación y código ético."
        canonical="/reglamento"
        ogImage="/images/og-image.jpg"
        additionalMeta={{
          keywords:
            "reglamento nosework, reglamento detección deportiva perros, normativa nosework trial, reglamento oficial",
        }}
      />

      <Navbar />

      <HeroSection
        layout="compact"
        compactOverlay="soft"
        align="center"
        title="Reglamento y normativa"
        subtitle="Normativa oficial de Nosework Trial Community."
        backgroundImage="/images/hero-dog.webp"
        showActions={false}
      />

      <main className="max-w-container-max mx-auto px-6 py-10 md:py-12 space-y-8">
        <section className={`${sectionCard} text-center max-w-3xl mx-auto`}>
          <p className="text-sm text-on-surface-variant mb-4" aria-label="Versión del reglamento">
            Versión {REGLEMENTO_VERSION} · Fecha: {REGLEMENTO_DATE}
          </p>
          <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-4">Descarga el reglamento completo</h2>
          <p className="text-body text-on-surface-variant mb-6">
            Descarga el reglamento oficial en formato PDF para consulta offline.
          </p>
          <a
            href="/documents/normativas_participantes.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            aria-label="Descargar reglamento en PDF"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden>
              picture_as_pdf
            </span>
            Descargar reglamento en PDF
          </a>
        </section>

        <section className={sectionCard}>
          <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-6">Índice del reglamento</h2>
          <nav className="space-y-2">
            <a href="#niveles" className={indexLink}>
              1. Niveles (Base y Avanzado)
            </a>
            <a href="#tipos-busqueda" className={indexLink}>
              2. Tipos de búsqueda
            </a>
            <a href="#puntuacion" className={indexLink}>
              3. Sistema de puntuación
            </a>
            <a href="#titulos" className={indexLink}>
              4. Títulos y reconocimientos
            </a>
            <a href="#codigo-etico" className={indexLink}>
              5. Código ético y bienestar del perro
            </a>
          </nav>
        </section>

        <section id="niveles" className={sectionCard}>
          <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-6">1. Niveles: Base y Avanzado</h2>
          <div className="space-y-8 text-on-surface-variant">
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Nivel Base</h3>
              <p className="text-body mb-3">El nivel Base está pensado para perros y guías que se inician en Nosework Trial:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body text-on-surface">
                <li>Búsquedas con menor complejidad y menos distracciones</li>
                <li>Tiempo límite más amplio</li>
                <li>Familiarización con el formato de prueba y con el olor objetivo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Nivel Avanzado</h3>
              <p className="text-body mb-3">El nivel Avanzado exige mayor precisión y autonomía del perro:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body text-on-surface">
                <li>Mayor complejidad, distracciones y áreas de búsqueda</li>
                <li>Tiempos y criterios más estrictos</li>
                <li>Puede añadirse olor de referencia además del olor base</li>
              </ul>
            </div>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Olores oficiales</h3>
              <p className="text-body mb-3">
                Los olores de trabajo son: Kong + aceite esencial de salvia. En nivel Avanzado el organizador puede anunciar la
                posibilidad de añadir un olor de referencia.
              </p>
            </div>
          </div>
        </section>

        <section id="tipos-busqueda" className={sectionCard}>
          <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-6">2. Tipos de búsqueda</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-secondary pl-4">
              <h3 className="font-montserrat font-bold text-primary mb-2">Búsqueda en interior</h3>
              <p className="text-body text-on-surface-variant">
                Búsquedas realizadas en espacios cerrados como salas, habitaciones o edificios. El perro debe localizar el olor
                objetivo entre distracciones y en diferentes alturas.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h3 className="font-montserrat font-bold text-primary mb-2">Búsqueda en exterior</h3>
              <p className="text-body text-on-surface-variant">
                Búsquedas al aire libre en áreas abiertas, parques o terrenos. Las condiciones ambientales y el viento añaden
                complejidad a estas búsquedas.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h3 className="font-montserrat font-bold text-primary mb-2">Búsqueda en vehículos</h3>
              <p className="text-body text-on-surface-variant">
                El perro debe buscar el olor objetivo en vehículos estacionados. Se evalúa la precisión y la independencia del
                perro.
              </p>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <h3 className="font-montserrat font-bold text-primary mb-2">Búsqueda en contenedores</h3>
              <p className="text-body text-on-surface-variant">
                Búsquedas en cajas, contenedores o recipientes dispuestos en un área. El perro debe identificar el contenedor que
                contiene el olor objetivo.
              </p>
            </div>
          </div>
        </section>

        <section id="puntuacion" className={sectionCard}>
          <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-6">3. Sistema de puntuación</h2>
          <div className="space-y-8 text-on-surface-variant">
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Criterios de evaluación</h3>
              <p className="text-body mb-4">
                La evaluación incluye: sistemática de búsqueda, focalización en el olor objetivo e intensidad de la indicación,
                más la impresión general. Los organizadores pueden anunciar coeficientes ajustables para cada criterio.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Marca mínima</h3>
              <p className="text-body">
                La marca mínima que el perro debe mantener sobre el olor para que se considere indicación válida es de{" "}
                <strong className="text-on-surface">3 segundos</strong>.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Puntuación por búsqueda</h3>
              <p className="text-body mb-4">
                Cada búsqueda se puntúa según localización correcta, tiempo y precisión. Se aplican penalizaciones por falsos
                positivos, exceso de tiempo, ayuda excesiva del guía (según el nivel) y comportamiento inadecuado. Cada tipo de
                búsqueda y nivel tiene un tiempo límite específico desde que el perro entra en el área hasta que finaliza o se
                agota el tiempo.
              </p>
            </div>
          </div>
        </section>

        <section id="titulos" className={sectionCard}>
          <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-6">4. Títulos y reconocimientos</h2>
          <div className="space-y-6 text-on-surface-variant">
            <p className="text-body text-on-surface">
              Los títulos se otorgan según el rendimiento del perro en las pruebas. Cada nivel (Base y Avanzado) tiene sus propios
              títulos y requisitos, detallados en el reglamento completo en PDF.
            </p>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Reconocimientos</h3>
              <p className="text-body">
                En Nosework Trial no hay pódiums tradicionales. Sí se otorgan reconocimientos alternativos a los participantes
                según su actuación y los criterios establecidos en el reglamento.
              </p>
            </div>
          </div>
        </section>

        <section id="codigo-etico" className={sectionCard}>
          <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-6">5. Código ético y bienestar del perro</h2>
          <div className="space-y-6 text-on-surface-variant">
            <div className="border-l-4 border-primary bg-surface-container-highest p-6 rounded-r-lg">
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Prioridad: el bienestar del perro</h3>
              <p className="text-body mb-4">
                El bienestar del perro es la máxima prioridad. Todos los participantes deben respetar el ritmo y las capacidades de
                su perro, no forzarlo si muestra estrés o incomodidad, proporcionar descansos adecuados y usar métodos de
                entrenamiento positivos. Los perros con problemas de comportamiento pueden participar, avisando previamente al
                organizador.
              </p>
            </div>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Comportamiento del guía</h3>
              <ul className="list-disc list-inside space-y-2 ml-4 text-body text-on-surface">
                <li>Respeto hacia otros participantes, jueces y staff</li>
                <li>Honestidad y aceptación de las decisiones de los jueces</li>
                <li>Colaboración y espíritu deportivo</li>
              </ul>
            </div>
            <div>
              <h3 className="font-montserrat text-xl font-bold text-primary mb-4">Sanciones y ayudantes</h3>
              <p className="text-body">
                El juez u organizador puede sancionar (por ejemplo, suspensión de 6 meses) en caso de incumplimiento del código
                ético. El juez u organizador puede contar con ayudantes en el desarrollo de las pruebas.
              </p>
            </div>
          </div>
        </section>

        <section className={sectionCard} aria-label="Versión del reglamento">
          <p className="text-body text-on-surface-variant">
            Reglamento vigente: <strong className="text-on-surface">{REGLEMENTO_VERSION}</strong> ({REGLEMENTO_DATE}). Las
            actualizaciones se publicarán en esta página.
          </p>
        </section>

        <section className="rounded-xl border border-outline-variant bg-surface-container-highest py-10 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-montserrat text-headline-h2 font-bold text-primary mb-4">¿Dudas sobre el reglamento?</h2>
            <p className="text-body text-on-surface-variant mb-8">
              Si necesitas aclaraciones sobre cualquier aspecto del reglamento, contacta con nosotros.
            </p>
            <Button href={localizedHref("/contact")} variant="primary">
              Contactar
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
