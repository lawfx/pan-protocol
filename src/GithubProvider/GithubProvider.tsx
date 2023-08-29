import React, { ReactNode } from "react"
import useGithub from "../hooks/useGithub";

export const GitHubContext = React.createContext<{
  connect: (token: string) => Promise<any>;
  searchCommits: (month: string) => Promise<any[]>;
  user: any;
}>(null as any);

export default function GithubProvider({ children }: { children: ReactNode }) {

  const github = useGithub();

  return (
    <GitHubContext.Provider value={github}>{children}</GitHubContext.Provider>
  );
}