import { DataInfo } from "./data-info";

export interface DocumentData {
  userData: Omit<DataInfo, 'date'> & { date: string };
  commits: {
    sha: string;
    message: string;
    prNum: string;
    repo: string;
  }[];
}