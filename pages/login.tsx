import React from "react";
import styled from "styled-components";
import { loginDb } from "services/LoginService";
import { rem, Button } from "styles/style";

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

function login() {
  const [isSignup, setIsSignup] = React.useState<Boolean>(false);

  return (
    <main>
      <LoginForm>
        <Title>{isSignup ? "Logar" : "Crie sua conta."}</Title>
        {!isSignup && (
          <InputField>
            <Label htmlFor="senha">Nome</Label>
            <Input type="text" />
          </InputField>
        )}
        <InputField>
          <Label htmlFor="email">E-Mail</Label>
          <Input type="email" />
        </InputField>
        <InputField>
          <Label htmlFor="senha">Senha</Label>
          <Input type="password" />
        </InputField>
        <Button highlight={true}>{isSignup ? "Entrar" : "Criar conta"}</Button>
        <Button highlight={false} onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Não possui conta?" : "Já possui conta?"}
        </Button>
        {isSignup && <Button highlight={false}>Esqueceu sua senha?</Button>}
      </LoginForm>
    </main>
  );
}

export default login;
