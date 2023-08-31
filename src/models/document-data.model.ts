import { CommitInfo } from "./commit.model";
import { UserData } from "./user-data.model";

export interface DocumentData {
  userData: Omit<UserData, 'date'> & { date: string };
  commits: CommitInfo[];
}