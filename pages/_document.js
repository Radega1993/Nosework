import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        {/* Preconnect to external domains if using web fonts in the future */}
        {/* Example: <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
        
        {/* Font display optimization for future web fonts */}
        {/* When adding web fonts, use font-display: swap in @font-face declarations */}
        {/* Example:
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'CustomFont';
              src: url('/fonts/custom.woff2') format('woff2');
              font-weight: 400;
              font-style: normal;
              font-display: swap;
            }
          `,
        }} />
        */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
