import styled from "styled-components";
import Login from "../Login/Login";
import Section from "../Section/Section";
import ThemeToggleIcon from "../ThemeToggleIcon/ThemeToggleIcon";

export default function Header() {

  return (
    <StyledSection>
      <Title src="name-logo.svg" alt='Logo'></Title>
      <RightSide>
        <ThemeToggleIcon /> |
        <Login />
      </RightSide>
    </StyledSection>
  );
}


const StyledSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`;

const Title = styled.img`
  height: 50px;
  filter: ${p => p.theme.logo};
`;

const RightSide = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;