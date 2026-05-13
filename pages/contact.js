import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useState } from "react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus("Enviando...");
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error("submit-error");
            setStatus("Mensaje enviado correctamente.");
            setForm({ name: "", email: "", message: "" });
        } catch {
            setStatus("No se pudo enviar el mensaje. Inténtalo de nuevo.");
        }
    }

    return (
        <div className="page-shell">
            {/* SEO */}
            <SEOHead
                title="Contacto Nosework Trial – Preguntas y Consultas"
                description="Contacta con Nosework Trial. Formulario de contacto, email y redes sociales. Resolvemos tus dudas sobre nosework deportivo."
                canonical="/contact"
                ogImage="/images/og-image.jpg"
                additionalMeta={{
                    keywords:
                        "contacto nosework trial, email nosework, consultas nosework, información nosework",
                }}
            />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="hero-band">
                <div className="container-redesign">
                    <h1 className="text-headline-h1 md:text-display font-montserrat mb-4">Contacto</h1>
                    <p className="text-body-lg text-white/85">Ponte en contacto con nosotros</p>
                </div>
            </header>

            {/* Contenido Principal */}
            <main>
                <div className="container-redesign py-12 space-y-12">
                    {/* Formulario de Contacto */}
                    <section className="surface-card max-w-2xl mx-auto">
                        <h2 className="text-headline-h2 font-montserrat mb-6 text-center">Formulario de contacto</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                                placeholder="Nombre"
                                className="input"
                                required
                            />
                            <input
                                type="email"
                                value={form.email}
                                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                                placeholder="Correo Electrónico"
                                className="input"
                                required
                            />
                            <textarea
                                value={form.message}
                                onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
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
                            {status && <p className="text-sm text-on-surface-variant">{status}</p>}
                        </form>
                    </section>

                    {/* Grupo de WhatsApp */}
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 max-w-2xl mx-auto text-center">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">Grupo de WhatsApp</h2>
                        <p className="text-body-redesign-lg text-neutral-text-medium mb-4">
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
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 max-w-2xl mx-auto text-center">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Redes Sociales</h2>
                        <div className="space-y-4">
                            <div>
                                <strong className="text-body-redesign-lg">Email:</strong>
                                <p className="text-body-redesign text-neutral-text-medium">contacto@noseworktrialcommunity.com</p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <a href="https://facebook.com/nosework" className="text-navy hover:text-gold font-semibold transition-colors">
                                    Facebook
                                </a>
                                <span className="text-neutral-text-medium">|</span>
                                <a href="https://instagram.com/nosework" className="text-navy hover:text-gold font-semibold transition-colors">
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
