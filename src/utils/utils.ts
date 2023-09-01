import { format, lastDayOfMonth } from "date-fns";
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
    ...data,
    date: format(data.date!, 'MM/yyyy'),
    lastDay: format(lastDayOfMonth(data.date!), 'dd.MM.yyyy'),
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
    date: docData.date,
    hours: docData.hours,
    lastDay: docData.lastDay,
    prs: docData.commits.map(c => ({
      title: c.final_message,
      pr_num: c.pr_num !== 0 ? c.pr_num : 'N/A',
      sha: c.commit_sha,
      hour: c.hours_spent,
      repo: c.repo_name
    }))
  });

  const blob = doc.getZip().generate({
    type: "blob",
    mimeType: DOCX_MIME_TYPE,
    compression: "DEFLATE",
  });

  saveAs(blob, `${docData.date}_procotol.docx`);
}

export function calculateRandomHours(maxHours: number, numberOfResults: number, minHoursInSingleResult = 1): number[] {
  const randombit = maxHours - minHoursInSingleResult * numberOfResults;
  const out = [];

  for (let i = 0; i < numberOfResults; i++) {
    out.push(Math.random());
  }
  const mult = randombit / out.reduce((a, b) => a + b);
  const res = out.map((el) => Math.floor(el * mult + minHoursInSingleResult));
  const sum = res.reduce((a, b) => a + b);
  if (sum === maxHours) return res;
  const diff = maxHours - sum;
  res[0] += diff;
  return res;
}