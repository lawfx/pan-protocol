import styled from 'styled-components';

import Header from './components/Header/Header';
import Data from './components/Data/Data';
import Commits from './components/Commits/Commits';
import Preview from './components/Preview/Preview';
import { QUERIES } from './constants/constants';

export default function App() {

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <DataWrapper>
        <Data />
      </DataWrapper>
      <CommitsWrapper>
        <Commits />
      </CommitsWrapper>
      <PreviewWrapper>
        <Preview />
      </PreviewWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  background-color: ${p => p.theme.primary[100]};
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-areas:
  'header header'
  'data data'
  'commits preview';
  gap: 8px;
  padding-inline: 8px;

  @media ${QUERIES.tabletAndSmaller}{
    display: flex;
    flex-direction: column;
  }
`;

const HeaderWrapper = styled.div`
  grid-area: header;
`;

const DataWrapper = styled.div`
  grid-area: data;
`;

const CommitsWrapper = styled.div`
  grid-area: commits;
`;

const PreviewWrapper = styled.div`
  grid-area: preview;
`;