import { Octokit } from "@octokit/rest";
import React from "react";
import { CommitsState } from "../App";

export default function useGithub() {

  const [octokit, setOctokit] = React.useState<Octokit>();
  const [user, setUser] = React.useState<any>();

  async function connect(token: string) {
    const octokit = new Octokit({
      auth: token
    });
    const user = await getUser(octokit);
    setOctokit(octokit);
    setUser(user);
  }

  async function getRepos() {
    if (!octokit) return [];

    return octokit.rest.repos.listForAuthenticatedUser();
  }

  async function getCommits(repos: string[]) {
    if (!octokit) return [];

    const commits = await processRepos(user, repos);
    return commits || [];
  }

  async function getUser(octokit: Octokit): Promise<any> {
    const userData = await octokit.users.getAuthenticated();
    const user = userData.data;
    console.log(`Logged in as ${user.login}`);
    return user;
  }

  async function processRepos(user: any, repos: string[]) {
    let data: CommitsState[] = [];
    for (let repo of repos) {
      const commits = await fetchCommits(user, repo, '');
      data.push({
        repoFullName: repo,
        commits: commits.map(c => ({ commit: c, selected: false }))
      });
    }
    return data;
  }

  async function fetchCommits(user: any, repo_fullname: string, date: string) {
    console.log('Searching repo:', repo_fullname);
    const [owner, repo] = repo_fullname.split('/');
    const { data } = await octokit!.rest.repos.listCommits({
      owner,
      repo,
      author: user.login,
      since: '2022-03-01',//getBeginningOfMonth(date),
      until: '2022-03-31',//getEndOfMonth(date),
      per_page: 100
    });
    return data;
  }

  // async function getCommitData(commit: any, repo: string) {
  //   const m = commit.commit.message.match(/(?<title>.+) (\(#(?<num>\d+)\))/);
  //   if (!m?.groups.num) {
  //     console.log(`Skipping commit ${commit.sha.substring(0, 7)}, message is not matching template.`);
  //     return;
  //   }
  //   return {
  //     title: m.groups.title,
  //     num: m.groups.num,
  //     sha: commit.sha.substring(0, 7),
  //     repo: repo.split('/')[1]
  //   };
  // }

  function getBeginningOfMonth(protocolDate: string): string {
    const [month, year] = protocolDate.split('/');
    const d = new Date(+year, +month - 1);
    return d.toISOString().replace('Z', '+00:00');
  }

  function getEndOfMonth(protocolDate: string): string {
    const [month, year] = protocolDate.split('/');
    const d = new Date(+year, +month);
    d.setMilliseconds(d.getMilliseconds() - 1);
    return d.toISOString().replace('Z', '+00:00');
  }

  return { connect, getCommits, user, getRepos };
}