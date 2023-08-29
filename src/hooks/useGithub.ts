import { Octokit } from "@octokit/rest";
import React from "react";

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

  async function searchCommits(month: string) {
    if (!octokit || !month) return [];

    const commits = await octokit?.search.commits({
      q: `author:${user.login} author-date:${month}`,
      sort: 'author-date'
    });
    return commits?.data.items || [];
  }

  async function getUser(octokit: Octokit): Promise<any> {
    const userData = await octokit.users.getAuthenticated();
    const user = userData.data;
    console.log(`Logged in as ${user.login}`);
    return user;
  }

  return { connect, searchCommits, user };
}