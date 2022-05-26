import React from "react";
import styled from "styled-components";
import { rem } from "styles/style";
import { textColor2 } from "styles/style";

const NotFoundContainer = styled.main`
  display: block;
  height: 110vh;
`;

const NotFoundTitle = styled.p`
  font-size: ${rem(100)};
  font-weight: bold;
  margin-bottom: 0;
`;

const Small = styled.small`
  display: block;
  padding-bottom: 300px;
  color: rgba(255, 255, 255, 0.5);
`;

function NotFound() {
  const [catPic, setCatPic] = React.useState<string>("");

  async function getCatsPic() {
    const pics = await (await fetch("https://cataas.com/cat?json=true")).json();
    pics.url && setCatPic(`https://cataas.com/${pics.url}`);
  }

  React.useEffect(() => {
    getCatsPic();
  }, []);

  return (
    <NotFoundContainer>
      <NotFoundTitle>404.</NotFoundTitle>
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
}

export default NotFound;
