import Head from "next/head";

import styled from "styled-components";

import { textColor1, textColor2, rem } from "styles/style";

const URLInput = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 5px;
  background-color: rgb(19, 47, 76);
  border: 1px solid rgb(38, 93, 151);
  color: rgb(178, 186, 194);
  text-align: center;
  font-size: ${rem(17)};
  transition: 0.3s;

  &:hover {
    border-color: rgb(51, 153, 255);
    background-color: rgb(23, 58, 94);
    transition: 0.3s;
  }

  &:focus {
    border-color: rgb(51, 153, 255);
    background-color: rgb(23, 58, 94);
    transition: 0.3s;
    outline: none;
    color: ${textColor2};
  }

  &:focus-within {
    color: ${textColor2};
  }
`;

const CollumAlign = styled.div`
  display: flex;
  flex-direction: column;
`;

const HomeStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default function Home() {
  <Head>
    <title>nCurt</title>
  </Head>;

  return (
    <HomeStyle>
      <h1>nCurt, o seu encurtador de URL's</h1>

      <CollumAlign>
        <p>
          <label htmlFor="url">Digite a URL que deseja encurtar.</label>
        </p>
        <URLInput
          type={"text"}
          placeholder="https://www.site.com.br"
          id="url"
        />
      </CollumAlign>
    </HomeStyle>
  );
}
