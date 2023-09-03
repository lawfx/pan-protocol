import styled from "styled-components";
import Login from "../Login/Login";
import Section from "../Section/Section";
import ThemeToggleIcon from "../ThemeToggleIcon/ThemeToggleIcon";
import Logo from "../../Logo/Logo";

export default function Header() {

  return (
    <StyledSection>
      <Logo />
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

const RightSide = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;