import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Commit from "../Commit/Commit";
import styled from "styled-components";
import Button from "../Button/Button";

export default function Commits({ repos, commits, setCommits }: { repos: string[], commits: Map<string, any[]>, setCommits: (commits: any) => void }) {

  const { getCommits } = React.useContext(GitHubContext);

  async function handleCommits() {
    const commits = await getCommits(repos);
    console.log(commits);
    setCommits(commits);
  }

  return (
    <Wrapper>
      <Button onClick={handleCommits}>Get commits</Button>
      {
        [...commits].map(([repo, comms]) => (
          <React.Fragment key={repo}>
            <h5>{repo}</h5>
            <CommitsWrapper>
              {
                comms.map(c => (
                  <Commit key={c.sha} commit={c} />
                ))
              }
            </CommitsWrapper>
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