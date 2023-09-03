import { Octokit } from "@octokit/rest";
import React from "react";
import { GithubCommit, GithubUser } from "../models/octokit.model";

export default function useOctokit() {

  const [octokit, setOctokit] = React.useState<Octokit>();
  const [user, setUser] = React.useState<GithubUser>();
  const [commits, setCommits] = React.useState<GithubCommit[]>([]);
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

  const searchCommits = React.useCallback(async (month: string, signal: AbortSignal) => {
    if (!octokit || !user || !month) return;

    try {
      setLoading(true);
      setError(null);
      setCommits([]);
      const commits = await octokit?.search.commits({
        q: `author:${user.login} author-date:${month}`,
        sort: 'author-date',
        per_page: 100,
        request: {
          signal
        }
      });
      setLoading(false);

      if (!commits?.data.items) return;

      setCommits(commits.data.items);
    } catch (e: any) {
      if (e?.name === 'AbortError') return;
      console.error(e);
      setLoading(false);
      setError(e);
    }
  }, [octokit, user]);

  const getUser = React.useCallback(async (octokit: Octokit): Promise<GithubUser> => {
    const userData = await octokit.users.getAuthenticated();
    const user = userData.data;
    console.log(`Logged in as ${user.login}`);
    return user;
  }, [octokit, user]);

  return { connect, searchCommits, user, commits, loading, error };
}