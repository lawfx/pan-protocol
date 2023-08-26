import React from 'react';
import Config from './Config/Config';
import { Config as ConfigModel } from './models/config';
import { GitHubContext } from './GithubProvider/GithubProvider';
import Repositories from './Repositories/Repositories';
import Login from './Login/Login';
import Commits from './Commits/Commits';
import styled from 'styled-components';

export default function App() {

  // const [config, setConfig] = React.useState<ConfigModel>({
  //   randomHours: true,
  //   docx: {
  //     name: "Nikolaos Ioannou",
  //     position: "Software Engineer",
  //     date: "03/2022",
  //     hours: 139
  //   }
  // });

  const [repos, setRepos] = React.useState<{ repo: any, selected: boolean }[]>([]);
  const [commits, setCommits] = React.useState<Map<string, any[]>>(new Map());

  const { user, getRepos } = React.useContext(GitHubContext);

  // function handleConfigChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
  //   setConfig(JSON.parse(e.target.value));
  // }

  console.log(repos);

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

  return (
    <Wrapper>
      <Login />
      <Repositories repos={repos} selectRepo={selectRepo} unselectRepo={unselectRepo} />
      <Commits repos={repos.filter(r => r.selected).map(r => r.repo.full_name)} commits={commits} setCommits={setCommits} />
      {/* <div>
        <Config config={JSON.stringify(config, null, 2)} setConfig={handleConfigChange} />
      </div> */}

    </Wrapper>
  )
}

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
