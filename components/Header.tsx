import React from "react";
import styled from "styled-components";
import { StaticContainer, Content, textColor2, fontSize2 } from "styles/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const LoginArea = styled.a`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: nowrap;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    color: ${textColor2};
  }
`;

const Brand = styled.div`
  font-size: ${fontSize2};
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    color: ${textColor2};
  }
`;

const isLogged = true;

function Header() {
  return (
    <StaticContainer position="sticky" top="0">
      <Content justifyContentf="space-between">
        <Link href={"/"}>
          <a>
            <Brand>nCurt</Brand>
          </a>
        </Link>
        <div>
          <Link href={`/login`}>
            <LoginArea>
              <FontAwesomeIcon icon={faUser as IconProp} size="2x" />
              {isLogged ? "Minha conta" : "Login/Cadastro"}
            </LoginArea>
          </Link>
        </div>
      </Content>
    </StaticContainer>
  );
}

export default Header;
