import React, { ReactNode } from "react"
import useGithub from "../hooks/useGithub";
import { CommitsState } from "../App";

export const GitHubContext = React.createContext<{
  connect: (token: string) => Promise<void>;
  getCommits: (repos: string[], from: string, to: string) => Promise<CommitsState[]>;
  user: any;
  getRepos: () => Promise<any>;
}>(null as any);

export default function GithubProvider({ children }: { children: ReactNode }) {

  const github = useGithub();

  return (
    <GitHubContext.Provider value={github}>{children}</GitHubContext.Provider>
  );
}