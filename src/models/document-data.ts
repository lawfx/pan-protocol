import { DataInfo } from "./data-info";

export interface DocumentData {
  userData: DataInfo;
  commits: {
    sha: string;
    message: string;
    prNum: number;
    repo: string;
  }[];
}