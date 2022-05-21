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

interface IStyle {
  highlight: boolean;
}

export const StaticContainer = styled.header<Props>`
  position: ${(props) => props.position || "block"};
  z-index: 3;
  backdrop-filter: blur(20px);
  top: ${(props) => props.top || "unset"};
  bottom: ${(props) => props.bottom || "unset"};
  background-color: rgba(10, 25, 41, 0.72);
  padding: 10px 0px;
  width: 100%;
`;

export const Content = styled.div<Props>`
  color: ${textColor1};
  font-size: ${fontSize1};
  justify-content: ${(props) => props.justifyContentf || ""};
  max-width: 1200px;
  display: flex;
  margin: auto;
`;

export const MainContainer = styled.main`
  max-width: 1200px;
  justify-content: center;
  margin: auto;
`;

export const Button = styled.button<IStyle>`
  width: 100%;
  border: ${(props) =>
    props.highlight
      ? "1px solid rgb(38, 93, 151)"
      : " rgb(0, 127, 255) 3px solid;"};
  background-color: ${(props) =>
    props.highlight ? "rgb(0, 127, 255)" : "rgb(0, 30, 60)"};
  color: ${(props) =>
    props.highlight ? "rgb(0, 30, 60)" : "rgb(0, 127, 255)"};
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  margin: 10px 0;
`;
