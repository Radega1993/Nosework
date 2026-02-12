import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Normativas() {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            {/* SEO */}
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

            {/* Navbar */}
            <Navbar />

            {/* Contenido Principal */}
            <main className="p-6 space-y-12">
                {/* Resumen Visual */}
                <section className="bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-4xl font-bold text-center mb-4">Normativas</h1>
                    <p className="text-lg text-gray-600 text-center mb-8">
                        Conoce las reglas y criterios de evaluación que garantizan la transparencia y la equidad en nuestros eventos.
                    </p>
                    <ul className="space-y-4 list-disc pl-8">
                        <li>Todos los participantes deben cumplir con las normativas específicas del evento.</li>
                        <li>Los perros deben estar siempre bajo el control de su guía.</li>
                        <li>El respeto entre guías, jueces y organizadores es obligatorio.</li>
                        <li>Los criterios de evaluación se basan en precisión, tiempo y comportamiento del perro.</li>
                    </ul>
                </section>

                {/* Documentos Descargables */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-4">Documentos Descargables</h2>
                    <ul className="space-y-4">
                        <li>
                            <a
                                href="/documents/normativas_participantes.pdf"
                                className="text-blue-500 hover:underline"
                                download
                            >
                                Normativas para Participantes
                            </a>
                        </li>
                        <li>
                            <a
                                href="/documents/normativas_organizadores.pdf"
                                className="text-blue-500 hover:underline"
                                download
                            >
                                Guía para Organizadores
                            </a>
                        </li>
                    </ul>
                </section>

                {/* FAQs */}
                <section className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold">¿Qué pasa si mi perro no cumple con los criterios?</h3>
                            <p className="text-gray-600">
                                Si tu perro no cumple con los criterios de un evento específico, puedes optar por inscribirlo en otra
                                categoría o recibir asesoramiento.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">¿Qué sucede si no puedo asistir después de registrarme?</h3>
                            <p className="text-gray-600">
                                Puedes cancelar tu inscripción con un aviso previo de 72 horas. Revisa nuestras políticas para más
                                detalles.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
