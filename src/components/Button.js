import styled from "styled-components";

const buttonStyles = {
  primary: {
    main: "#4375f5",
    hover: "#5E89F9",
    active: "#3261DB",
    fontColor: '#FFFFFF'
  },
  secondary: {
    main: "#FFFFFF",
    hover: "#EFEFEF",
    active: "#D7D7D7",
    fontColor: '#000'
  }
};

export const Button = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  height: 32px;
  padding: 1px 17px 0px;
  border-radius: 50px;
  font-size: 14px;
  background-color: ${(p) => buttonStyles[p.type].main};
  border: none;
  color: ${(p) => buttonStyles[p.type].fontColor};

  &:hover {
    background-color: ${(p) => buttonStyles[p.type].hover};
  }

  &:active {
    background-color: ${(p) => buttonStyles[p.type].active};
    outline: 0;
  }
`;
