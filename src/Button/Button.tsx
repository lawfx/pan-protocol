import { ReactNode } from "react";
import styled from "styled-components";

export default function Button({ children, onClick, ...rest }: { children: ReactNode, onClick: () => void, [key: string]: any }) {

  return (
    <StyledButton type='button' onClick={onClick} {...rest}>{children}</StyledButton>
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
  box-shadow: 0 2px 0 ${p => p.theme.secondary200};
  transition: box-shadow 300ms, transform 300ms;
  cursor: pointer;
  height: 30px;
  width: 100px;
  line-height: 1;

  &:hover{
    transform: translateY(-2px);
    box-shadow: 0 4px 0 ${p => p.theme.secondary300};
  }

  &:active{
    transform: translateY(1px);
    box-shadow: 0 1px 0 ${p => p.theme.secondary200};
    transition: box-shadow 100ms, transform 100ms;
  }
`;