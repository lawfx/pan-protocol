import React from 'react';
import { GitHubContext } from './GithubProvider/GithubProvider';
import Repositories from './Repositories/Repositories';
import Login from './Login/Login';
import Commits from './Commits/Commits';
import styled from 'styled-components';
import { DataInfo } from './models/data-info';
import Data from './Data/Data';

export default function App() {

  const [repos, setRepos] = React.useState<{ repo: any, selected: boolean }[]>([]);
  const [commits, setCommits] = React.useState<Map<string, any[]>>(new Map());
  const [data, setData] = React.useState<DataInfo>({
    name: '',
    position: '',
    date: '',
    hours: 0
  });

  const { user, getRepos } = React.useContext(GitHubContext);

  console.log(repos, data);

  React.useEffect(() => {
    async function fetchRepos() {
      const t = await getRepos();
      if (!!t?.data) {
        setRepos(t.data.map((d: any) => ({ repo: d, selected: false })));
        console.log(t.data);
      }
    }

    fetchRepos();
  }, [user]);


  function selectRepo(id: string) {
    setRepos(repos => repos.map(r => {
      if (r.repo.id === id) return { repo: r.repo, selected: true };
      return r;
    }));
  }

  function unselectRepo(id: string) {
    setRepos(repos => repos.map(r => {
      if (r.repo.id === id) return { repo: r.repo, selected: false };
      return r;
    }));
  }

  function setName(name: string) {
    setData(d => ({ ...d, name }));
  }

  function setDate(date: string) {
    setData(d => ({ ...d, date: date }));
  }

  function setHours(hours: string) {
    setData(d => ({ ...d, hours: +hours }));
  }

  function setPosition(position: string) {
    setData(d => ({ ...d, position }));
  }

  return (
    <Wrapper>
      <LoginWrapper>
        <Login />
      </LoginWrapper>
      <RepositoriesWrapper>
        <Repositories repos={repos} selectRepo={selectRepo} unselectRepo={unselectRepo} />
      </RepositoriesWrapper>
      <DataWrapper>
        <Data data={data} setName={setName} setDate={setDate} setHours={setHours} setPosition={setPosition} />
      </DataWrapper>
      <CommitsWrapper>
        <Commits repos={repos.filter(r => r.selected).map(r => r.repo.full_name)} commits={commits} setCommits={setCommits} />
      </CommitsWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: grid;
  grid-template-areas:
  "login login"
  "repos data"
  "commits data";
  gap: 8px;
`;

const LoginWrapper = styled.div`
  grid-area: login;
`;

const RepositoriesWrapper = styled.div`
  grid-area: repos;
`;

const DataWrapper = styled.div`
  grid-area: data;
`;

const CommitsWrapper = styled.div`
  grid-area: commits;
`;