import { styled } from "styled-components";
import { parseGithubCommitMessage } from "../../utils/utils";
import { GithubCommit } from "../../models/octokit.model";

export default function Commit({ commit, selected, onClick }:
  {
    commit: GithubCommit;
    selected: boolean;
    onClick: () => void;
  }) {

  const { message, pr_num } = parseGithubCommitMessage(commit.commit.message);

  return (
    <Wrapper onClick={onClick} $selected={selected}>
      <div><strong>SHA:</strong> <span>{commit.sha.substring(0, 7)}</span></div>
      <div><strong>PR:</strong> <span>{!!pr_num ? `#${pr_num}` : 'N/A'}</span></div>
      <div><strong>Message:</strong> <CommitMessage>{message}</CommitMessage></div>
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $selected: boolean }>`
  all: unset;
  padding: 8px;
  background-color: ${p => p.$selected ? p.theme.secondary[400] : p.theme.primary[200]};
  color: ${p => p.$selected ? p.theme.text.onSecondary : p.theme.text.onPrimary};
  border-radius: 8px;

  &:hover {
    background-color: ${p => p.$selected ? p.theme.secondary[500] : p.theme.primary[400]};
  }

  &:focus {
    outline-offset: 2px;
    outline: 2px solid ${p => p.theme.secondary[500]};
  }
`;

const CommitMessage = styled.span`
  white-space: pre-line;
`;