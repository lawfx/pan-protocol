import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Commit from "../Commit/Commit";
import styled from "styled-components";
import { CommitsState } from "../App";
import { DateRange } from "../models/data-info";

function Commits({ repos, date, commits, setCommits, selectCommit, unselectCommit }:
  {
    repos: string[],
    date: DateRange,
    commits: CommitsState[],
    setCommits: React.Dispatch<React.SetStateAction<CommitsState[]>>,
    selectCommit: (repo: string, sha: string) => void,
    unselectCommit: (repo: string, sha: string) => void
  }) {

  const { getCommits } = React.useContext(GitHubContext);

  React.useEffect(() => {
    let valid = true;

    async function fetchCommits() {
      try {
        const commits = await getCommits(repos, date);
        if (!commits || !valid) return;
        setCommits(commits);
      } catch (e) {
        console.error(e);
      }
    }

    fetchCommits();

    return () => { valid = false; }
  }, [repos, date]);

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
      {!repos.length && <p>Select a repo to find commits...</p>}
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

export default React.memo(Commits);

const Wrapper = styled.section`
  padding: 8px;
`;

const CommitsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;