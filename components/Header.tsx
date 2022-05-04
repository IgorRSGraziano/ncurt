import React from "react";
import { StaticContainer, LoginArea, Brand, Content } from "styles/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
          <Link href={`/account`}>
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
