import { GitHubCommit } from "./octokit.model";

export interface CommitInfo {
  commit: GitHubCommit;
  selected: boolean;
  final_message: string;
  hours_spent: number;
}