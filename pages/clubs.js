import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import SEOHead from "@/components/SEOHead";

export default function Clubs() {
    return (
        <div className="bg-[#F4F6F8] min-h-screen pt-20">
            <SEOHead
                title="Clubs – Nosework Trial"
                description="Listado de clubs e instructores de Nosework Trial. Próximamente disponible."
                canonical="/clubs"
                ogImage="/images/og-image.jpg"
            />

            <Navbar />

            <header className="bg-navy text-white py-16 md:py-20 text-center">
                <div className="container-redesign">
                    <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold mb-4">Clubs e instructores</h1>
                    <p className="text-xl md:text-2xl text-white/90">Encuentra un club cerca de ti</p>
                </div>
            </header>

            <main>
                <div className="container-redesign py-12">
                    <section className="bg-white rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 max-w-2xl mx-auto text-center">
                        <h2 className="text-h2-redesign font-bold text-neutral-text-dark mb-4">Próximamente</h2>
                        <p className="text-body-redesign-lg text-neutral-text-medium mb-8">
                            El listado de clubs e instructores adheridos a Nosework Trial estará disponible pronto. Mientras tanto,
                            puedes consultar la guía de inicio y el calendario de eventos para encontrar pruebas cerca de ti.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button href="/como-empezar" variant="primary">
                                Cómo empezar
                            </Button>
                            <Button href="/events" variant="outline">
                                Ver eventos
                            </Button>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
