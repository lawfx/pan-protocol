import styled from "styled-components";
import Login from "../Login/Login";
import Section from "../Section/Section";
import { APP_TITLE } from "../../constants/constants";
import ThemeToggleIcon from "../ThemeToggleIcon/ThemeToggleIcon";

export default function Header() {

  return (
    <StyledSection>
      <Title>{APP_TITLE}</Title>
      <RightSide>
        <ThemeToggleIcon />
        <Login />
      </RightSide>
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

const RightSide = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;