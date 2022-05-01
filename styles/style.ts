import styled from "styled-components";

function rem(px: number) {
  return `${px / 16}rem`;
}

const textColor1 = `rgb(178, 186, 194)`;
const textColor2 = `rgb(255, 255, 255)`;

const fontSize1 = rem(14);
const fontSize2 = rem(23);
const fontSize3 = rem(34);

export const HeaderContainer = styled.header`
  position: sticky;
  z-index: 3;
  backdrop-filter: blur(20px);
  top: 0px;
  background-color: rgba(10, 25, 41, 0.72);
  color: ${textColor1};
  font-size: ${fontSize1};
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
`;

export const Brand = styled.div`
  font-size: ${fontSize2};
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    transition: 0.3s;
    color: ${textColor2};
  }
`;

export const LoginArea = styled.a`
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
