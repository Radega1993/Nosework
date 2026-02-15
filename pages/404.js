import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { useLocalizedLink } from "@/hooks/useLocalizedLink";
import Head from "next/head";

/**
 * Página 404 personalizada — diseño navy/gold, enlace a inicio (8.4)
 */
export default function Custom404() {
  const { localizedHref } = useLocalizedLink();

  return (
    <>
      <Head>
        <title>Página no encontrada – Nosework Trial</title>
        <meta name="description" content="La página que buscas no existe. Volver al inicio de Nosework Trial." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="bg-[#F4F6F8] min-h-screen pt-20 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="container-redesign text-center max-w-xl">
            <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold text-navy mb-4">
              Página no encontrada
            </h1>
            <p className="text-body-redesign-lg text-neutral-text-medium mb-8">
              La página que buscas no existe o ha sido movida. Puedes volver al inicio o explorar nuestro sitio.
            </p>
            <Button
              href={localizedHref("/")}
              variant="primary"
              aria-label="Volver al inicio"
            >
              Volver al inicio
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
