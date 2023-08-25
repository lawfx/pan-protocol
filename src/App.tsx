import React from 'react';
import Config from './Config/Config';
import { Config as ConfigModel } from './models/config';
import { GitHubContext } from './GithubProvider/GithubProvider';
import Repositories from './Repositories/Repositories';
import Login from './Login/Login';
import Commits from './Commits/Commits';

function App() {

  // const [config, setConfig] = React.useState<ConfigModel>({
  //   randomHours: true,
  //   docx: {
  //     name: "Nikolaos Ioannou",
  //     position: "Software Engineer",
  //     date: "03/2022",
  //     hours: 139
  //   }
  // });

  const [repos, setRepos] = React.useState<any[]>([]);
  const [selectedRepos, setSelectedRepos] = React.useState<string[]>([]);
  const [commits, setCommits] = React.useState<Map<string, any[]>>(new Map());

  const { user, getRepos } = React.useContext(GitHubContext);

  // function handleConfigChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
  //   setConfig(JSON.parse(e.target.value));
  // }

  React.useEffect(() => {
    async function fetchRepos() {
      const t = await getRepos();
      if (!!t?.data) {
        setRepos(t.data);
        console.log(t.data);
      }
    }

    fetchRepos();
  }, [user]);


  function selectRepo(id: string) {
    setSelectedRepos(repos => [...repos, id]);
  }

  function unselectRepo(id: string) {
    setSelectedRepos(repos => repos.filter(r => r !== id));
  }

  return (
    <>
      <Login />
      <Repositories repos={repos} selectRepo={selectRepo} unselectRepo={unselectRepo} />
      <Commits repos={repos.filter(r => selectedRepos.includes(r.id)).map(r => r.full_name)} commits={commits} setCommits={setCommits} />
      {/* <div>
        <Config config={JSON.stringify(config, null, 2)} setConfig={handleConfigChange} />
      </div> */}

    </>
  )
}

export default App;
