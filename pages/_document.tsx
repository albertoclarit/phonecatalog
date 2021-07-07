import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles';
import React from 'react'

export default class MyDocument extends Document {
    static async getInitialProps(ctx:DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head >

                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async ctx => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ],
    };
};

