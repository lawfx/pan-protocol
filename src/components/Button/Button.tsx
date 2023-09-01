import { ReactNode } from "react";
import styled from "styled-components";

export default function Button({ children, style, onClick, ...rest }:
  {
    style?: { [key: string]: any },
    children: ReactNode,
    onClick: () => void,
    [key: string]: any
  }) {

  return (
    <StyledButton type='button' style={style} onClick={onClick} {...rest}>{children}</StyledButton>
  );
}

const StyledButton = styled.button`
  all: unset;
  outline: revert;
  font-weight: 700;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  background-color: ${p => p.theme.secondary500};
  color: ${p => p.theme.textOnSecondary};
  cursor: pointer;
  height: 30px;
  width: 100px;
  line-height: 1;

  &:hover {
    background-color: ${p => p.theme.secondary400};
  }

  &:active {
    background-color: ${p => p.theme.secondary300};
  }

  &:disabled {
    background-color: ${p => p.theme.secondary100};
    cursor: not-allowed;
  }
`;