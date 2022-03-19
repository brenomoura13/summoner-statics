import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render (): JSX.Element {
    return (
      <Html lang="pt">
        <Head>
          <meta charSet='utf-8' />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
          <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Knewave&family=Montserrat:wght@100;400&family=Roboto:wght@100;300;400&display=swap" rel="stylesheet" />        
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument