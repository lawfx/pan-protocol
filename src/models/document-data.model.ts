import { UserData } from "./user-data.model";

export interface DocumentData {
  userData: Omit<UserData, 'date'> & { date: string };
  commits: {
    sha: string;
    message: string;
    prNum: string;
    repo: string;
  }[];
}