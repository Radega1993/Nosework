import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Community() {
    return (
        <div className="bg-gray-100 min-h-screen pt-16">
            {/* SEO */}
            <Head>
                <title>Comunidad - Nosework Trial Community</title>
                <meta
                    name="description"
                    content="Explora la comunidad Nosework Trial Community. Artículos, galería multimedia y reconocimientos destacados."
                />
                <meta
                    name="keywords"
                    content="nosework comunidad, detección canina, blog nosework, galería nosework, reconocimientos caninos"
                />
                <meta property="og:title" content="Comunidad - Nosework Trial Community" />
                <meta
                    property="og:description"
                    content="Descubre nuestra comunidad: artículos, fotos y videos de eventos pasados, y reconocimientos destacados."
                />
                <meta property="og:image" content="/images/community-og.jpg" />
                <meta property="og:url" content="https://www.noseworktrialcommunity.com/community" />
                <meta property="og:type" content="website" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            {/* Navbar */}
            <Navbar />

            {/* Contenido Principal */}
            <main className="p-6 space-y-12">
                {/* Blog */}
                <section>
                    <h1 className="text-4xl font-bold text-center mb-6">Comunidad</h1>
                    <h2 className="text-3xl font-bold mb-4">Blog</h2>
                    <ul className="space-y-4">
                        {[
                            { title: "Entrenamiento Básico para Nosework", link: "/blog/entrenamiento-basico" },
                            { title: "Mejores Prácticas en Detección Canina", link: "/blog/mejores-practicas" },
                            { title: "Criterios de Evaluación en Eventos", link: "/blog/criterios-evaluacion" },
                        ].map((post, index) => (
                            <li key={index}>
                                <a href={post.link} className="text-blue-500 hover:underline">
                                    {post.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Galería Multimedia */}
                <section>
                    <h2 className="text-3xl font-bold mb-4">Galería Multimedia</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {["event1.jpg", "event2.jpg", "event3.jpg", "event4.jpg"].map((img, index) => (
                            <img
                                key={index}
                                src={`/images/${img}`}
                                alt={`Evento ${index + 1}`}
                                className="rounded shadow-md hover:shadow-lg transition-shadow"
                            />
                        ))}
                    </div>
                </section>

                {/* Reconocimientos Destacados */}
                <section className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-3xl font-bold mb-4 text-center">Reconocimientos Destacados</h2>
                    <ul className="space-y-4">
                        <li>
                            <strong>Mejor Debut:</strong> Luna (Pastor Alemán)
                        </li>
                        <li>
                            <strong>Mayor Mérito:</strong> Max (Golden Retriever)
                        </li>
                        <li>
                            <strong>Destacado en Pruebas:</strong> Rocky (Labrador Retriever)
                        </li>
                    </ul>
                </section>

                {/* Lista de Miembros */}
                <section>
                    <h2 className="text-3xl font-bold mb-4 text-center">Miembros de la Comunidad</h2>
                    <ul className="space-y-4">
                        {[
                            { name: "Juan Pérez", link: "https://twitter.com/juanperez" },
                            { name: "María García", link: "https://instagram.com/mariagarcia" },
                        ].map((member, index) => (
                            <li key={index}>
                                <strong>{member.name}</strong> -{" "}
                                <a href={member.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                                    Ver Perfil
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
