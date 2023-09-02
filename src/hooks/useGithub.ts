import React from "react";
import { GithubContext } from "../components/GithubProvider/GithubProvider";

export default function useGithub() {
  return React.useContext(GithubContext);
}