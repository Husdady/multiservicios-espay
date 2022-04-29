// Librarys
import { Html, Head, Main, NextScript } from 'next/document';

// Headers
import { FaviconHeader } from "@headers";

// Package
const pk = require("@root/package.json");

const fontawesome = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css";

export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <meta name="author" content={pk.author} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/assets/img/multiservicios-espay.webp" />
        <link rel="stylesheet preload" as="style" href={fontawesome} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya+Sans&family=Archivo+Narrow&family=Dosis&family=Noto+Sans&family=Lato&family=Maven+Pro:wght@900&family=Fjalla+One&family=Open+Sans&family=Ubuntu&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans+Condensed:wght@300&amp;display=swap" rel="stylesheet" />
        <FaviconHeader />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}