import React from "react";
import styled from "styled-components";
import { rem, Title } from "src/styles/style";
import { textColor2 } from "src/styles/style";

const NotFoundContainer = styled.main`
  display: block;
  height: 110vh;
`;

const Small = styled.small`
  display: block;
  padding-bottom: 300px;
  color: rgba(255, 255, 255, 0.5);
`;

export async function getServerSideProps() {
  let catPic: string;

  const pics = await (await fetch("https://cataas.com/cat?json=true")).json();
  pics.url ? (catPic = `https://cataas.com/${pics.url}`) : "";

  return {
    props: {
      catPic,
    },
  };
}

interface IProps {
  catPic: string;
}

const NotFound: React.FC<IProps> = ({ catPic }) => {
  return (
    <NotFoundContainer>
      <Title size={rem(100)} align="left">
        404.
      </Title>
      <h1>Parece que essa não era a página que você estava buscando...</h1>
      {catPic && (
        <>
          <h4>Ei ei, não fique triste, olha essa coisa fofa!</h4>
          <img src={catPic} alt="Gatinho" />
          <Small>
            Foto de: <b>Cat as a Service</b>,{" "}
            <u>
              <a href="https://cataas.com">cataas.com</a>
            </u>
          </Small>
        </>
      )}
    </NotFoundContainer>
  );
};

export default NotFound;
