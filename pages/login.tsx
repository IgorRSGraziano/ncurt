import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { rem, Button } from "styles/style";
import { Error } from "pages";
import type { IUser } from "interfaces/User";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "utils/session";

const Title = styled.h1`
  font-size: ${rem(50)};
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

function login() {
  const [isSignup, setIsSignup] = React.useState<Boolean>(false);

  const [status, setStatus] = React.useState<string>("");

  const name = React.useRef(null);
  const email = React.useRef(null);
  const password = React.useRef(null);

  const router = useRouter();

  const checkout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("inicio");
    const response = await fetch(
      `/api/account/${isSignup ? "login" : "create"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.current?.value,
          email: email.current?.value,
          password: password.current?.value,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    if (data.sucess) {
      router.push("/account");
    } else {
      setStatus(
        isSignup ? "Senha ou e-mail incorretos." : "E-mail já cadastrado."
      );
    }
  };

  return (
    <main>
      <LoginForm>
        <Title>{isSignup ? "Logar" : "Crie sua conta."}</Title>
        {!isSignup && (
          <InputField>
            <Label htmlFor="senha">Nome</Label>
            <Input type="text" ref={name} />
          </InputField>
        )}
        <InputField>
          <Label htmlFor="email">E-Mail</Label>
          <Input type="email" ref={email} />
        </InputField>
        <InputField>
          <Label htmlFor="senha">Senha</Label>
          <Input type="password" ref={password} />
        </InputField>
        <Error>{status}</Error>
        <Button highlight={true} onClick={checkout}>
          {isSignup ? "Entrar" : "Criar conta"}
        </Button>
        <Button highlight={false} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Não possui conta?" : "Já possui conta?"}
        </Button>
        {isSignup && <Button highlight={false}>Esqueceu sua senha?</Button>}
      </LoginForm>
    </main>
  );
}

export default login;
