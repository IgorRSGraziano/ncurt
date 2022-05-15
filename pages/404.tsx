import React from "react";
import styled from "styled-components";
import { rem } from "styles/style";

const NotFoundContainer = styled.main`
  display: block;
  height: 100vh;
`;

const NotFoundTitle = styled.p`
  font-size: ${rem(100)};
  font-weight: bold;
  margin-bottom: 0;
`;

function NotFound() {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404.</NotFoundTitle>
      <h1>Parece que essa não era a página que você estava buscando...</h1>
    </NotFoundContainer>
  );
}

export default NotFound;
