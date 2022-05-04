import React from "react";
import { HeaderContainer, LoginArea, Brand, Content } from "styles/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const isLogged = true;

function Header() {
  return (
    <HeaderContainer>
      <Content>
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
    </HeaderContainer>
  );
}

export default Header;
