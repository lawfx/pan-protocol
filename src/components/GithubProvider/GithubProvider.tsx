import React, { ReactNode } from "react"
import useGithub from "../../hooks/useGithub";
import { CommitInfo } from "../../models/commit.model";
import { GitHubCommit, GitHubUser } from "../../models/octokit.model";

export const GitHubContext = React.createContext<{
  connect: (token: string) => Promise<void>;
  searchCommits: (month: string) => Promise<void>;
  user: GitHubUser;
  commits: GitHubCommit[];
  selectedCommits: CommitInfo[];
  toggleCommit: (sha: string, selected: boolean) => void;
  updateFinalMessage: (sha: string, message: string) => void;
  updateHoursSpent: (sha: string, hours: string) => void;
  loading: boolean;
  error: unknown;
}>(null as any);

export default function GithubProvider({ children }: { children: ReactNode }) {

  const { commits, ...rest } = useGithub();
  const [selectedCommits, setSelectedCommits] = React.useState<CommitInfo[]>([]);

  const toggleCommit = React.useCallback((sha: string, selected: boolean) => {
    if (selected) {
      const commit = commits.find(c => c.sha === sha);
      if (!commit) return;
      setSelectedCommits(sc => [...sc, { commit_sha: sha, final_message: commit.commit.message, hours_spent: 0 }])
    }
    else {
      setSelectedCommits(sc => sc.filter(c => c.commit_sha !== sha));
    }
  }, [commits]);

  const updateFinalMessage = React.useCallback((sha: string, message: string) => {
    setSelectedCommits(sc => sc.map(c => {
      if (c.commit_sha !== sha) return c;
      return { ...c, final_message: message };
    }));
  }, []);

  const updateHoursSpent = React.useCallback((sha: string, hours: string) => {
    setSelectedCommits(sc => sc.map(c => {
      if (c.commit_sha !== sha) return c;
      return { ...c, hours_spent: isNaN(+hours) ? c.hours_spent : +hours };
    }));
  }, []);

  return (
    <GitHubContext.Provider value={{ commits, ...rest, selectedCommits, toggleCommit, updateFinalMessage, updateHoursSpent }}>
      {children}
    </GitHubContext.Provider >
  );
}