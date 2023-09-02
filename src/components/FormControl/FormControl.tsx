import { ReactNode } from "react";
import styled from "styled-components";

export default function FormControl({ children, label, id, inline = false }:
  {
    children: ReactNode;
    label: string;
    id: string;
    inline?: boolean;
  }) {

  return (
    <Wrapper $inline={inline}>
      <label htmlFor={id}>
        {label}
      </label>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $inline: boolean }>`
  display: flex;
  flex-direction: ${p => p.$inline ? 'row' : 'column'};
  align-items: ${p => p.$inline ? 'center' : 'initial'};
  gap: ${p => p.$inline ? '8px' : '4px'};
`;