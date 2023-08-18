import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/*The <body> tag contains the main content of the document */}
      <body>
        <Main /> {/* Render the main content of the application (page components, etc.) */}
        <NextScript /> {/* Next.js scripts that enable client-side navigation */}
      </body>
    </Html>
  )
}
