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
border: 2px solid hsl(0deg 0% 50%);
border-radius: 8px;
box-shadow: 2px 2px 0 hsl(0deg 0% 50%);
background-color: ${p => (p.selected ? 'green' : 'initial')};
`;