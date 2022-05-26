import { GlobalStyle } from "styles/globals";
import { MainContainer } from "styles/style";

import { AppProps } from "next/app";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Header from "components/Header";
import Footer from "components/Footer";
import Head from "next/head";

config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>nCurt</title>
      </Head>
      <Header />
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
      <Footer />
    </>
  );
}

export default MyApp;
