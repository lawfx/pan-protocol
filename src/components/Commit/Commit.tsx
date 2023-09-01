import { styled } from "styled-components";
import { parseGithubCommitMessage } from "../../utils/utils";

export default function Commit({ commit, selected, onClick }: { commit: any, selected: boolean, onClick: () => void }) {

  const { message, pr_num } = parseGithubCommitMessage(commit.commit.message);

  return (
    <Wrapper onClick={onClick} $selected={selected}>
      <div><strong>SHA:</strong> <span>{commit.sha.substring(0, 7)}</span></div>
      <div><strong>PR:</strong> <span>{!!pr_num ? `#${pr_num}` : 'N/A'}</span></div>
      <div><strong>Message:</strong> <CommitMessage>{message}</CommitMessage></div>
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