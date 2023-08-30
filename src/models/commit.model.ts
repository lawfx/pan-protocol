import { GitHubCommit } from "./octokit.model";

export interface CommitInfo {
  commit: GitHubCommit;
  selected: boolean;
}