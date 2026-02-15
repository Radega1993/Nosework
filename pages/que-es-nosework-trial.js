import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SEOHead from "@/components/SEOHead";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";

/**
 * Página "Qué es Nosework Trial"
 * 
 * Contenido basado en las normativas oficiales:
 * @see public/documents/normativas_participantes.pdf
 * 
 * Esta página explica qué es Nosework Trial, su historia, beneficios,
 * estructura del deporte (niveles Base y Avanzado), y diferencias con otras modalidades.
 */
export default function QueEsNoseworkTrial() {
    const { localizedHref } = useLocalizedLink();
    return (
        <div className="bg-[#F4F6F8] min-h-screen pt-20">
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
            <header className="bg-navy text-white py-16 md:py-20 text-center">
                <div className="container-redesign">
                    <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Qué es Nosework Trial</h1>
                    <p className="text-xl md:text-2xl text-white/90">El deporte de olfato canino para todos los perros</p>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <div className="container-redesign py-12 space-y-12">
                    {/* Introducción */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-4xl mx-auto">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">¿Qué es Nosework Trial?</h2>
                        <p className="text-body-redesign-lg text-neutral-text-medium mb-4">
                            Nosework Trial es una modalidad deportiva que combina la detección deportiva y el nosework tradicional,
                            creando un deporte inclusivo y accesible para todos los perros y sus guías. A diferencia de otras modalidades,
                            Nosework Trial se centra en el disfrute, el aprendizaje y el bienestar del perro.
                        </p>
                        <p className="text-body-redesign text-neutral-text-medium">
                            Este deporte permite que perros de todas las razas, edades y niveles de experiencia puedan participar y
                            desarrollar sus habilidades olfativas de forma estructurada y divertida.
                        </p>
                    </section>

                    {/* Historia */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Historia de la Disciplina</h2>
                        <div className="space-y-4 text-neutral-text-medium">
                            <p className="text-body-redesign-lg">
                                Nosework Trial nace de la inspiración en dos disciplinas principales:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 text-body-redesign">
                                <li>
                                    <strong>Detección Deportiva:</strong> La estructura competitiva y el formato de pruebas de la
                                    detección deportiva española.
                                </li>
                                <li>
                                    <strong>Nosework Tradicional:</strong> El enfoque en el bienestar del perro y la accesibilidad para
                                    todos los perros, sin importar su raza o edad.
                                </li>
                            </ul>
                            <p className="text-body-redesign-lg">
                                La combinación de estos enfoques ha dado lugar a una modalidad única que prioriza el aprendizaje, la
                                inclusión y el disfrute tanto del perro como del guía.
                            </p>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Sobre la Nosework Trial Community (NTC)</h3>
                                <p className="text-body-redesign-lg mb-4">
                                    La <strong>Nosework Trial Community (NTC)</strong> es un grupo dedicado a la realización de eventos y
                                    pruebas donde la detección canina sea la protagonista, dando especial importancia a la originalidad de
                                    trabajos y parecidos a operativos, así como la inclusión de distintos perros y guías a la participación y
                                    exhibición de las cualidades de la detección.
                                </p>
                                <p className="text-body-redesign-lg mb-4">
                                    <strong>Importante:</strong> La NTC <strong>NO es ninguna asamblea, asociación ni federación</strong> o
                                    agrupación que implique una cadena de mando. Cualquier grupo de trabajo o particular que desee participar
                                    de dicha iniciativa es bienvenido.
                                </p>
                                <p className="text-body-redesign-lg mb-4">
                                    Queremos fomentar la <strong>originalidad en la recreación de escenarios y variables</strong> que ayuden a
                                    poder disfrutar y aprender de los binomios implicados, no limitándonos a un reglamento determinado más
                                    allá de unas normas básicas.
                                </p>
                                <p className="text-body-redesign-lg">
                                    Permitir que los organizadores dentro de unos mínimos tengan <strong>libertad de creación de las pruebas</strong> es
                                    uno de nuestros objetivos, así como la promoción de concursos presenciales y online, entrenamientos y
                                    jornadas variadas donde la detección sea la protagonista.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Beneficios */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-8">Beneficios del Nosework Trial</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-6 text-navy">Para el Perro</h3>
                                <ul className="space-y-4 text-neutral-text-medium">
                                    <li className="flex items-start">
                                        <span className="text-primary-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign"><strong>Desarrollo de confianza:</strong> Mejora la autoestima y seguridad del perro</span>
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
                                <h3 className="text-h3-redesign font-bold mb-6 text-navy">Para el Guía</h3>
                                <ul className="space-y-4 text-neutral-text-medium">
                                    <li className="flex items-start">
                                        <span className="text-primary-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign"><strong>Vínculo con el perro:</strong> Fortalece la relación y comunicación</span>
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
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-8">Estructura del Deporte</h2>
                        <div className="space-y-8">
                            {/* Niveles */}
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Niveles</h3>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-4">
                                    Nosework Trial se estructura en dos niveles que permiten una progresión gradual:
                                </p>
                                <div className="space-y-6">
                                    <div className="bg-primary-50 rounded-lg p-6">
                                        <h4 className="text-xl font-bold mb-3 text-primary-700">Nivel Base</h4>
                                        <p className="text-neutral-text-medium mb-3">
                                            Nivel inicial, ideal para principiantes. En este nivel:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-neutral-text-medium">
                                            <li>No se pueden usar juguetes ni comida como distractores</li>
                                            <li>El organizador debe informar qué tipo de elementos se trabajarán en este nivel</li>
                                            <li>El organizador puede proporcionar mayor o menor información según considere oportuno</li>
                                        </ul>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-6">
                                        <h4 className="text-xl font-bold mb-3 text-green-700">Nivel Avanzado</h4>
                                        <p className="text-neutral-text-medium mb-3">
                                            Nivel avanzado para perros experimentados. En este nivel:
                                        </p>
                                        <ul className="list-disc list-inside space-y-2 ml-4 text-neutral-text-medium">
                                            <li>Todo es válido siempre y cuando el organizador pueda demostrar (si se requiere) que las pruebas han sido superadas con éxito</li>
                                            <li>La demostración puede realizarse con un perro en blanco o una grabación que no genere dudas</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Olores */}
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Olores Utilizados</h3>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-3">
                                    Las búsquedas en ambos niveles utilizan:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-neutral-text-medium">
                                    <li><strong>Kong y aceite esencial de salvia:</strong> Las búsquedas abarcan intensidades mínimas y saturaciones de olor</li>
                                    <li><strong>Olor de referencia:</strong> En el nivel Avanzado se puede añadir la búsqueda por olor de referencia</li>
                                </ul>
                            </div>

                            {/* Sistema de Evaluación */}
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Sistema de Evaluación</h3>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-4">
                                    Los criterios de evaluación son:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-neutral-text-medium mb-4">
                                    <li><strong>Sistemática:</strong> Cómo el perro aborda la búsqueda de forma organizada</li>
                                    <li><strong>Focalización:</strong> El nivel de concentración y enfoque del perro en la tarea</li>
                                    <li><strong>Intensidad:</strong> La intensidad y determinación en la búsqueda</li>
                                </ul>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-3">
                                    Cada criterio tiene coeficientes que sirven para evaluar los trabajos. El organizador, con la finalidad de
                                    querer trabajar algún aspecto en concreto, puede dar mayor o menor coeficiente a algún criterio y, si es de
                                    su parecer, puede anunciarlo antes de la realización de la prueba.
                                </p>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-3">
                                    A la suma de los criterios se le añade una suma de <strong>impresión general</strong>. Si el juez/organizador
                                    lo desea, puede escribir una breve nota de observaciones en la hoja evaluativa.
                                </p>
                                <p className="text-body-redesign-lg text-neutral-text-medium">
                                    <strong>Marca mínima:</strong> Se establece un mínimo de marca de <strong>3 segundos</strong> con la finalidad
                                    de observar un mínimo de comportamiento de foco.
                                </p>
                            </div>

                            {/* Inclusividad */}
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Inclusividad y Flexibilidad</h3>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-4">
                                    Nosework Trial se caracteriza por su enfoque inclusivo y flexible:
                                </p>
                                <ul className="list-disc list-inside space-y-3 ml-4 text-neutral-text-medium">
                                    <li>
                                        <strong>Perros con problemas de comportamiento:</strong> Pueden participar perfectamente en ambos niveles
                                        notificando al organizador su condición y adaptándose a las modificaciones que éste considere oportunas.
                                    </li>
                                    <li>
                                        <strong>Reforzadores:</strong> En las pruebas se puede acceder con reforzadores ya que la filosofía de las
                                        mismas es la motivación del trabajo.
                                    </li>
                                    <li>
                                        <strong>Información sobre la sustancia:</strong> Todos los participantes que quieran podrán saber dónde está
                                        la sustancia, o nadie lo sabrá, proporcionando así una exhibición igualitaria.
                                    </li>
                                    <li>
                                        <strong>Escenarios:</strong> No hay límite de escenarios y los tiempos a realizarlos dependerán del organizador,
                                        intentando agilizar al máximo las pruebas.
                                    </li>
                                    <li>
                                        <strong>Correa:</strong> Si el participante lo desea, podrá ir con o sin correa.
                                    </li>
                                </ul>
                            </div>

                            {/* Reconocimientos */}
                            <div>
                                <h3 className="text-h3-redesign font-bold mb-4 text-navy">Reconocimientos</h3>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-3">
                                    Fomentar los distintos trabajos de una manera inclusiva es un punto de partida. No existirán los pódiums
                                    tradicionales, pero se podrán reconocer:
                                </p>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-neutral-text-medium">
                                    <li>Los mejores trabajos</li>
                                    <li>Los mejores talentos</li>
                                    <li>Los mejores debuts</li>
                                    <li>Los que tengan mayor mérito</li>
                                    <li>Luchadores</li>
                                    <li>O incluso los peores binomios</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Diferencias con Otras Modalidades */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-8">Diferencias con Otras Modalidades</h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-primary-500 pl-4">
                                <h3 className="text-xl font-bold mb-2">vs. Detección Deportiva FEPDE</h3>
                                <p className="text-neutral-text-medium">
                                    Mientras que la detección deportiva FEPDE se centra en la competición y el rendimiento, Nosework Trial
                                    prioriza el aprendizaje, la inclusión y el bienestar del perro, manteniendo un formato estructurado pero
                                    más accesible. Nosework Trial no es una federación ni asociación con cadena de mando, sino un grupo abierto
                                    donde cualquier participante es bienvenido.
                                </p>
                            </div>
                            <div className="border-l-4 border-primary-500 pl-4">
                                <h3 className="text-xl font-bold mb-2">vs. Nosework Clásico</h3>
                                <p className="text-neutral-text-medium">
                                    A diferencia del nosework clásico que es principalmente recreativo, Nosework Trial ofrece una estructura
                                    competitiva con niveles (Base y Avanzado), sistema de evaluación y reconocimientos alternativos, mientras
                                    mantiene el enfoque en el disfrute y la inclusión.
                                </p>
                            </div>
                            <div className="border-l-4 border-primary-500 pl-4">
                                <h3 className="text-xl font-bold mb-2">vs. AKC Scent Work / NACSW</h3>
                                <p className="text-neutral-text-medium">
                                    Nosework Trial adapta los conceptos de estas modalidades internacionales al contexto español, con un
                                    reglamento propio y una estructura que se ajusta a la realidad de los clubs y guías españoles. Mantiene
                                    la filosofía de inclusión y flexibilidad característica de estas modalidades.
                                </p>
                            </div>
                            <div className="bg-primary-50 rounded-lg p-6 mt-6">
                                <h3 className="text-xl font-bold mb-3 text-primary-700">Características Únicas de NTC</h3>
                                <ul className="list-disc list-inside space-y-2 ml-4 text-neutral-text-medium">
                                    <li><strong>Grupo abierto:</strong> No es una federación ni asociación con cadena de mando</li>
                                    <li><strong>Sin cuotas:</strong> Formar parte de la realización y participación de pruebas no implica ningún tipo de cuota</li>
                                    <li><strong>Uso libre del nombre y logotipo:</strong> Cualquier miembro de la NTC es libre de usar el nombre y logotipo para promover los Trials, formación, eventos o difusión de actividades relacionadas con la detección</li>
                                    <li><strong>Enfoque en inclusión y originalidad:</strong> Se fomenta la originalidad en la recreación de escenarios y la inclusión de distintos perros y guías</li>
                                    <li><strong>Libertad para organizadores:</strong> Los organizadores tienen libertad de creación de pruebas dentro de unos mínimos establecidos</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-[#F4F6F8] py-12">
                        <div className="container-redesign">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">¿Quieres Empezar?</h2>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-8">
                                    Descubre cómo puedes comenzar tu camino en Nosework Trial con tu perro.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
                                    <Button href={localizedHref("/como-empezar")} variant="primary">
                                        Guía para Principiantes
                                    </Button>
                                    <Button href={localizedHref("/reglamento")} variant="secondary">
                                        Ver Reglamento
                                    </Button>
                                    <Button href={localizedHref("/events")} variant="outline">
                                        Ver eventos
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

