import styled from "styled-components";
import Login from "../Login/Login";
import Section from "../Section/Section";

export default function Header() {

  return (
    <StyledSection>
      <Title>Protocol Maker OmniMax 9000</Title>
      <Login />
    </StyledSection>
  );
}


const StyledSection = styled(Section)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const Title = styled.h2`
  margin: 0;
`;