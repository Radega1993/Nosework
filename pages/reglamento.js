import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function Reglamento() {
    return (
        <div className="bg-gray-50 min-h-screen pt-16">
            {/* SEO */}
            <Head>
                <title>Reglamento Nosework Trial – Normativa oficial 2025</title>
                <meta
                    name="description"
                    content="Consulta el reglamento oficial de Nosework Trial. Normativa completa, niveles, tipos de búsqueda, sistema de puntuación y código ético."
                />
                <meta
                    name="keywords"
                    content="reglamento nosework, reglamento detección deportiva perros, normativa nosework trial, reglamento oficial"
                />
                <meta property="og:title" content="Reglamento Nosework Trial – Normativa oficial" />
                <meta
                    property="og:description"
                    content="Consulta el reglamento oficial completo de Nosework Trial con toda la normativa, niveles y sistema de puntuación."
                />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://www.noseworktrialcommunity.com/reglamento" />
            </Head>

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-16 md:py-20 text-center">
                <div className="container-custom">
                    <h1 className="text-h1 font-bold mb-4">Reglamento Oficial</h1>
                    <p className="text-xl md:text-2xl text-secondary-50">Normativa completa de Nosework Trial</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="section">
                <div className="container-custom space-y-8">
                    {/* Descarga PDF */}
                    <section className="card text-center max-w-3xl mx-auto">
                        <h2 className="text-h2 font-bold mb-4">Descarga el Reglamento Completo</h2>
                        <p className="text-body-lg text-gray-700 mb-6">
                            Descarga el reglamento oficial en formato PDF para consulta offline.
                        </p>
                        <a
                            href="/documents/normativas_participantes.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary inline-block"
                        >
                            📄 Descargar PDF del Reglamento
                        </a>
                    </section>

                    {/* Navegación por Secciones */}
                    <section className="card">
                        <h2 className="text-h2 font-bold mb-6">Índice del Reglamento</h2>
                        <nav className="space-y-3">
                            <a href="#niveles" className="block text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 p-3 rounded-lg transition-colors text-body-lg font-medium">
                                1. Niveles y Grados
                            </a>
                            <a href="#tipos-busqueda" className="block text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 p-3 rounded-lg transition-colors text-body-lg font-medium">
                                2. Tipos de Búsqueda
                            </a>
                            <a href="#puntuacion" className="block text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 p-3 rounded-lg transition-colors text-body-lg font-medium">
                                3. Sistema de Puntuación
                            </a>
                            <a href="#titulos" className="block text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 p-3 rounded-lg transition-colors text-body-lg font-medium">
                                4. Títulos y Certificaciones
                            </a>
                            <a href="#codigo-etico" className="block text-secondary-600 hover:text-secondary-700 hover:bg-secondary-50 p-3 rounded-lg transition-colors text-body-lg font-medium">
                                5. Código Ético y Bienestar del Perro
                            </a>
                        </nav>
                    </section>

                    {/* Sección 1: Niveles y Grados */}
                    <section id="niveles" className="card scroll-mt-20">
                        <h2 className="text-h2 font-bold mb-6">1. Niveles y Grados</h2>
                        <div className="space-y-8 text-gray-700">
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Grado 1 - Nivel Inicial</h3>
                                <p className="text-body mb-3">
                                    El Grado 1 está diseñado para perros y guías que se inician en Nosework Trial. En este nivel:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Las búsquedas son más simples y con menos distracciones</li>
                                    <li>El tiempo límite es más amplio</li>
                                    <li>Se permite más guía y apoyo del handler</li>
                                    <li>El objetivo es la familiarización con el formato de prueba</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Grado 2 - Nivel Intermedio</h3>
                                <p className="text-body mb-3">
                                    El Grado 2 aumenta la complejidad y requiere mayor precisión:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Mayor número de distracciones</li>
                                    <li>Áreas de búsqueda más grandes</li>
                                    <li>Tiempo límite más estricto</li>
                                    <li>Mayor independencia del perro</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Grado 3 - Nivel Avanzado</h3>
                                <p className="text-body mb-3">
                                    El Grado 3 es para perros experimentados:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Máxima complejidad en las búsquedas</li>
                                    <li>Múltiples olores objetivo</li>
                                    <li>Ambientes desafiantes</li>
                                    <li>Alto nivel de precisión requerido</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Progresión entre Niveles</h3>
                                <p className="text-body">
                                    Para avanzar de un grado al siguiente, el perro debe obtener un número determinado de títulos o
                                    certificaciones en el grado actual, según se especifica en el reglamento completo.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 2: Tipos de Búsqueda */}
                    <section id="tipos-busqueda" className="card scroll-mt-20">
                        <h2 className="text-h2 font-bold mb-6">2. Tipos de Búsqueda</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Interior</h3>
                                <p className="text-body text-gray-700">
                                    Búsquedas realizadas en espacios cerrados como salas, habitaciones o edificios. El perro debe localizar
                                    el olor objetivo entre distracciones y en diferentes alturas.
                                </p>
                            </div>
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Exterior</h3>
                                <p className="text-body text-gray-700">
                                    Búsquedas al aire libre en áreas abiertas, parques o terrenos. Las condiciones ambientales y el viento
                                    añaden complejidad a estas búsquedas.
                                </p>
                            </div>
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Vehículos</h3>
                                <p className="text-body text-gray-700">
                                    El perro debe buscar el olor objetivo en vehículos estacionados. Se evalúa la precisión y la
                                    independencia del perro.
                                </p>
                            </div>
                            <div className="border-l-4 border-secondary-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Búsqueda en Contenedores</h3>
                                <p className="text-body text-gray-700">
                                    Búsquedas en cajas, contenedores o recipientes dispuestos en un área. El perro debe identificar el
                                    contenedor que contiene el olor objetivo.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 3: Sistema de Puntuación */}
                    <section id="puntuacion" className="card scroll-mt-20">
                        <h2 className="text-h2 font-bold mb-6">3. Sistema de Puntuación</h2>
                        <div className="space-y-8 text-gray-700">
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Puntuación por Búsqueda</h3>
                                <p className="text-body mb-4">
                                    Cada búsqueda se puntúa según los siguientes criterios:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li><strong>Localización correcta:</strong> Puntos completos si el perro identifica correctamente el olor objetivo</li>
                                    <li><strong>Tiempo:</strong> Bonificaciones por rapidez (según el nivel)</li>
                                    <li><strong>Precisión:</strong> Puntos adicionales por indicación clara y precisa</li>
                                    <li><strong>Independencia:</strong> Evaluación de la autonomía del perro</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Penalizaciones</h3>
                                <p className="text-body mb-4">
                                    Se aplican penalizaciones por:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Falsos positivos (indicar olor donde no hay)</li>
                                    <li>Exceso de tiempo</li>
                                    <li>Ayuda excesiva del guía (según el nivel)</li>
                                    <li>Comportamiento inadecuado</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Tiempos Límite</h3>
                                <p className="text-body">
                                    Cada tipo de búsqueda y nivel tiene un tiempo límite específico. El tiempo se cuenta desde que el perro
                                    entra en el área de búsqueda hasta que completa la tarea o se agota el tiempo.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 4: Títulos y Certificaciones */}
                    <section id="titulos" className="card scroll-mt-20">
                        <h2 className="text-h2 font-bold mb-6">4. Títulos y Certificaciones</h2>
                        <div className="space-y-6 text-gray-700">
                            <p className="text-body-lg">
                                Los títulos se otorgan según el rendimiento del perro en las competiciones. Cada grado tiene sus propios
                                títulos y requisitos específicos.
                            </p>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Tipos de Títulos</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li><strong>Título de Grado:</strong> Obtenido al completar exitosamente pruebas en un grado específico</li>
                                    <li><strong>Título de Especialidad:</strong> Por destacar en un tipo de búsqueda específico</li>
                                    <li><strong>Título de Campeón:</strong> Para perros que han demostrado excelencia en múltiples niveles</li>
                                </ul>
                            </div>
                            <p className="text-body">
                                Los requisitos específicos para cada título se detallan en el reglamento completo en PDF.
                            </p>
                        </div>
                    </section>

                    {/* Sección 5: Código Ético */}
                    <section id="codigo-etico" className="card scroll-mt-20">
                        <h2 className="text-h2 font-bold mb-6">5. Código Ético y Bienestar del Perro</h2>
                        <div className="space-y-6 text-gray-700">
                            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg">
                                <h3 className="text-h4 font-bold mb-4 text-primary-700">Prioridad: El Bienestar del Perro</h3>
                                <p className="text-body mb-4">
                                    El bienestar del perro es la máxima prioridad en Nosework Trial. Todos los participantes deben:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Respetar el ritmo y las capacidades de su perro</li>
                                    <li>No forzar al perro a participar si muestra signos de estrés o incomodidad</li>
                                    <li>Proporcionar descansos adecuados</li>
                                    <li>Mantener al perro en condiciones óptimas de salud</li>
                                    <li>Usar métodos de entrenamiento positivos y respetuosos</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Comportamiento del Guía</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                    <li>Respeto hacia otros participantes, jueces y staff</li>
                                    <li>Honestidad en la competición</li>
                                    <li>Aceptación de las decisiones de los jueces</li>
                                    <li>Colaboración y espíritu deportivo</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3 font-bold mb-4 text-secondary-600">Sanciones</h3>
                                <p className="text-body">
                                    El incumplimiento del código ético puede resultar en advertencias, descalificación o suspensión,
                                    dependiendo de la gravedad de la infracción.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Histórico de Versiones */}
                    <section className="card">
                        <h2 className="text-h2 font-bold mb-6">Histórico de Versiones</h2>
                        <div className="space-y-4 text-gray-700">
                            <div className="border-l-4 border-gray-300 pl-4">
                                <h3 className="text-h5 font-bold">Versión 1.0 - 2025</h3>
                                <p className="text-body-sm text-gray-600">Versión inicial del reglamento</p>
                            </div>
                            <p className="text-body-sm text-gray-600 italic">
                                Las actualizaciones del reglamento se publicarán aquí y se notificarán a todos los participantes.
                            </p>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="section-alt">
                        <div className="container-custom">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-h2 font-bold mb-4 text-gray-900">¿Tienes Preguntas sobre el Reglamento?</h2>
                                <p className="text-body-lg text-gray-700 mb-8">
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

