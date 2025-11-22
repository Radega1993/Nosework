import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

export default function Join() {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            {/* SEO */}
            <Head>
                <title>Participa - Nosework Trial Community</title>
                <meta
                    name="description"
                    content="Descubre cómo unirte a la Nosework Trial Community. Guía paso a paso, FAQs y contacto directo con organizadores."
                />
                <meta
                    name="keywords"
                    content="detección canina, nosework eventos, pruebas caninas España, cómo participar en nosework"
                />
                <meta property="og:title" content="Participa - Nosework Trial Community" />
                <meta
                    property="og:description"
                    content="Conviértete en miembro de la Nosework Trial Community. Descubre cómo participar en eventos y pruebas de detección canina."
                />
                <meta property="og:image" content="/images/join-og.jpg" />
                <meta property="og:url" content="https://www.noseworktrialcommunity.com/join" />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            {/* Navbar */}
            <Navbar />

            {/* Contenido Principal */}
            <main className="p-6 space-y-12">
                {/* Guía Paso a Paso */}
                <section>
                    <h1 className="text-4xl font-bold text-center mb-4">Participa en NTC</h1>
                    <p className="text-lg text-gray-600 text-center mb-8">
                        Sigue estos pasos para unirte a la Nosework Trial Community y participar en nuestras actividades.
                    </p>
                    <ol className="list-decimal space-y-4 pl-8">
                        <li>Regístrate como miembro en nuestra plataforma.</li>
                        <li>Consulta los eventos y pruebas disponibles en el calendario.</li>
                        <li>Inscribe a tu perro en el evento adecuado según su nivel y habilidades.</li>
                        <li>Prepárate con nuestro material de apoyo y guías descargables.</li>
                        <li>¡Participa y diviértete aprendiendo junto a tu perro!</li>
                    </ol>
                </section>

                {/* FAQs */}
                <section>
                    <h2 className="text-3xl font-bold text-center mb-4">Preguntas Frecuentes</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-bold">¿Cómo participar en pruebas?</h3>
                            <p className="text-gray-600">
                                Inscríbete en las pruebas disponibles a través de nuestro calendario y sigue las instrucciones de registro.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">¿Qué requisitos hay para los perros?</h3>
                            <p className="text-gray-600">
                                Los perros deben tener una edad mínima de 6 meses y estar en buen estado de salud. Algunos eventos pueden requerir pruebas específicas.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">¿Cómo puedo proponer un evento?</h3>
                            <p className="text-gray-600">
                                Contacta con un organizador a través del botón de contacto. Estaremos encantados de colaborar contigo.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Botón de Contacto */}
                <section className="text-center">
                    <Button>
                        <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
                            Únete a Nuestro Grupo de WhatsApp
                        </a>
                    </Button>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
