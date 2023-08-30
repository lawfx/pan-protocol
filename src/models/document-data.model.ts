import { UserData } from "./user-data.model";

export interface DocumentData {
  userData: Omit<UserData, 'date'> & { date: string };
  commits: DocumentDataCommit[];
}

export interface DocumentDataCommit {
  sha: string;
  message: string;
  hours_spend: number;
  prNum: string;
  repo: string;
}