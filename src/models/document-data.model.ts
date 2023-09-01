import { CommitInfo } from "./commit.model";
import { UserData } from "./user-data.model";

export interface DocumentData extends Omit<UserData, 'date'> {
  date: string;
  lastDay: string;
  commits: CommitInfo[];
}