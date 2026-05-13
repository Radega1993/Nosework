import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SEOHead from "@/components/SEOHead";

const REGLEMENTO_VERSION = "v1.0";
const REGLEMENTO_DATE = "2025-02-01";

export default function Reglamento() {
    return (
        <div className="page-shell">
            {/* SEO */}
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

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="hero-band">
                <div className="container-redesign">
                    <h1 className="text-headline-h1 md:text-display font-montserrat mb-4">Reglamento y normativa</h1>
                    <p className="text-body-lg text-white/85">Normativa completa de Nosework Trial</p>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <div className="container-redesign py-12 space-y-8">
                    {/* Descarga PDF y versionado */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-3xl mx-auto">
                        <p className="text-body-redesign text-neutral-text-medium mb-4" aria-label="Versión del reglamento">
                            Versión {REGLEMENTO_VERSION} · Fecha: {REGLEMENTO_DATE}
                        </p>
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">Descarga el Reglamento Completo</h2>
                        <p className="text-body-redesign-lg text-neutral-text-medium mb-6">
                            Descarga el reglamento oficial en formato PDF para consulta offline.
                        </p>
                        <a
                            href="/documents/normativas_participantes.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                            aria-label="Descargar reglamento en PDF"
                        >
                            📄 Descargar reglamento en PDF
                        </a>
                    </section>

                    {/* Navegación por Secciones */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Índice del Reglamento</h2>
                        <nav className="space-y-3">
                            <a href="#niveles" className="block text-navy hover:text-gold hover:bg-white/10 p-3 rounded-lg transition-colors text-body-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                                1. Niveles (Base y Avanzado)
                            </a>
                            <a href="#tipos-busqueda" className="block text-navy hover:text-gold hover:bg-white/10 p-3 rounded-lg transition-colors text-body-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                                2. Tipos de Búsqueda
                            </a>
                            <a href="#puntuacion" className="block text-navy hover:text-gold hover:bg-white/10 p-3 rounded-lg transition-colors text-body-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                                3. Sistema de Puntuación
                            </a>
                            <a href="#titulos" className="block text-navy hover:text-gold hover:bg-white/10 p-3 rounded-lg transition-colors text-body-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                                4. Títulos y Reconocimientos
                            </a>
                            <a href="#codigo-etico" className="block text-navy hover:text-gold hover:bg-white/10 p-3 rounded-lg transition-colors text-body-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2">
                                5. Código Ético y Bienestar del Perro
                            </a>
                        </nav>
                    </section>

                    {/* Sección 1: Niveles Base y Avanzado */}
                    <section id="niveles" className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 scroll-mt-20">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">1. Niveles: Base y Avanzado</h2>
                        <div className="space-y-8 text-neutral-text-medium">
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Nivel Base</h3>
                                <p className="text-body-redesign mb-3">
                                    El nivel Base está pensado para perros y guías que se inician en Nosework Trial:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Búsquedas con menor complejidad y menos distracciones</li>
                                    <li>Tiempo límite más amplio</li>
                                    <li>Familiarización con el formato de prueba y con el olor objetivo</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Nivel Avanzado</h3>
                                <p className="text-body-redesign mb-3">
                                    El nivel Avanzado exige mayor precisión y autonomía del perro:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Mayor complejidad, distracciones y áreas de búsqueda</li>
                                    <li>Tiempos y criterios más estrictos</li>
                                    <li>Puede añadirse olor de referencia además del olor base</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Olores oficiales</h3>
                                <p className="text-body-redesign mb-3">
                                    Los olores de trabajo son: Kong + aceite esencial de salvia. En nivel Avanzado el organizador puede
                                    anunciar la posibilidad de añadir un olor de referencia.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 2: Tipos de Búsqueda */}
                    <section id="tipos-busqueda" className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 scroll-mt-20">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">2. Tipos de Búsqueda</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Interior</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Búsquedas realizadas en espacios cerrados como salas, habitaciones o edificios. El perro debe localizar
                                    el olor objetivo entre distracciones y en diferentes alturas.
                                </p>
                            </div>
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Exterior</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Búsquedas al aire libre en áreas abiertas, parques o terrenos. Las condiciones ambientales y el viento
                                    añaden complejidad a estas búsquedas.
                                </p>
                            </div>
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Vehículos</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    El perro debe buscar el olor objetivo en vehículos estacionados. Se evalúa la precisión y la
                                    independencia del perro.
                                </p>
                            </div>
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Contenedores</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Búsquedas en cajas, contenedores o recipientes dispuestos en un área. El perro debe identificar el
                                    contenedor que contiene el olor objetivo.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 3: Sistema de Puntuación */}
                    <section id="puntuacion" className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 scroll-mt-20">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">3. Sistema de Puntuación</h2>
                        <div className="space-y-8 text-neutral-text-medium">
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Criterios de evaluación</h3>
                                <p className="text-body-redesign mb-4">
                                    La evaluación incluye: sistemática de búsqueda, focalización en el olor objetivo e intensidad de la indicación,
                                    más la impresión general. Los organizadores pueden anunciar coeficientes ajustables para cada criterio.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Marca mínima</h3>
                                <p className="text-body-redesign">
                                    La marca mínima que el perro debe mantener sobre el olor para que se considere indicación válida es de <strong>3 segundos</strong>.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Puntuación por búsqueda</h3>
                                <p className="text-body-redesign mb-4">
                                    Cada búsqueda se puntúa según localización correcta, tiempo y precisión. Se aplican penalizaciones por falsos positivos,
                                    exceso de tiempo, ayuda excesiva del guía (según el nivel) y comportamiento inadecuado. Cada tipo de búsqueda y nivel
                                    tiene un tiempo límite específico desde que el perro entra en el área hasta que finaliza o se agota el tiempo.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 4: Títulos y Reconocimientos */}
                    <section id="titulos" className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 scroll-mt-20">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">4. Títulos y Reconocimientos</h2>
                        <div className="space-y-6 text-neutral-text-medium">
                            <p className="text-body-lg">
                                Los títulos se otorgan según el rendimiento del perro en las pruebas. Cada nivel (Base y Avanzado) tiene sus propios
                                títulos y requisitos, detallados en el reglamento completo en PDF.
                            </p>
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Reconocimientos</h3>
                                <p className="text-body-redesign">
                                    En Nosework Trial no hay pódiums tradicionales. Sí se otorgan reconocimientos alternativos a los participantes
                                    según su actuación y los criterios establecidos en el reglamento.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 5: Código Ético y Bienestar */}
                    <section id="codigo-etico" className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 scroll-mt-20">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">5. Código Ético y Bienestar del Perro</h2>
                        <div className="space-y-6 text-neutral-text-medium">
                            <div className="border-l-4 border-navy bg-[#F4F6F8] p-6 rounded-r-lg">
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Prioridad: el bienestar del perro</h3>
                                <p className="text-body-redesign mb-4">
                                    El bienestar del perro es la máxima prioridad. Todos los participantes deben respetar el ritmo y las capacidades
                                    de su perro, no forzarlo si muestra estrés o incomodidad, proporcionar descansos adecuados y usar métodos
                                    de entrenamiento positivos. Los perros con problemas de comportamiento pueden participar, avisando previamente
                                    al organizador.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Comportamiento del guía</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Respeto hacia otros participantes, jueces y staff</li>
                                    <li>Honestidad y aceptación de las decisiones de los jueces</li>
                                    <li>Colaboración y espíritu deportivo</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Sanciones y ayudantes</h3>
                                <p className="text-body-redesign">
                                    El juez u organizador puede sancionar (por ejemplo, suspensión de 6 meses) en caso de incumplimiento del código ético.
                                    El juez u organizador puede contar con ayudantes en el desarrollo de las pruebas.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Versionado */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8" aria-label="Versión del reglamento">
                        <p className="text-body-redesign text-neutral-text-medium">
                            Reglamento vigente: <strong>{REGLEMENTO_VERSION}</strong> ({REGLEMENTO_DATE}). Las actualizaciones se publicarán en esta página.
                        </p>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-[#F4F6F8] py-12">
                        <div className="container-redesign">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">¿Tienes Preguntas sobre el Reglamento?</h2>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-8">
                                    Si necesitas aclaraciones sobre cualquier aspecto del reglamento, no dudes en contactarnos.
                                </p>
                                <Button href="/contact" variant="secondary">
                                    Contactar
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

