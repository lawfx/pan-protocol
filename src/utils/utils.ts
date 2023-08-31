import { format } from "date-fns";
import { CommitInfo } from "../models/commit.model";
import { DocumentData } from "../models/document-data.model";
import { UserData } from "../models/user-data.model";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
import PizZip from "pizzip";
import { DOCX_MIME_TYPE, MERGE_REGEX, SQUASH_AND_MERGE_REGEX } from "../constants/constants";

export function parseGithubCommitMessage(message: string): { message: string, pr_num: number } {
  let messageData = message.match(SQUASH_AND_MERGE_REGEX);
  if (!messageData?.groups) {
    messageData = message.match(MERGE_REGEX);
  }

  return {
    message: messageData?.groups?.message || message,
    pr_num: messageData?.groups?.pr ? +messageData.groups.pr : 0
  }
}

export function compileDocumentData(data: UserData, commits: CommitInfo[]): DocumentData {
  return {
    userData: { ...data, date: format(data.date!, 'MM/yyyy') },
    commits: commits
      .map<CommitInfo>(c => {
        return {
          ...c,
          commit_sha: c.commit_sha.substring(0, 7)
        }
      }
      )
  }
}

export function generateDocument(file: string | ArrayBuffer | null, userData: UserData, commits: CommitInfo[]) {
  if (!file) return;

  const docData: DocumentData = compileDocumentData(userData, commits);

  const zip = new PizZip(file);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render({
    name: docData.userData.name,
    position: docData.userData.position,
    date: docData.userData.date,
    hours: docData.userData.hours,
    prs: docData.commits.map(c => ({
      title: c.final_message,
      num: c.pr_num !== 0 ? c.pr_num : 'N/A',
      sha: c.commit_sha,
      hour: c.hours_spent
    }))
  });

  const blob = doc.getZip().generate({
    type: "blob",
    mimeType: DOCX_MIME_TYPE,
    compression: "DEFLATE",
  });

  saveAs(blob, `${docData.userData.name}_${docData.userData.date}_procotol.docx`);
}