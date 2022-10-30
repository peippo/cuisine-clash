import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="A food fighting card game" />
        <meta property="og:title" content="Cuisine Clash" />
        <meta property="og:description" content="A food fighting card game" />
        <meta
          property="og:image"
          content="https://cuisine-clash.vercel.app/share.png"
        />
        <meta
          property="twitter:image"
          content="https://cuisine-clash.vercel.app/share.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&family=Source+Serif+Pro&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
