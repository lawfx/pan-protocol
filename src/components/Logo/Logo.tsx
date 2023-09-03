import styled from "styled-components";

export default function Logo() {

  return (
    <Wrapper>
      <Image src="logo.svg" alt="Logo" />
      <TitleWrapper>
        <Title>Pan</Title>
        <Title>Protocol</Title>
      </TitleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: stretch;
`;

const Image = styled.img`
  height: 4rem;
  filter: ${p => p.theme.logo};
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Title = styled.h2`
  line-height: 1;
`;