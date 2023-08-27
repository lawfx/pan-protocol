import React from "react";
import styled from "styled-components";
import { GitHubContext } from "../GithubProvider/GithubProvider";

export default function Repositories({ repos, onReposUpdated, selectRepo, unselectRepo }: { repos: any[], onReposUpdated: (repos: any[]) => void, selectRepo: (id: string) => void, unselectRepo: (id: string) => void }) {

  const { user, getRepos } = React.useContext(GitHubContext);

  React.useEffect(() => {
    let valid = true;
    async function fetchRepos() {
      const t = await getRepos();
      if (!t?.data || !valid) return;
      onReposUpdated(t.data);
    }

    fetchRepos();

    return () => { valid = false; };
  }, [user]);

  function handleClickRepo(id: string) {
    const repo = repos.find(r => r.repo.id === id);
    if (repo.selected) {
      unselectRepo(id);
    }
    else {
      selectRepo(id);
    }
  }

  return (
    <Wrapper>
      <ReposLabel>Repositories</ReposLabel>
      {!repos.length && <p>No repositories 😭</p>}
      {!!repos.length && <Repos>
        {repos.map(r => (
          <Repo type='button' selected={r.selected} key={r.repo.id} onClick={() => handleClickRepo(r.repo.id)}>
            {r.repo.full_name}
          </Repo>
        ))}
      </Repos>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  background-color: hsl(0deg, 0%, 90%);
  border-radius: 8px;
`;

const ReposLabel = styled.h4`
  margin: 0;
  padding: 8px;
  padding-inline-start: 0;
`;

const Repos = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Repo = styled.button<{ selected: boolean }>`
  padding: 8px;
  background-color: ${p => (p.selected ? 'green' : 'initial')};
  border: 2px solid hsl(0deg 0% 50%);
  border-radius: 8px;
  box-shadow: 2px 2px 0 hsl(0deg 0% 50%);
  cursor: pointer;
`;