import { Octokit } from "@octokit/rest";
import React from "react";
import { GitHubCommit, GitHubUser } from "../models/octokit.model";

export default function useGithub() {

  const [octokit, setOctokit] = React.useState<Octokit>();
  const [user, setUser] = React.useState<GitHubUser>();
  const [commits, setCommits] = React.useState<GitHubCommit[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<unknown>(null);

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
      setLoading(true);
      setError(null);
      setCommits([]);
      const commits = await octokit?.search.commits({
        q: `author:${user.login} author-date:${month}`,
        sort: 'author-date'
      });
      setLoading(false);

      if (!commits?.data.items) return;

      setCommits(commits.data.items);
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError(e);
    }
  }, [octokit, user]);

  const getUser = React.useCallback(async (octokit: Octokit): Promise<GitHubUser> => {
    const userData = await octokit.users.getAuthenticated();
    const user = userData.data;
    console.log(`Logged in as ${user.login}`);
    return user;
  }, [octokit, user]);

  return { connect, searchCommits, user, commits, loading, error };
}