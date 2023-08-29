import React from "react";
import { ReactNode } from "react";
import styled from "styled-components";

export default function FormControl({ children, label }:
  {
    children: ReactNode,
    label: string
  }) {

  const id = React.useId();

  return (
    <Wrapper>
      <label htmlFor={id}>
        {label}
      </label>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;