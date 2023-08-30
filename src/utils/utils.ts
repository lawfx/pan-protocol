import { format } from "date-fns";
import { CommitInfo } from "../models/commit.model";
import { DocumentData } from "../models/document-data.model";
import { UserData } from "../models/user-data.model";
import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
import PizZip from "pizzip";
import { DOCX_MIME_TYPE } from "../constants/constants";

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
    prs: docData.commits.map(c => ({ title: c.message, num: c.prNum, sha: c.sha, hour: 5 }))
  });

  const blob = doc.getZip().generate({
    type: "blob",
    mimeType: DOCX_MIME_TYPE,
    compression: "DEFLATE",
  });

  saveAs(blob, `${docData.userData.name}_${docData.userData.date}_procotol.docx`);
}