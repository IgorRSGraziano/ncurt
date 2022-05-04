import { GlobalStyle } from "styles/globals";
import { MainContainer } from "styles/style.ts";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Header from "components/Header.tsx";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </>
  );
}

export default MyApp;
