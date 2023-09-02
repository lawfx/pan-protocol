import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";

function Button({ children, ...rest }:
  {
    children: ReactNode;
    [key: string]: any;
  },
  ref: ((instance: HTMLButtonElement | null) => void) | React.MutableRefObject<HTMLButtonElement | null> | null) {

  return (
    <StyledButton
      ref={ref}
      type='button'
      {...rest}>
      {children}
    </StyledButton>
  );
}

export default React.forwardRef(Button);

const StyledButton = styled.button`
  all: unset;
  outline: revert;
  font-weight: 700;
  padding: 8px;
  border-radius: 8px;
  background-color: ${p => p.theme.secondary[500]};
  color: ${p => p.theme.text.onSecondary};
  cursor: pointer;
  height: 30px;
  width: 100px;
  line-height: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover {
    background-color: ${p => p.theme.secondary[400]};
  }

  &:active {
    background-color: ${p => p.theme.secondary[300]};
  }

  &:disabled {
    background-color: ${p => p.theme.secondary[100]};
    cursor: not-allowed;
  }
`;