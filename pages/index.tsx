import Head from "next/head";
import React from "react";
import styled from "styled-components";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "utils/session";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCopy } from "@fortawesome/free-solid-svg-icons";

import { textColor2, rem, errorColor1, Title } from "styles/style";

import type { IUrl, IResponseUrls } from "interfaces/URL";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { IUser } from "interfaces/User";

interface IUrlValid {
  isInvalid?: boolean;
}
const URLInput = styled.input<IUrlValid>`
  max-width: 500px;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: rgb(19, 47, 76);
  border: 1px solid
    ${(props) => (props.isInvalid ? errorColor1 : "rgb(38, 93, 151)")};
  color: rgb(178, 186, 194);
  text-align: center;
  font-size: ${rem(17)};
  transition: 0.3s;

  &:hover {
    border-color: ${(props) =>
      props.isInvalid ? errorColor1 : "rgb(51, 153, 255)"};
    background-color: rgb(23, 58, 94);
    transition: 0.3s;
  }

  &:focus {
    border-color: ${(props) =>
      props.isInvalid ? errorColor1 : "rgb(38, 93, 151)"};
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

const BtnGerarURL = styled.button<IUrlValid>`
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
  ${(props) => (props.isInvalid ? "filter: contrast(0.5);" : "")}

  &:hover {
    background-color: #0059b2;
    transition: 0.3s;
  }
`;

const Small = styled.small`
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 3px;
`;

const ReturnMessage = styled.small`
  height: auto;
  font-size: ${rem(20)};
  margin-bottom: 15px;
  text-align: center;
`;

export const A = styled.a`
  text-decoration: underline;
  color: ${textColor2};
  margin-bottom: 30px;
  cursor: pointer;
`;

export const Error = styled(Small)`
  color: ${errorColor1} !important;
  font-weight: bold;
  display: block;
`;

const CopyBtn = styled.button`
  border-radius: 7px;
  cursor: pointer;
  background-color: rgb(19, 47, 76);
  border: 1px solid rgb(38, 93, 151);
  color: rgb(38, 93, 151);
  padding: 5px;
  text-align: center;
  font-size: ${rem(17)};
  transition: 0.3s;
  margin-left: 15px;

  &:active {
    transition: 0s;
    background-color: rgb(38, 93, 151);
    color: rgb(19, 47, 76);
  }
`;

interface IBr {
  height: number;
}

const Br = styled.div<IBr>`
  height: ${(props) => props.height}PX;
`;

export const getServerSideProps = withIronSessionSsr(async ({ req, res }) => {
  const user: IUser = req.session.user;

  if (user === undefined) {
    return {
      props: {
        user: {
          isLogged: false,
        },
      },
    };
  } else {
    return {
      props: { user: req.session.user },
    };
  }
}, sessionOptions);

interface IDestinyStatus {
  generated: boolean;
  response?: IResponseUrls;
}

interface IUrlValidFormat {
  isValid: boolean;
  error?: string;
}

interface IHome {
  user: IUser;
}

const Home: React.FC<IHome> = ({ user }) => {
  console.log(user);
  //Status from default URL generate
  const [status, setStatus] = React.useState<IDestinyStatus>({
    generated: false,
  });

  const [urlValidFormat, setUrlValidFormat] = React.useState<IUrlValidFormat>({
    isValid: true,
  });

  //Verify destiny from shorted url
  const [destinyStatus, setDestinyStatus] = React.useState<string>(null);

  const defaultUrl = React.useRef(null);
  const destinyUrl = React.useRef(null);

  const generateUrl = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!!defaultUrl.current.value)
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

    if (!!destinyUrl.current.value)
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

  const verifyUrlFormat = (): void => {
    const urls: string[] = defaultUrl.current.value
      .split(";")
      .map((u: string) => u.trim());

    const urlRegex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gi;

    const isValid = urls.every((url) => url.match(urlRegex));

    if (isValid) {
      setUrlValidFormat({ isValid: true });
    } else {
      setUrlValidFormat({
        isValid: false,
        error: "Parece que essa URL é invalida...",
      });
    }
  };

  return (
    <HomeStyle>
      <Title>Encurte URL's de forma simples.</Title>

      <CollumAlign>
        <p>
          <label htmlFor="url">Digite a URL que deseja encurtar.</label>
        </p>
        <InputContainer>
          <URLInput
            type={"text"}
            placeholder="https://www.site.com.br"
            id="url"
            isInvalid={!urlValidFormat.isValid}
            ref={defaultUrl}
            onChange={verifyUrlFormat}
          />
          <BtnGerarURL
            isInvalid={!urlValidFormat.isValid}
            onClick={(e) => urlValidFormat.isValid && generateUrl(e)}
          >
            Gerar
          </BtnGerarURL>
        </InputContainer>
        {!urlValidFormat.isValid && <Error>{urlValidFormat.error}</Error>}
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
                <A
                  target="_blank"
                  href={`${window.location.protocol}//${el.url}`}
                >
                  {el.url}
                </A>
                <CopyBtn
                  onClick={() => {
                    navigator.clipboard.writeText(el.url);
                  }}
                >
                  <FontAwesomeIcon icon={faCopy as IconProp} size="1x" />
                </CopyBtn>
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
          <BtnGerarURL onClick={verifyUrl}>Verificar</BtnGerarURL>
        </InputContainer>
        <ReturnMessage>{destinyStatus}</ReturnMessage>
      </CollumAlign>
    </HomeStyle>
  );
};

export default Home;
