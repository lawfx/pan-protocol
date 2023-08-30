import { format } from "date-fns";
import { CommitInfo } from "../models/commit.model";
import { DocumentData } from "../models/document-data.model";
import { UserData } from "../models/user-data.model";

export function parseGithubCommitMessage(message: string): { message: string, prNum: string } {
  const messageData = message.match(/(?<title>.+) (\(#(?<num>\d+)\))/);

  return {
    message: messageData?.groups?.title || message,
    prNum: messageData?.groups?.num || 'N/A'
  }
}

export function compileDocumentData(data: UserData, commits: CommitInfo[]): DocumentData {
  return {
    userData: { ...data, date: format(data.date!, 'MM/yyyy') },
    commits: commits.map(c => {
      if (!c.selected) return null as any; //TODO change
      const messageData = parseGithubCommitMessage(c.commit.commit.message);
      return {
        repo: c.commit.repository.full_name,
        sha: c.commit.sha.substring(0, 7),
        message: messageData.message,
        prNum: messageData.prNum
      }
    }
    ).filter(r => !!r)
  }
}