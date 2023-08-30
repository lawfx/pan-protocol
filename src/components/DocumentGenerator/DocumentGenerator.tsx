import Docxtemplater from "docxtemplater";
import saveAs from "file-saver";
import PizZip from "pizzip";
import { DOCX_MIME_TYPE } from "../../constants/constants";
import { DocumentData } from "../../models/document-data.model";
import { compileDocumentData } from "../../utils/utils";
import Button from "../Button/Button";
import { UserData } from "../../models/user-data.model";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import React from "react";

export default function DocumentGenerator({ file, userData }:
  {
    file: string | ArrayBuffer | null;
    userData: UserData
  }) {

  const { commits } = React.useContext(GitHubContext);
  console.log('rendering document generator', commits);

  const canGenerateDocx = !!userData.name && !!userData.position && !!userData.date && !!userData.hours && !!file;

  function generateDocument() {
    const docData: DocumentData = compileDocumentData(userData, commits);
    console.log(docData);

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

  return (
    <Button onClick={generateDocument} disabled={!canGenerateDocx}>
      Generate
    </Button>
  );
}