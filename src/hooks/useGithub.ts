import React from "react";
import { GitHubContext } from "../components/GithubProvider/GithubProvider";

export default function useGithub() {
  return React.useContext(GitHubContext);
}