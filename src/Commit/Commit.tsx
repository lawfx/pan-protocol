import { styled } from "styled-components";
import { parseGithubCommitMessage } from "../utils/utils";

export default function Commit({ commit, selected, onClick }: { commit: any, selected: boolean, onClick: () => void }) {

  const messageData = parseGithubCommitMessage(commit.commit.message);

  return (
    <Wrapper onClick={onClick} selected={selected}>
      <div><strong>SHA:</strong> <span>{commit.sha.substring(0, 7)}</span></div>
      <div><strong>PR:</strong> <span>{messageData.prNum !== 'N/A' && '#'}{messageData.prNum}</span></div>
      <div><strong>Message:</strong> <span>{commit.commit.message}</span></div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ selected: boolean }>`
  padding: 8px;
  background-color: ${p => p.selected ? p.theme.secondary400 : p.theme.primary200};
  color: ${p => p.selected ? p.theme.textOnSecondary : p.theme.textOnPrimary};
  border: 1px solid ${p => p.theme.primary300};
  border-radius: 8px;

  &:hover {
    background-color: ${p => p.selected ? p.theme.secondary200 : p.theme.primary300};
    border: 1px solid ${p => p.theme.primary200};
  }
`;