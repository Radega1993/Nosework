import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";

/**
 * Página de error personalizada (500 y errores de cliente) — diseño navy/gold (8.5)
 * Next.js invoca esta página en errores de servidor (statusCode 5xx) o errores en el cliente.
 */
function ErrorPage({ statusCode }) {
  const is500 = statusCode >= 500 || statusCode === undefined;
  const title = statusCode === 404 ? "Página no encontrada" : is500 ? "Error del servidor" : "Ha ocurrido un error";
  const message =
    statusCode === 404
      ? "La página que buscas no existe."
      : is500
        ? " Lo sentimos, algo ha fallado en el servidor. Por favor, inténtalo de nuevo más tarde."
        : `Ha ocurrido un error (${statusCode}).`;

  return (
    <>
      <Head>
        <title>{statusCode === 404 ? "Página no encontrada" : "Error"} – Nosework Trial</title>
        <meta name="description" content="Ha ocurrido un error. Volver al inicio de Nosework Trial." />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <div className="bg-[#F4F6F8] min-h-screen pt-20 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="container-redesign text-center max-w-xl">
            <h1 className="text-h1-redesign-mobile md:text-h1-redesign font-bold text-navy mb-4">
              {title}
            </h1>
            <p className="text-body-redesign-lg text-neutral-text-medium mb-8">
              {message}
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gold hover:bg-gold-hover text-navy font-semibold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              aria-label="Volver al inicio"
            >
              Volver al inicio
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
