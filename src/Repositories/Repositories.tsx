import React from "react";
import styled from "styled-components";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Section from "../Section/Section";

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
    <Section>
      <ReposLabel>Repositories</ReposLabel>
      <Repos>
        {!repos.length && <p>No repositories 😭</p>}
        {!!repos.length && repos.map(r => (
          <Repo type='button' selected={r.selected} key={r.repo.id} onClick={() => handleClickRepo(r.repo.id)}>
            {r.repo.full_name}
          </Repo>
        )
        )}
      </Repos>
    </Section>
  )
}

export default React.memo(Repositories);

const ReposLabel = styled.h4`
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid ${p => p.theme.primaryLighter};
`;

const Repos = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

const Repo = styled.button<{ selected: boolean }>`
  padding: 8px;
  background-color: ${p => p.selected ? p.theme.accentLight : p.theme.primaryLight};
  color: ${p => p.selected ? 'black' : 'white'};
  border: 1px solid ${p => p.theme.primaryLighter};
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${p => p.selected ? p.theme.accentLight : p.theme.primaryLighter};
  }
`;