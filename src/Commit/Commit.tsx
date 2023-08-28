import { styled } from "styled-components";

export default function Commit({ commit, selected, onClick }: { commit: any, selected: boolean, onClick: () => void }) {

  return (
    <Wrapper onClick={onClick} selected={selected}>
      <div><strong>SHA:</strong> <span>{commit.sha.substring(0, 7)}</span></div>
      <div><strong>Commit message:</strong> <span>{commit.commit.message}</span></div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ selected: boolean }>`
  padding: 8px;
  background-color: ${p => p.selected ? p.theme.accentLight : p.theme.primaryLight};
  color: ${p => p.selected ? 'black' : 'white'};
  border: 1px solid ${p => p.theme.primaryLighter};
  border-radius: 8px;

  &:hover {
    background-color: ${p => p.selected ? p.theme.accentLight : p.theme.primaryLighter};
    border: 1px solid ${p => p.theme.primaryLight};
  }
`;