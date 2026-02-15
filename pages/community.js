import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

export default function Community() {
    return (
        <div className="bg-[#F4F6F8] min-h-screen pt-20">
            <SEOHead
                title="Comunidad - Nosework Trial Community"
                description="Explora la comunidad Nosework Trial Community. Artículos, galería multimedia y reconocimientos destacados."
                canonical="/community"
                ogImage="/images/community-og.jpg"
                additionalMeta={{
                    keywords:
                        "nosework comunidad, detección canina, blog nosework, galería nosework, reconocimientos caninos",
                }}
            />

            <Navbar />

            <header className="bg-navy text-white py-16 md:py-20 text-center">
                <div className="container-redesign">
                    <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Comunidad</h1>
                    <p className="text-xl md:text-2xl text-white/90">Artículos, galería y reconocimientos</p>
                </div>
            </header>

            <main>
                <div className="container-redesign py-12 space-y-12">
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Blog</h2>
                        <ul className="space-y-4">
                            {[
                                { title: "Entrenamiento Básico para Nosework", link: "/blog/entrenamiento-basico" },
                                { title: "Mejores Prácticas en Detección Canina", link: "/blog/mejores-practicas" },
                                { title: "Criterios de Evaluación en Eventos", link: "/blog/criterios-evaluacion" },
                            ].map((post, index) => (
                                <li key={index}>
                                    <a
                                        href={post.link}
                                        className="text-navy hover:text-gold font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                                    >
                                        {post.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6">Galería multimedia</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {["event1.jpg", "event2.jpg", "event3.jpg", "event4.jpg"].map((img, index) => (
                                <img
                                    key={index}
                                    src={`/images/${img}`}
                                    alt={`Evento ${index + 1}`}
                                    className="rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-xl transition-shadow w-full h-48 object-cover"
                                />
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6 text-center">Reconocimientos destacados</h2>
                        <ul className="space-y-4 text-body-redesign text-neutral-text-medium">
                            <li><strong className="text-navy">Mejor Debut:</strong> Luna (Pastor Alemán)</li>
                            <li><strong className="text-navy">Mayor Mérito:</strong> Max (Golden Retriever)</li>
                            <li><strong className="text-navy">Destacado en Pruebas:</strong> Rocky (Labrador Retriever)</li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-6 text-center">Miembros de la comunidad</h2>
                        <ul className="space-y-4 text-body-redesign text-neutral-text-medium">
                            {[
                                { name: "Juan Pérez", link: "https://twitter.com/juanperez" },
                                { name: "María García", link: "https://instagram.com/mariagarcia" },
                            ].map((member, index) => (
                                <li key={index}>
                                    <strong className="text-navy">{member.name}</strong> –{" "}
                                    <a
                                        href={member.link}
                                        className="text-navy hover:text-gold font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 rounded"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ver perfil
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
