import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Normativas() {
    return (
        <div className="bg-[#F4F6F8] min-h-screen pt-20">
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

            <Navbar />

            <header className="bg-navy text-white py-16 md:py-20 text-center">
                <div className="container-redesign">
                    <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Normativas</h1>
                    <p className="text-xl md:text-2xl text-white/90">
                        Reglas y criterios de evaluación de Nosework Trial
                    </p>
                </div>
            </header>

            <main>
                <div className="container-redesign py-12 space-y-12">
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6 text-center">Conoce las normativas</h2>
                        <p className="text-body-redesign-lg text-neutral-text-medium text-center mb-8">
                            Conoce las reglas y criterios de evaluación que garantizan la transparencia y la equidad en nuestros eventos.
                        </p>
                        <ul className="space-y-4 list-disc pl-8 text-body-redesign text-neutral-text-medium">
                            <li>Todos los participantes deben cumplir con las normativas específicas del evento.</li>
                            <li>Los perros deben estar siempre bajo el control de su guía.</li>
                            <li>El respeto entre guías, jueces y organizadores es obligatorio.</li>
                            <li>Los criterios de evaluación se basan en precisión, tiempo y comportamiento del perro.</li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6 text-center">Documentos descargables</h2>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="/documents/normativas_participantes.pdf"
                                    className="text-navy hover:text-gold font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                                    download
                                >
                                    Normativas para Participantes
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/documents/normativas_organizadores.pdf"
                                    className="text-navy hover:text-gold font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                                    download
                                >
                                    Guía para Organizadores
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6 text-center">Preguntas frecuentes</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-h3-redesign font-bold text-navy mb-2">¿Qué pasa si mi perro no cumple con los criterios?</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Si tu perro no cumple con los criterios de un evento específico, puedes optar por inscribirlo en otra categoría o recibir asesoramiento.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold text-navy mb-2">¿Qué sucede si no puedo asistir después de registrarme?</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Puedes cancelar tu inscripción con un aviso previo de 72 horas. Revisa nuestras políticas para más detalles.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
