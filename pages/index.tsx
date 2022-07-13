//Libs
import React from "react";
import styled from "styled-components";
import { withIronSessionSsr } from "iron-session/next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCopy } from "@fortawesome/free-solid-svg-icons";

//Interfaces
import type { IResponseUrls } from "interfaces/URL";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { IUser } from "interfaces/User";

//Styles
import { textColor2, rem, Title, Small } from "styles/style";

//Others
import { sessionOptions } from "utils/session";
import Input from "components/Input";

/* -------------------------------------------------------------------------- */
/*                                 Interfaces                                 */
/* -------------------------------------------------------------------------- */
interface IHome {
  user: IUser;
}

interface IDestinyStatus {
  generated: boolean;
  response?: IResponseUrls;
}

interface IUrlValidFormat {
  isValid: boolean;
  error?: string;
}

/* -------------------------------------------------------------------------- */
/*                              Styled Components                             */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                     SSR                                    */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  Component                                 */
/* -------------------------------------------------------------------------- */

const Home: React.FC<IHome> = ({ user }) => {
  //Status from default URL generate
  const [status, setStatus] = React.useState<IDestinyStatus>({
    generated: false,
  });

  const [urlValidFormat, setUrlValidFormat] = React.useState<IUrlValidFormat>({
    isValid: true,
  });

  //Verify destiny from shorted url
  const [destinyStatus, setDestinyStatus] = React.useState<string>(null);

  const defaultUrl: React.MutableRefObject<any> = React.useRef(null);
  const destinyUrl: React.MutableRefObject<any> = React.createRef();

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
        error: "Insira uma URL válida!",
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
        <Input
          id="url"
          placeholder="https://www.site.com.br"
          buttonAction={generateUrl}
          disabled={!urlValidFormat.isValid}
          buttonName={"Gerar"}
          errorMessage={urlValidFormat.error}
          onChange={verifyUrlFormat}
          ref={defaultUrl}
        />
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
        <Input
          id="urlVerify"
          placeholder="https://www.site.com.br"
          ref={destinyUrl}
          buttonName="Verificar"
          buttonAction={verifyUrl}
        />
        <ReturnMessage>{destinyStatus}</ReturnMessage>
      </CollumAlign>
    </HomeStyle>
  );
};

export default Home;
