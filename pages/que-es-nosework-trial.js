import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SEOHead from "@/components/SEOHead";

export default function QueEsNoseworkTrial() {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            {/* SEO */}
            <SEOHead
                title="Qué es Nosework Trial – Nosework deportivo para todos los perros"
                description="Conoce en detalle qué es Nosework Trial, cómo funciona el nosework deportivo, qué tipos de pruebas hay y qué perros pueden practicar este deporte de olfato."
                canonical="/que-es-nosework-trial"
                ogImage="/images/og-image.jpg"
                additionalMeta={{
                    keywords:
                        "qué es nosework deportivo, deporte olfato canino, nosework trial, detección deportiva perros",
                }}
            />

            {/* Schema.org */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": "Qué es Nosework Trial",
                        "description": "Conoce en detalle qué es Nosework Trial, cómo funciona el nosework deportivo",
                        "author": {
                            "@type": "Organization",
                            "name": "Nosework Trial Community"
                        },
                        "publisher": {
                            "@type": "Organization",
                            "name": "Nosework Trial Community"
                        }
                    })
                }}
            />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16 md:py-20 text-center">
                <div className="container-custom">
                    <h1 className="text-h1 font-bold mb-4">Qué es Nosework Trial</h1>
                    <p className="text-xl md:text-2xl text-primary-50">El deporte de olfato canino para todos los perros</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="section">
                <div className="container-custom space-y-12">
                    {/* Introducción */}
                    <section className="card text-center max-w-4xl mx-auto">
                        <h2 className="text-h2 font-bold mb-6">¿Qué es Nosework Trial?</h2>
                        <p className="text-lg text-gray-700 mb-4">
                            Nosework Trial es una modalidad deportiva que combina la detección deportiva y el nosework tradicional,
                            creando un deporte inclusivo y accesible para todos los perros y sus guías. A diferencia de otras modalidades,
                            Nosework Trial se centra en el disfrute, el aprendizaje y el bienestar del perro.
                        </p>
                        <p className="text-body-lg text-gray-700">
                            Este deporte permite que perros de todas las razas, edades y niveles de experiencia puedan participar y
                            desarrollar sus habilidades olfativas de forma estructurada y divertida.
                        </p>
                    </section>

                    {/* Historia */}
                    <section className="card">
                        <h2 className="text-h2 font-bold mb-6">Historia de la Disciplina</h2>
                        <div className="space-y-4 text-gray-700">
                            <p className="text-body-lg">
                                Nosework Trial nace de la inspiración en dos disciplinas principales:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                <li>
                                    <strong>Detección Deportiva (FEPDE):</strong> La estructura competitiva y el formato de pruebas de la
                                    detección deportiva española.
                                </li>
                                <li>
                                    <strong>Nosework Tradicional:</strong> El enfoque en el bienestar del perro y la accesibilidad para
                                    todos los perros, sin importar su raza o edad.
                                </li>
                            </ul>
                            <p className="text-body-lg">
                                La combinación de estos enfoques ha dado lugar a una modalidad única que prioriza el aprendizaje, la
                                inclusión y el disfrute tanto del perro como del guía.
                            </p>
                        </div>
                    </section>

                    {/* Beneficios */}
                    <section className="card">
                        <h2 className="text-h2 font-bold mb-8">Beneficios del Nosework Trial</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-h3 font-bold mb-6 text-primary-600">Para el Perro</h3>
                                <ul className="space-y-4 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-primary-500 mr-3 text-xl">✓</span>
                                        <span className="text-body"><strong>Desarrollo de confianza:</strong> Mejora la autoestima y seguridad del perro</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Trabajo mental:</strong> Ejercita la mente y reduce el estrés</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Ejercicio físico:</strong> Actividad física adaptada a cada perro</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Para todas las razas y edades:</strong> No hay limitaciones</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Fomenta la calma:</strong> El trabajo de olfato es naturalmente relajante</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4 text-green-600">Para el Guía</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Vínculo con el perro:</strong> Fortalece la relación y comunicación</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Actividad compartida:</strong> Disfruta de un deporte junto a tu perro</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Comunidad:</strong> Conoce a otros apasionados del nosework</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Aprendizaje continuo:</strong> Siempre hay algo nuevo que aprender</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        <span><strong>Accesible:</strong> No requiere experiencia previa</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Estructura del Deporte */}
                    <section className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6">Estructura del Deporte</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-green-600">Niveles / Grados</h3>
                                <p className="text-gray-700 mb-3">
                                    Nosework Trial se estructura en diferentes niveles que permiten una progresión gradual:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                                    <li><strong>Grado 1:</strong> Nivel inicial, ideal para principiantes</li>
                                    <li><strong>Grado 2:</strong> Nivel intermedio, con mayor complejidad</li>
                                    <li><strong>Grado 3:</strong> Nivel avanzado, para perros experimentados</li>
                                    <li><strong>Grados superiores:</strong> Niveles de élite y especialización</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-green-600">Tipos de Búsqueda</h3>
                                <p className="text-gray-700 mb-3">
                                    Las pruebas pueden incluir diferentes tipos de búsqueda:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                                    <li><strong>Interior:</strong> Búsquedas en espacios cerrados</li>
                                    <li><strong>Exterior:</strong> Búsquedas al aire libre</li>
                                    <li><strong>Vehículos:</strong> Búsquedas en vehículos</li>
                                    <li><strong>Contenedores:</strong> Búsquedas en contenedores y cajas</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-3 text-green-600">Categorías</h3>
                                <p className="text-gray-700">
                                    Las competiciones pueden organizarse por categorías según la experiencia, edad del perro u otros
                                    criterios definidos en el reglamento.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Diferencias con Otras Modalidades */}
                    <section className="bg-white rounded-lg shadow-lg p-8">
                        <h2 className="text-3xl font-bold mb-6">Diferencias con Otras Modalidades</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="text-xl font-bold mb-2">vs. Detección Deportiva FEPDE</h3>
                                <p className="text-gray-700">
                                    Mientras que la detección deportiva FEPDE se centra en la competición y el rendimiento, Nosework Trial
                                    prioriza el aprendizaje, la inclusión y el bienestar del perro, manteniendo un formato estructurado pero
                                    más accesible.
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="text-xl font-bold mb-2">vs. Nosework Clásico</h3>
                                <p className="text-gray-700">
                                    A diferencia del nosework clásico que es principalmente recreativo, Nosework Trial ofrece una estructura
                                    competitiva con niveles, títulos y un sistema de puntuación, mientras mantiene el enfoque en el disfrute.
                                </p>
                            </div>
                            <div className="border-l-4 border-green-500 pl-4">
                                <h3 className="text-xl font-bold mb-2">vs. AKC Scent Work / NACSW</h3>
                                <p className="text-gray-700">
                                    Nosework Trial adapta los conceptos de estas modalidades internacionales al contexto español, con un
                                    reglamento propio y una estructura que se ajusta a la realidad de los clubs y guías españoles.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="section-alt">
                        <div className="container-custom">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-h2 font-bold mb-4 text-gray-900">¿Quieres Empezar?</h2>
                                <p className="text-body-lg text-gray-700 mb-8">
                                    Descubre cómo puedes comenzar tu camino en Nosework Trial con tu perro.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button href="/como-empezar" variant="primary">
                                        Guía para Principiantes
                                    </Button>
                                    <Button href="/reglamento" variant="secondary">
                                        Ver Reglamento
                                    </Button>
                                </div>
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

