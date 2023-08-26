import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Commit from "../Commit/Commit";
import styled from "styled-components";
import Button from "../Button/Button";
import { CommitsState } from "../App";

export default function Commits({ repos, commits, setCommits, selectCommit, unselectCommit }:
  {
    repos: string[],
    commits: CommitsState[],
    setCommits: React.Dispatch<React.SetStateAction<CommitsState[]>>,
    selectCommit: (repo: string, sha: string) => void,
    unselectCommit: (repo: string, sha: string) => void
  }) {

  const { getCommits } = React.useContext(GitHubContext);

  async function handleCommits() {
    const commits = await getCommits(repos);
    console.log(commits);
    setCommits(commits);
  }

  function handleClickCommit(repo: string, sha: string, selected: boolean) {
    if (selected) {
      unselectCommit(repo, sha);
    }
    else {
      selectCommit(repo, sha);
    }
  }

  return (
    <Wrapper>
      <Button onClick={handleCommits}>Get commits</Button>
      {
        commits.map(({ repoFullName, commits }) => (
          <React.Fragment key={repoFullName}>
            <h5>{repoFullName}</h5>
            {!commits.length && <p>No commits for {repoFullName}</p>}
            {!!commits.length && <CommitsWrapper>
              {
                commits.map(({ commit, selected }) => (
                  <Commit onClick={() => handleClickCommit(repoFullName, commit.sha, selected)} key={commit.sha} commit={commit} selected={selected} />
                ))
              }
            </CommitsWrapper>}
          </React.Fragment>
        )
        )
      }
    </Wrapper>
  );
}

const Wrapper = styled.section`
  padding: 8px;
`;

const CommitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;