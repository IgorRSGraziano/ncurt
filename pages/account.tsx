import React from "react";
import styled from "styled-components";
import { rem, Title } from "styles/style";

import { A } from "pages";

import { sessionOptions } from "utils/session";
import { withIronSessionSsr } from "iron-session/next";
import type { IUser } from "interfaces/User";
import prisma from "services/prisma";

import { useRouter } from "next/router";

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: fit-content;
  max-width: 90vw;
`;

const LoginForm2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  max-width: 90vw;
`;

const Label = styled.label`
  width: 100%;
  max-width: 80vw;
  margin: auto;
  font-size: ${rem(20)};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: rgb(19, 47, 76);
  border: 1px solid rgb(38, 93, 151);
  color: rgb(178, 186, 194);
  text-align: center;
  font-size: ${rem(17)};
  transition: 0.3s;
`;

const InputField = styled.div`
  width: 100%;
  max-width: 90vw;
  margin: 10px 0;
`;

const Button1 = styled.button`
  width: 100%;
  max-width: 90vw;
  border: 1px solid rgb(38, 93, 151);
  border-left: 0px;
  background-color: rgb(0, 127, 255);
  color: rgb(0, 30, 60);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  margin: 10px 0;
`;

const Button2 = styled.button`
  width: 100%;
  max-width: 90vw;
  border: 1px solid rgb(38, 93, 151);
  border-left: 0px;
  color: rgb(0, 127, 255);
  border: rgb(0, 127, 255) 3px solid;
  background-color: rgb(0, 30, 60);
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  margin: 10px 0;
`;

const Result = styled.div``;

const URLinfo = styled.span``;

const URLDesiny = styled.span``;

const URLFrom = styled.p``;

const URLCount = styled.div``;

const Selecao = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 500px;
  max-width: 90vw;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 100px !important;
  /* background-color: rgb(0, 30, 60); */
  border: 3px solid rgb(0, 127, 255);

  color: rgb(0, 127, 255);
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 1px 20px 10px rgba(0, 0, 0, 0.3);
`;

const Main = styled.main`
  height: auto;
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
    const userUrls = await prisma.urls.findMany({
      where: {
        authorId: String(user.id),
      },
    });

    user.urls = JSON.parse(JSON.stringify(userUrls));
    return {
      props: { user },
    };
  }
}, sessionOptions);

interface IAccount {
  user: IUser;
}

const Account: React.FC<IAccount> = ({ user }) => {
  const [selecao, setSelecao] = React.useState<boolean>(true);

  const router = useRouter();

  React.useEffect(() => {
    if (!user.isLogged) {
      router.push("/login");
    }
  }, []);

  return (
    <Main>
      <>
        <LoginForm>
          <Title size={rem(50)}>Bem Vindo, {user.name}</Title>
          {selecao ? (
            <Button1 onClick={() => setSelecao(true)}>URL's Geradas</Button1>
          ) : (
            <Button2 onClick={() => setSelecao(true)}>URL's Geradas</Button2>
          )}
          {!selecao ? (
            <Button1 onClick={() => setSelecao(false)}>
              Atualizar meus dados
            </Button1>
          ) : (
            <Button2 onClick={() => setSelecao(false)}>
              Atualizar meus dados
            </Button2>
          )}
        </LoginForm>
        {console.log(user)}
        <Result>
          {selecao ? (
            user.urls?.length == 0 ? (
              <Selecao>
                <h1>Você não tem nenhuma URL...</h1>
              </Selecao>
            ) : (
              <Selecao>
                {user.urls?.map((url) => {
                  return (
                    <URLinfo>
                      <URLFrom>
                        Url Encurtada:{" "}
                        <A
                          target={`_blank`}
                          href={`/${url.url}`}
                        >{`ncurt.vercel.app/${url.url}`}</A>
                      </URLFrom>
                      <URLDesiny>Destino: {url.destiny}</URLDesiny>
                      <URLCount>Cliques: {url.count}</URLCount>
                    </URLinfo>
                  );
                })}
              </Selecao>
            )
          ) : (
            <Selecao>
              <LoginForm2>
                <Title size={rem(25)}>Seus Dados</Title>

                <InputField>
                  <Label htmlFor="senha">Nome</Label>
                  <Input type="text" required />
                </InputField>

                <InputField>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input type="email" required />
                </InputField>
                <InputField>
                  <Label htmlFor="senha">Senha</Label>
                  <Input type="password" required />
                </InputField>
                <Button2>Atualizar</Button2>
              </LoginForm2>
            </Selecao>
          )}
        </Result>
      </>
    </Main>
  );
};

export default Account;
