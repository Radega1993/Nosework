import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SEOHead from "@/components/SEOHead";

export default function ComoEmpezar() {
    return (
        <div className="bg-[#F4F6F8] min-h-screen pt-20">
            {/* SEO */}
            <SEOHead
                title="Cómo Empezar en Nosework Trial – Guía para Principiantes 2025"
                description="Guía completa para empezar en Nosework Trial. Requisitos, material necesario, cómo encontrar un club y preparar a tu perro para su primera competición."
                canonical="/como-empezar"
                ogImage="/images/og-image.jpg"
                additionalMeta={{
                    keywords:
                        "cómo empezar nosework, cómo iniciar detección deportiva con mi perro, guía nosework trial, empezar nosework",
                }}
            />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="bg-navy text-white py-16 md:py-20 text-center">
                <div className="container-redesign">
                    <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Cómo Empezar en Nosework Trial</h1>
                    <p className="text-xl md:text-2xl text-white/90">Guía paso a paso para principiantes</p>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <div className="container-redesign py-12 space-y-12">
                    {/* Introducción */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 text-center max-w-4xl mx-auto">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">¡Bienvenido a Nosework Trial!</h2>
                        <p className="text-body-redesign-lg text-neutral-text-medium">
                            Si eres nuevo en Nosework Trial, esta guía te ayudará a dar los primeros pasos con tu perro. No necesitas
                            experiencia previa, solo ganas de aprender y disfrutar junto a tu compañero canino.
                        </p>
                    </section>

                    {/* Paso a Paso */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-8">Guía Paso a Paso</h2>
                        <div className="space-y-8">
                            {/* Paso 1 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-h3-redesign font-bold text-navy mb-3">Entender qué es Nosework Trial</h3>
                                    <p className="text-body-redesign text-neutral-text-medium mb-3">
                                        Antes de empezar, es importante que comprendas en qué consiste este deporte. Nosework Trial es una
                                        modalidad que combina detección deportiva y nosework, centrada en el bienestar del perro y la
                                        inclusión.
                                    </p>
                                    <Link href="/que-es-nosework-trial" className="text-accent-600 hover:text-accent-700 font-semibold inline-flex items-center">
                                        → Aprende más sobre Nosework Trial
                                    </Link>
                                </div>
                            </div>

                            {/* Paso 2 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                                        2
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-h3-redesign font-bold text-navy mb-3">Encontrar un Club o Instructor</h3>
                                    <p className="text-body-redesign text-neutral-text-medium mb-3">
                                        Lo ideal es empezar con un club o instructor certificado que te guíe en los primeros pasos. Un buen
                                        instructor te ayudará a entender las técnicas básicas y a preparar correctamente a tu perro.
                                    </p>
                                    <Link href="/clubs" className="text-accent-600 hover:text-accent-700 font-semibold inline-flex items-center">
                                        → Buscar clubs cerca de ti
                                    </Link>
                                </div>
                            </div>

                            {/* Paso 3 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                                        3
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-h3-redesign font-bold text-navy mb-3">Conseguir el Material Básico</h3>
                                    <p className="text-body-redesign text-neutral-text-medium mb-3">
                                        Para empezar necesitarás material básico. No es necesario invertir mucho al principio, pero algunos
                                        elementos esenciales te ayudarán a entrenar correctamente.
                                    </p>
                                    <a href="#material" className="text-accent-600 hover:text-accent-700 font-semibold inline-flex items-center">
                                        → Ver material necesario más abajo
                                    </a>
                                </div>
                            </div>

                            {/* Paso 4 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                                        4
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-h3-redesign font-bold text-navy mb-3">Empezar con Entrenamientos Básicos</h3>
                                    <p className="text-body-redesign text-neutral-text-medium mb-3">
                                        Comienza con ejercicios simples en casa o en tu club. El objetivo es que tu perro se familiarice con
                                        el trabajo de olfato y que ambos disfrutéis del proceso. No hay prisa, cada perro tiene su ritmo.
                                    </p>
                                    <p className="text-body-sm text-gray-600 italic">
                                        Consejo: Empieza con ejercicios muy simples y aumenta la dificultad gradualmente.
                                    </p>
                                </div>
                            </div>

                            {/* Paso 5 */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-accent-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
                                        5
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-h3-redesign font-bold text-navy mb-3">Participar en tu Primera Competición</h3>
                                    <p className="text-body-redesign text-neutral-text-medium mb-3">
                                        Cuando te sientas preparado, puedes inscribirte en una prueba de Grado 1. No te preocupes por el
                                        resultado, el objetivo es disfrutar y aprender. Todas las competiciones son una oportunidad de
                                        crecimiento.
                                    </p>
                                    <Link href="/events" className="text-accent-600 hover:text-accent-700 font-semibold inline-flex items-center">
                                        → Ver calendario de eventos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Requisitos Mínimos */}
                    <section id="requisitos" className="card">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Requisitos Mínimos para Competir</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-h3-redesign font-bold text-navy mb-4">Para el Perro</h3>
                                <ul className="space-y-3 text-neutral-text-medium">
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Edad mínima: 6 meses (recomendado 1 año)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Vacunaciones al día</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Estado de salud adecuado</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Comportamiento básico controlado</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">No hay restricciones de raza o tamaño</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold text-navy mb-4">Para el Guía</h3>
                                <ul className="space-y-3 text-neutral-text-medium">
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Mayor de edad (o con autorización)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Compromiso con el bienestar del perro</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Conocimiento básico del reglamento</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">Actitud positiva y respetuosa</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-accent-500 mr-3 text-xl">✓</span>
                                        <span className="text-body-redesign">No se requiere experiencia previa</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Material Básico */}
                    <section id="material" className="card">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Material Básico Necesario</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="border-l-4 border-accent-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Esencial</h3>
                                <ul className="space-y-2 text-body-redesign text-neutral-text-medium">
                                    <li>• <strong>Arnés:</strong> Arnés cómodo para el perro (no collar)</li>
                                    <li>• <strong>Correa:</strong> Correa de 1-2 metros</li>
                                    <li>• <strong>Recompensas:</strong> Premios de alto valor para tu perro</li>
                                    <li>• <strong>Contenedores:</strong> Cajas o recipientes para ejercicios</li>
                                </ul>
                            </div>
                            <div className="border-l-4 border-accent-500 pl-4">
                                <h3 className="text-h4 font-bold mb-2">Recomendado</h3>
                                <ul className="space-y-2 text-body-redesign text-neutral-text-medium">
                                    <li>• <strong>Olor objetivo:</strong> Aceites esenciales o materiales de olor</li>
                                    <li>• <strong>Bolsas de entrenamiento:</strong> Para transportar material</li>
                                    <li>• <strong>Cuaderno:</strong> Para anotar progresos</li>
                                    <li>• <strong>Ropa cómoda:</strong> Para entrenamientos y competiciones</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-6 p-4 bg-accent-50 rounded-lg">
                            <p className="text-body-redesign text-neutral-text-medium">
                                <strong>Nota:</strong> No necesitas comprar todo de inmediato. Muchos clubs proporcionan material para
                                empezar. Consulta con tu instructor qué es realmente necesario al principio.
                            </p>
                        </div>
                    </section>

                    {/* Cómo Encontrar Club */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Cómo Encontrar un Club o Entrenador</h2>
                        <div className="space-y-4 text-neutral-text-medium">
                            <p className="text-body-lg">
                                Encontrar un buen club o instructor es fundamental para empezar bien. Te recomendamos:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 text-body">
                                <li>Buscar clubs adheridos a Nosework Trial en nuestra sección de clubs</li>
                                <li>Consultar con otros participantes en eventos o redes sociales</li>
                                <li>Asistir a demostraciones o eventos abiertos</li>
                                <li>Verificar que el instructor tenga formación adecuada</li>
                                <li>Visitar el club antes de comprometerte para ver el ambiente</li>
                            </ul>
                            <div className="mt-6">
                                <Button href="/clubs" variant="accent">
                                    Ver Listado de Clubs
                                </Button>
                            </div>
                        </div>
                    </section>

                    {/* FAQ */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Preguntas Frecuentes</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-h4 font-bold mb-2 text-accent-600">
                                    ¿Mi perro puede participar si es muy mayor o muy joven?
                                </h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Sí, Nosework Trial es para perros de todas las edades. Los perros mayores pueden participar sin
                                    problemas, y los cachorros pueden empezar desde los 6 meses (aunque se recomienda esperar al año para
                                    competiciones).
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h4 font-bold mb-2 text-accent-600">
                                    ¿Necesito experiencia previa en deportes caninos?
                                </h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    No, no necesitas experiencia previa. Nosework Trial está diseñado para ser accesible a todos. Muchos
                                    participantes empiezan sin ningún conocimiento previo.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h4 font-bold mb-2 text-accent-600">
                                    ¿Cuánto tiempo tarda mi perro en estar listo para competir?
                                </h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Depende de cada perro y del tiempo que dediques al entrenamiento. Algunos perros están listos en unas
                                    semanas, otros necesitan meses. Lo importante es no tener prisa y disfrutar del proceso.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h4 font-bold mb-2 text-accent-600">
                                    ¿Qué pasa si mi perro no encuentra el olor en una competición?
                                </h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    No pasa nada. Las competiciones son oportunidades de aprendizaje. No encontrar el olor es parte del
                                    proceso y te ayudará a mejorar. Lo importante es participar y disfrutar.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h4 font-bold mb-2 text-accent-600">
                                    ¿Puedo entrenar en casa sin un club?
                                </h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Sí, puedes empezar con ejercicios básicos en casa. Sin embargo, para avanzar y participar en
                                    competiciones, es muy recomendable contar con un club o instructor que te guíe.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-[#F4F6F8] py-12">
                        <div className="container-redesign">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">¿Listo para Empezar?</h2>
                                <p className="text-body-redesign-lg text-neutral-text-medium mb-8">
                                    Ahora que conoces los pasos, es momento de dar el primer paso con tu perro.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button href="/clubs" variant="accent">
                                        Buscar un Club
                                    </Button>
                                    <Button href="/reglamento" variant="secondary">
                                        Leer el Reglamento
                                    </Button>
                                    <Button href="/events" variant="primary">
                                        Ver Próximos Eventos
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

