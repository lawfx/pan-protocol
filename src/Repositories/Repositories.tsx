import React from "react";
import styled from "styled-components";
import { GitHubContext } from "../GithubProvider/GithubProvider";

function Repositories({ repos, onReposUpdated, onRepoSelected, onRepoUnselected }:
  {
    repos: any[],
    onReposUpdated: (repos: any[]) => void,
    onRepoSelected: (id: string) => void,
    onRepoUnselected: (id: string) => void
  }) {

  const { user, getRepos } = React.useContext(GitHubContext);

  React.useEffect(() => {
    let valid = true;
    async function fetchRepos() {
      try {
        const t = await getRepos();
        if (!t?.data || !valid) return;
        onReposUpdated(t.data);
      }
      catch (e) {
        console.error(e);
      }
    }

    fetchRepos();

    return () => { valid = false; }
  }, [user]);

  function handleClickRepo(id: string) {
    const repo = repos.find(r => r.repo.id === id);
    if (repo.selected) {
      onRepoUnselected(id);
    }
    else {
      onRepoSelected(id);
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

export default React.memo(Repositories);

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