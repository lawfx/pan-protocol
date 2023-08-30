import React, { ReactNode } from "react"
import useGithub from "../../hooks/useGithub";
import { CommitInfo } from "../../models/commit.model";
import { GitHubUser } from "../../models/octokit.model";

export const GitHubContext = React.createContext<{
  connect: (token: string) => Promise<void>;
  searchCommits: (month: string) => Promise<void>;
  user: GitHubUser;
  commits: CommitInfo[];
  toggleCommit: (sha: string, selected: boolean) => void;
}>(null as any);

export default function GithubProvider({ children }: { children: ReactNode }) {

  const github = useGithub();

  return (
    <GitHubContext.Provider value={github}>
      {children}
    </GitHubContext.Provider>
  );
}