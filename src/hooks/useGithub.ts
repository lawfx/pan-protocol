import { Octokit } from "@octokit/rest";
import React from "react";
import { CommitInfo } from "../models/commit.model";
import { GitHubUser } from "../models/octokit.model";

export default function useGithub() {

  const [octokit, setOctokit] = React.useState<Octokit>();
  const [user, setUser] = React.useState<GitHubUser>();
  const [commits, setCommits] = React.useState<CommitInfo[]>([]);

  const connect = React.useCallback(async (token: string) => {
    const octokit = new Octokit({
      auth: token
    });
    const user = await getUser(octokit);
    setOctokit(octokit);
    setUser(user);
  }, []);

  const searchCommits = React.useCallback(async (month: string) => {
    if (!octokit || !user || !month) return;

    try {
      const commits = await octokit?.search.commits({
        q: `author:${user.login} author-date:${month}`,
        sort: 'author-date'
      });

      if (!commits?.data.items) return;

      setCommits(commits.data.items.map(c => ({ commit: c, selected: false })));
    } catch (e) {
      console.error(e);
    }
  }, [octokit, user]);

  const getUser = React.useCallback(async (octokit: Octokit): Promise<GitHubUser> => {
    const userData = await octokit.users.getAuthenticated();
    const user = userData.data;
    console.log(`Logged in as ${user.login}`);
    return user;
  }, [octokit, user]);

  const toggleCommit = React.useCallback((sha: string, selected: boolean) => {
    setCommits(commits => commits.map(c => {
      if (c.commit.sha !== sha) return c;
      return { ...c, selected };
    }));
  }, []);

  return { connect, searchCommits, user, commits, toggleCommit };
}