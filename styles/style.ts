import styled from "styled-components";

export function rem(px: number): string {
  return `${px / 16}rem`;
}

export const textColor1 = `rgb(178, 186, 194)`;
export const textColor2 = `rgb(255, 255, 255)`;

export const fontSize1 = rem(14);
export const fontSize2 = rem(23);
export const fontSize3 = rem(34);
interface Props {
  position?: string;
  top?: string;
  bottom?: string;
  justifyContentf?: string;
}

export const StaticContainer = styled.header<Props>`
  position: ${(props) => props.position || "block"};
  z-index: 3;
  backdrop-filter: blur(20px);
  top: ${(props) => props.top || "unset"};
  bottom: ${(props) => props.bottom || "unset"};
  background-color: rgba(10, 25, 41, 0.72);
  padding: 10px 0px;
  width: 100vw;
`;

export const Content = styled.div<Props>`
  color: ${textColor1};
  font-size: ${fontSize1};
  justify-content: ${(props) => props.justifyContentf || ""};
  max-width: 1200px;
  display: flex;
  margin: auto;
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

export const MainContainer = styled.main`
  max-width: 1200px;
  justify-content: center;
  margin: auto;
`;

export const URLInput = styled.input`
  width: 500px;
  height: 40px;
  border-radius: 5px;
  background-color: rgb(19, 47, 76);
  border: 1px solid rgb(38, 93, 151);
  color: rgb(178, 186, 194);
  text-align: center;
  font-size: ${rem(17)};
  transition: 0.3s;

  &:hover {
    border-color: rgb(51, 153, 255);
    background-color: rgb(23, 58, 94);
    transition: 0.3s;
  }

  &:focus {
    border-color: rgb(51, 153, 255);
    background-color: rgb(23, 58, 94);
    transition: 0.3s;
    outline: none;
    color: ${textColor2};
  }

  &:focus-within {
    color: ${textColor2};
  }
`;

export const CollumAlign = styled.div`
  display: flex;
  flex-direction: column;
`;
