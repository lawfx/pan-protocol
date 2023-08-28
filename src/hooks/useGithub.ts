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

    return octokit.rest.repos.listForAuthenticatedUser({
      sort: 'pushed'
    });
  }

  async function getCommits(repos: string[], from: string, to: string) {
    if (!octokit) return [];

    const commits = await processRepos(user, repos, from, to);
    return commits || [];
  }

  async function getUser(octokit: Octokit): Promise<any> {
    const userData = await octokit.users.getAuthenticated();
    const user = userData.data;
    console.log(`Logged in as ${user.login}`);
    return user;
  }

  async function processRepos(user: any, repos: string[], from: string, to: string) {
    let data: CommitsState[] = [];
    for (let repo of repos) {
      const commits = await fetchCommits(user, repo, from, to);
      data.push({
        repoFullName: repo,
        commits: commits.map(c => ({ commit: c, selected: false }))
      });
    }
    return data;
  }

  async function fetchCommits(user: any, repo_fullname: string, from: string, to: string) {
    console.log('Searching repo:', repo_fullname);
    const [owner, repo] = repo_fullname.split('/');
    const { data } = await octokit!.rest.repos.listCommits({
      owner,
      repo,
      author: user.login,
      ...(!!from ? { since: from } : {}),
      ...(!!to ? { until: to } : {})
    });
    return data;
  }

  return { connect, getCommits, user, getRepos };
}