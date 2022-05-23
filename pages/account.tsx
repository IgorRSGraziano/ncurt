import React from "react";
import styled from "styled-components";
import { rem } from "styles/style";

const Title = styled.h1`
  font-size: ${rem(50)};
`;

const Title2 = styled.h1`
  font-size: ${rem(25)};
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: fit-content;
`;

const Label = styled.label`
  width: 100%;
  font-size: ${rem(20)};
`;

const Input = styled.input`
  display: block;
  width: 400px;
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
  width: 400px;
  margin: 10px 0;
`;

const Button1 = styled.button`
  width: 100%;
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

const Link = styled.span``;

const Destiny = styled.span``;

const Infos = styled.p``;

const LinkInfo = styled.div``;

const Selecao = styled.div`
  display: flex;
  align-items: start;
  flex-direction: column;
  width: 500px;
  margin: auto;
  /* background-color: rgb(0, 30, 60); */
  border: 3px solid rgb(0, 127, 255);

  color: rgb(0, 127, 255);
  font-weight: bold;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 1px 20px 10px rgba(0, 0, 0, 0.3);
`;

const Main = styled.main`
  height: 110vh;
`;

function login() {
  const [selecao, setSelecao] = React.useState<boolean>(true);

  return (
    <Main>
      <LoginForm>
        <Title>Bem Vindo, Igor</Title>
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

      <Result>
        {selecao ? (
          <Selecao>
            <LinkInfo>
              <Link>Link: www.ncurt.com/1 | </Link>
              <Destiny>www.youtube.com</Destiny>
              <Infos>Cliques 8</Infos>
            </LinkInfo>

            <LinkInfo>
              <Link>Link: www.ncurt.com/2 | </Link>
              <Destiny>www.github.com</Destiny>
              <Infos>Cliques 74</Infos>
            </LinkInfo>

            <LinkInfo>
              <Link>Link: www.ncurt.com/a | </Link>
              <Destiny>www.mercadolivre.com</Destiny>
              <Infos>Cliques 23</Infos>
            </LinkInfo>

            <LinkInfo>
              <Link>Link: www.ncurt.com/b | </Link>
              <Destiny>www.amazon.com.br</Destiny>
              <Infos>Cliques 34</Infos>
            </LinkInfo>

            <LinkInfo>
              <Link>Link: www.ncurt.com/3 | </Link>
              <Destiny>www.gitlab.com/yourprofile</Destiny>
              <Infos>Cliques 99</Infos>
            </LinkInfo>

            <LinkInfo>
              <Link>Link: www.ncurt.com/4 | </Link>
              <Destiny>www.kabum.com.br</Destiny>
              <Infos>Cliques 150</Infos>
            </LinkInfo>

            <LinkInfo>
              <Link>Link: www.ncurt.com/5 | </Link>
              <Destiny>www.pichau.com.br/headsets</Destiny>
              <Infos>Cliques 33</Infos>
            </LinkInfo>
          </Selecao>
        ) : (
          <Selecao>
            <LoginForm>
              <Title2>Seus Dados</Title2>

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
            </LoginForm>
          </Selecao>
        )}
      </Result>
    </Main>
  );
}

export default login;
