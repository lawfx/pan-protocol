import { ReactNode } from "react";
import styled from "styled-components";

export default function Section({ children }: { children: ReactNode }) {

  return (
    <Wrapper>
      {children}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  background-color: ${p => p.theme.primary200};
  color: ${p => p.theme.textOnPrimary};
  border-radius: 8px;
`;