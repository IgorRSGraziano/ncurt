import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "utils/session";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import { textColor2, rem, textColor1 } from "styles/style";

import type { IUrl, IResponseUrls } from "interfaces/URL";

const URLInput = styled.input`
  max-width: 500px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
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
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HomeStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

const BtnGerarURL = styled.button`
  border: 1px solid rgb(38, 93, 151);
  border-left: 0px;
  height: 100%;
  background-color: rgb(0, 127, 255);
  color: ${textColor2};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #0059b2;
    transition: 0.3s;
  }
`;

const Small = styled.small`
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 3px;
`;

const H1 = styled.h1`
  text-align: center;
`;

const ReturnMessage = styled.small`
  height: 20px;
  font-size: ${rem(20)};
  margin-bottom: 30px;
`;

const A = styled.a`
  text-decoration: underline;
  color: ${textColor2};
`;

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user = req.session.user;
  console.log(req.session.user);

  if (user === undefined) {
    return {
      props: {
        user: null,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
}, sessionOptions);

interface IDestinyStatus {
  generated: boolean;
  response?: IResponseUrls;
}

const Home: React.FC = () => {
  //Status from default URL generate
  const [status, setStatus] = React.useState<IDestinyStatus>({
    generated: false,
  });

  //Verify destiny from shorted url
  const [destinyStatus, setDestinyStatus] = React.useState<string>(null);

  const defaultUrl = React.useRef(null);
  const destinyUrl = React.useRef(null);

  const generateUrl = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        destiny: defaultUrl.current.value,
      };

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseJson: IResponseUrls = await response.json();

      setStatus({ generated: true, response: responseJson });
    } catch (e) {
      console.warn(e);
      setStatus({ generated: true, response: { sucess: false } });
    }
  };

  const verifyUrl = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = {
        url: destinyUrl.current.value,
      };
      const response = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const responseJson = await response.json();
      let message: string;
      if (responseJson.sucess) {
        message = `Essa URL leva para: ${responseJson.destiny}`;
      } else {
        message = "Não foi encontrado essa URL";
      }
      setDestinyStatus(message);
    } catch (e) {
      console.log(e);
      setDestinyStatus("Algo de errado não deu certo...");
    }
  };

  <Head>
    <title>nCurt</title>
  </Head>;

  return (
    <HomeStyle>
      <H1>nCurt, o seu encurtador de URL's</H1>

      <CollumAlign>
        <p>
          <label htmlFor="url">Digite a URL que deseja encurtar.</label>
        </p>
        <InputContainer>
          <URLInput
            type={"text"}
            placeholder="https://www.site.com.br"
            id="url"
            ref={defaultUrl}
          />
          <BtnGerarURL onClick={generateUrl}>Gerar</BtnGerarURL>
        </InputContainer>
        <Small>
          Você pode enviar uma lista de URL's passando um ";" entre elas
        </Small>
        {status.generated &&
          (status.response?.sucess ? (
            status.response?.urls?.map((el) => (
              <ReturnMessage>
                {el.destiny}
                {"   "}
                <FontAwesomeIcon icon={faArrowRight as IconProp} size="1x" />
                {"   "}
                <A target="_blank" href={`${el.url}`}>
                  {el.url}
                </A>
              </ReturnMessage>
            ))
          ) : (
            <ReturnMessage>Algo de errado não deu certo...</ReturnMessage>
          ))}

        <p>
          <label htmlFor="urlVerify">Deseja saber aonde uma URL leva?</label>
        </p>
        <InputContainer>
          <URLInput
            type={"text"}
            placeholder="https://www.site.com.br"
            id="urlVerify"
            ref={destinyUrl}
          />
          <BtnGerarURL onClick={verifyUrl}>Gerar</BtnGerarURL>
        </InputContainer>
        <ReturnMessage>{destinyStatus}</ReturnMessage>
      </CollumAlign>
    </HomeStyle>
  );
};

export default Home;
