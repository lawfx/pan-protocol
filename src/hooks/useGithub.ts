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

      setCommits(commits.data.items.map(c => ({ commit: c, selected: false, final_message: c.commit.message, hours_spent: 0 })));
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

  const updateFinalMessage = React.useCallback((sha: string, message: string) => {
    setCommits(commits => commits.map(c => {
      if (c.commit.sha !== sha) return c;
      return { ...c, final_message: message };
    }));
  }, []);

  const updateHoursSpent = React.useCallback((sha: string, hours: string) => {
    setCommits(commits => commits.map(c => {
      if (c.commit.sha !== sha) return c;
      return { ...c, hours_spent: isNaN(+hours) ? c.hours_spent : +hours };
    }));
  }, []);

  return { connect, searchCommits, user, commits, toggleCommit, updateFinalMessage, updateHoursSpent };
}