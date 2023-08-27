import { Octokit } from "@octokit/rest";
import React from "react";
import { CommitsState } from "../App";
import { DateRange } from "../models/data-info";

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

  async function getCommits(repos: string[], date: DateRange) {
    if (!octokit) return [];

    const commits = await processRepos(user, repos, date);
    return commits || [];
  }

  async function getUser(octokit: Octokit): Promise<any> {
    const userData = await octokit.users.getAuthenticated();
    const user = userData.data;
    console.log(`Logged in as ${user.login}`);
    return user;
  }

  async function processRepos(user: any, repos: string[], date: DateRange) {
    let data: CommitsState[] = [];
    for (let repo of repos) {
      const commits = await fetchCommits(user, repo, date);
      data.push({
        repoFullName: repo,
        commits: commits.map(c => ({ commit: c, selected: false }))
      });
    }
    return data;
  }

  async function fetchCommits(user: any, repo_fullname: string, date: DateRange) {
    console.log('Searching repo:', repo_fullname);
    const [owner, repo] = repo_fullname.split('/');
    const { data } = await octokit!.rest.repos.listCommits({
      owner,
      repo,
      author: user.login,
      ...(!!date.from ? { since: date.from } : {}),
      ...(!!date.to ? { until: date.to } : {})
    });
    return data;
  }

  // function getBeginningOfMonth(protocolDate: string): string {
  //   const [month, year] = protocolDate.split('/');
  //   const d = new Date(+year, +month - 1);
  //   return d.toISOString().replace('Z', '+00:00');
  // }

  // function getEndOfMonth(protocolDate: string): string {
  //   const [month, year] = protocolDate.split('/');
  //   const d = new Date(+year, +month);
  //   d.setMilliseconds(d.getMilliseconds() - 1);
  //   return d.toISOString().replace('Z', '+00:00');
  // }

  return { connect, getCommits, user, getRepos };
}