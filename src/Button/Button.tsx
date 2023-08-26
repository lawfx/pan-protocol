import { ReactNode } from "react";
import styled from "styled-components";

export default function Button({ children, onClick, ...rest }: { children: ReactNode, onClick: () => void, [key: string]: any }) {

  return (
    <StyledButton type='button' onClick={onClick} {...rest}>{children}</StyledButton>
  );
}

const StyledButton = styled.button`
  font-size: 1rem;
  font-weight: 700;
  padding: 8px;
  border: none;
  border-radius: 8px;
  background-color: hsl(0deg, 0%, 90%);
  box-shadow: 0 2px 0 hsl(0deg 0% 50%);
  transition: box-shadow 300ms, transform 300ms;

  &:hover{
    transform: translateY(-2px);
    box-shadow: 0 4px 0 hsl(0deg 0% 50%);
  }

  &:active{
    transform: translateY(1px);
    box-shadow: 0 1px 0 hsl(0deg 0% 50%);
    transition: box-shadow 100ms, transform 100ms;
  }
`;