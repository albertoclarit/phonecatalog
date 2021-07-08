import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import { ModalProvider } from "react-modal-hook";
import { theme } from '../lib/theme';
import "reflect-metadata";
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }: AppProps) {

  //https://stackoverflow.com/questions/50685175/react-material-ui-warning-prop-classname-did-not-match

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }

  }, []);


  return (
      <React.Fragment>
       <Provider session={pageProps.session}>
         <ThemeProvider theme={theme}>
          <ModalProvider>
            <CssBaseline />
               <Component {...pageProps} />
          </ModalProvider>
         </ThemeProvider>
        </Provider>
      </React.Fragment>
  );
}
export default MyApp
