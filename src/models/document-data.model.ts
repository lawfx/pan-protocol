import { CommitInfo } from "./commit.model";

export interface DocumentData {
  hours: number;
  date: string;
  lastDay: string;
  commits: CommitInfo[];
}