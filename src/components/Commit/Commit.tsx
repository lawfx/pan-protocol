import { styled } from "styled-components";

export default function Commit({ commit, selected, onClick }: { commit: any, selected: boolean, onClick: () => void }) {

  return (
    <Wrapper onClick={onClick} $selected={selected}>
      <div><strong>SHA:</strong> <span>{commit.sha.substring(0, 7)}</span></div>
      <div><strong>Message:</strong> <CommitMessage>{commit.commit.message}</CommitMessage></div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $selected: boolean }>`
  padding: 8px;
  background-color: ${p => p.$selected ? p.theme.secondary400 : p.theme.primary200};
  color: ${p => p.$selected ? p.theme.textOnSecondary : p.theme.textOnPrimary};
  border: 1px solid ${p => p.theme.primary300};
  border-radius: 8px;

  &:hover {
    background-color: ${p => p.$selected ? p.theme.secondary500 : p.theme.primary300};
    border: 1px solid ${p => p.theme.primary200};
  }
`;

const CommitMessage = styled.span`
  white-space: pre-line;
`;