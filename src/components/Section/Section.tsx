import { ReactNode } from "react";
import styled from "styled-components";

export default function Section({ className, children }:
  {
    className?: string;
    children: ReactNode;
  }) {

  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${p => p.theme.primary200};
  color: ${p => p.theme.textOnPrimary};
  border-radius: 8px;
`;