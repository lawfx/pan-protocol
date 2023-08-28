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
  background-color: ${props => props.theme.primaryLight};
  color: white;
  border-radius: 8px;
`;