import React from "react";
import styled from "styled-components";
import { loginDb } from "services/LoginService";
import { rem } from "styles/style";

const Title = styled.h1`
  font-size: ${rem(50)};
`;

const LoginForm = styled.form`
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
            <Input type="text" required />
          </InputField>
        )}
        <InputField>
          <Label htmlFor="email">E-Mail</Label>
          <Input type="email" required />
        </InputField>
        <InputField>
          <Label htmlFor="senha">Senha</Label>
          <Input type="password" required />
        </InputField>
        <Button1
          onClick={(e) => {
            e.preventDefault;
            setIsSignup(!isSignup);
          }}
        >
          {isSignup ? "Não possui conta?" : "Já possui conta?"}
        </Button1>
        <Button2>{isSignup ? "Criar conta" : "Entrar"}</Button2>
      </LoginForm>
    </main>
  );
}

export default login;
