import React from "react";
import styled from "styled-components";
import { textColor2, rem, errorColor1, Small } from "src/styles/style";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
`;

interface IUrlValid {
  isInvalid?: boolean;
}

const Button = styled.button<IUrlValid>`
  border: 1px solid rgb(38, 93, 151);
  border-left: 0px;
  height: 100%;
  background-color: rgb(0, 127, 255);
  color: ${textColor2};
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  ${(props) => (props.isInvalid ? "filter: contrast(0.5);" : "")}

  &:hover {
    background-color: #0059b2;
    transition: 0.3s;
  }
`;

const TextInput = styled.input<IUrlValid>`
  max-width: 500px;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: rgb(19, 47, 76);
  border: 1px solid
    ${(props) => (props.isInvalid ? errorColor1 : "rgb(38, 93, 151)")};
  color: rgb(178, 186, 194);
  text-align: center;
  font-size: ${rem(17)};
  transition: 0.3s;

  &:hover {
    border-color: ${(props) =>
      props.isInvalid ? errorColor1 : "rgb(51, 153, 255)"};
    background-color: rgb(23, 58, 94);
    transition: 0.3s;
  }

  &:focus {
    border-color: ${(props) =>
      props.isInvalid ? errorColor1 : "rgb(38, 93, 151)"};
    background-color: rgb(23, 58, 94);
    transition: 0.3s;
    outline: none;
    color: ${textColor2};
  }

  &:focus-within {
    color: ${textColor2};
  }
`;

export const Error = styled(Small)`
  color: ${errorColor1} !important;
  font-weight: bold;
  display: block;
`;

interface IProps {
  placeholder: string;
  id: string;
  buttonName?: string;
  buttonAction?: Function;
  errorMessage?: string;
  onChange?: Function;
  disabled?: boolean;
}

const Input = React.forwardRef(
  (
    {
      placeholder,
      id,
      buttonName,
      buttonAction,
      errorMessage,
      onChange,
      disabled,
    }: IProps,
    ref?: React.MutableRefObject<any>
  ) => {
    return (
      <>
        <InputContainer>
          <TextInput
            type={"text"}
            placeholder={placeholder}
            id={id}
            isInvalid={!!errorMessage}
            ref={ref}
            onChange={() => (onChange ? onChange() : null)}
          />
          <Button
            isInvalid={disabled}
            onClick={(e) => (buttonAction ? buttonAction(e) : null)}
          >
            {buttonName}
          </Button>
        </InputContainer>
        {!!errorMessage && <Error>{errorMessage}</Error>}
      </>
    );
  }
);

export default Input;
