import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Join() {

    return (
        <div className="bg-[#F4F6F8] min-h-screen pt-20">
            <SEOHead
                title="Participa - Nosework Trial Community"
                description="Descubre cómo unirte a la Nosework Trial Community. Guía paso a paso, FAQs y contacto directo con organizadores."
                canonical="/join"
                ogImage="/images/join-og.jpg"
                additionalMeta={{
                    keywords:
                        "detección canina, nosework eventos, pruebas caninas España, cómo participar en nosework",
                }}
            />

            <Navbar />

            <header className="bg-navy text-white py-16 md:py-20 text-center">
                <div className="container-redesign">
                    <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Participa en NTC</h1>
                    <p className="text-xl md:text-2xl text-white/90">
                        Cómo unirte y participar en nuestras actividades
                    </p>
                </div>
            </header>

            <main>
                <div className="container-redesign py-12 space-y-12">
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6 text-center">Guía paso a paso</h2>
                        <p className="text-body-redesign-lg text-neutral-text-medium text-center mb-8">
                            Sigue estos pasos para unirte a la Nosework Trial Community y participar en nuestras actividades.
                        </p>
                        <ol className="list-decimal space-y-4 pl-8 text-body-redesign text-neutral-text-medium">
                            <li>Regístrate como miembro en nuestra plataforma.</li>
                            <li>Consulta los eventos y pruebas disponibles en el calendario.</li>
                            <li>Inscribe a tu perro en el evento adecuado según su nivel y habilidades.</li>
                            <li>Prepárate con nuestro material de apoyo y guías descargables.</li>
                            <li>¡Participa y diviértete aprendiendo junto a tu perro!</li>
                        </ol>
                    </section>

                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6 text-center">Preguntas frecuentes</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-h3-redesign font-bold text-navy mb-2">¿Cómo participar en pruebas?</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Inscríbete en las pruebas disponibles a través de nuestro calendario y sigue las instrucciones de registro.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold text-navy mb-2">¿Qué requisitos hay para los perros?</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Los perros deben tener una edad mínima de 6 meses y estar en buen estado de salud. Algunos eventos pueden requerir pruebas específicas.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-h3-redesign font-bold text-navy mb-2">¿Cómo puedo proponer un evento?</h3>
                                <p className="text-body-redesign text-neutral-text-medium">
                                    Contacta con un organizador a través del botón de contacto. Estaremos encantados de colaborar contigo.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="text-center">
                        <a
                            href="https://wa.me/123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-3 bg-gold hover:bg-gold-hover text-navy font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                        >
                            Únete a nuestro grupo de WhatsApp
                        </a>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
