import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            {/* SEO */}
            <Head>
                <title>Contacto Nosework Trial – Preguntas y Consultas</title>
                <meta
                    name="description"
                    content="Contacta con Nosework Trial. Formulario de contacto, email y redes sociales. Resolvemos tus dudas sobre nosework deportivo."
                />
                <meta
                    name="keywords"
                    content="contacto nosework trial, email nosework, consultas nosework, información nosework"
                />
                <meta property="og:title" content="Contacto Nosework Trial – Preguntas y Consultas" />
                <meta
                    property="og:description"
                    content="Contacta con Nosework Trial para consultas, eventos o dudas sobre detección canina deportiva."
                />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:url" content="https://www.noseworktrialcommunity.com/contact" />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="canonical" href="https://www.noseworktrialcommunity.com/contact" />
            </Head>

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16 md:py-20 text-center">
                <div className="container-custom">
                    <h1 className="text-h1 font-bold mb-4">Contacto</h1>
                    <p className="text-xl md:text-2xl text-primary-50">Ponte en contacto con nosotros</p>
                </div>
            </header>

            {/* Contenido Principal */}
            <main className="section">
                <div className="container-custom space-y-12">
                    {/* Formulario de Contacto */}
                    <section className="card max-w-2xl mx-auto">
                        <h2 className="text-h2 font-bold mb-6 text-center">Formulario de Contacto</h2>
                        <form className="space-y-6">
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="input"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Correo Electrónico"
                                className="input"
                                required
                            />
                            <textarea
                                placeholder="Mensaje"
                                className="textarea"
                                rows="5"
                                required
                            ></textarea>
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Enviar
                            </button>
                        </form>
                    </section>

                    {/* Grupo de WhatsApp */}
                    <section className="card max-w-2xl mx-auto text-center">
                        <h2 className="text-h2 font-bold mb-4">Grupo de WhatsApp</h2>
                        <p className="text-body-lg text-gray-700 mb-4">
                            Únete a nuestro grupo de WhatsApp para coordinadores y miembros:
                        </p>
                        <a
                            href="https://wa.me/123456789"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary inline-block"
                        >
                            Enlace al Grupo
                        </a>
                    </section>

                    {/* Redes Sociales */}
                    <section className="card max-w-2xl mx-auto text-center">
                        <h2 className="text-h2 font-bold mb-6">Redes Sociales</h2>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-body-lg">Email:</strong>
                                <p className="text-body text-gray-700">contacto@noseworktrialcommunity.com</p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <a href="https://facebook.com/nosework" className="text-secondary-600 hover:text-secondary-700 font-semibold">
                                    Facebook
                                </a>
                                <span className="text-gray-400">|</span>
                                <a href="https://instagram.com/nosework" className="text-secondary-600 hover:text-secondary-700 font-semibold">
                                    Instagram
                                </a>
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
