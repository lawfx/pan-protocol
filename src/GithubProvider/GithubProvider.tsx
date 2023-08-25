import React, { ReactNode } from "react"
import useGithub from "../hooks/useGithub";

export const GitHubContext = React.createContext<any>(null);

export default function GithubProvider({ children }: { children: ReactNode }) {

  const github = useGithub();

  return (
    <GitHubContext.Provider value={github}>{children}</GitHubContext.Provider>
  );
}