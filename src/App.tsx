import React from 'react';
import styled from 'styled-components';
import { UserData } from './models/user-data.model';

import Button from './components/Button/Button';
import { DocumentData } from './models/document-data.model';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { DOCX_MIME_TYPE } from './constants/constants';
import { parseGithubCommitMessage } from './utils/utils';
import Header from './components/Header/Header';
import Data from './components/Data/Data';
import Commits from './components/Commits/Commits';

export default function App() {

  const [data, setData] = React.useState<UserData>({
    name: '',
    position: '',
    date: new Date(),
    hours: 0
  });
  const [file, setFile] = React.useState<string | ArrayBuffer | null>();
  console.log('data', data);

  const month = React.useMemo(() => !!data.date ? format(data.date, 'yyyy-MM') : '', [data]);
  const canGenerateDocx = !!data.name && !!data.position && !!month && !!data.hours && !!file;

  const setName = React.useCallback((name: string) => {
    setData(d => ({ ...d, name }));
  }, []);

  const setDate = React.useCallback((date: Date | null) => {
    setData(d => ({ ...d, date: date }));
  }, []);

  const setHours = React.useCallback((hours: string) => {
    setData(d => ({ ...d, hours: isNaN(+hours) ? d.hours : +hours }));
  }, []);

  const setPosition = React.useCallback((position: string) => {
    setData(d => ({ ...d, position }));
  }, []);

  // function generateDocument() {
  //   const docData: DocumentData = compileData(data, commits);
  //   console.log(docData);

  //   const zip = new PizZip(file);
  //   const doc = new Docxtemplater(zip, {
  //     paragraphLoop: true,
  //     linebreaks: true,
  //   });

  //   doc.render({
  //     name: docData.userData.name,
  //     position: docData.userData.position,
  //     date: docData.userData.date,
  //     hours: docData.userData.hours,
  //     prs: docData.commits.map(c => ({ title: c.message, num: c.prNum, sha: c.sha, hour: 5 }))
  //   });

  //   const blob = doc.getZip().generate({
  //     type: "blob",
  //     mimeType: DOCX_MIME_TYPE,
  //     compression: "DEFLATE",
  //   });

  //   saveAs(blob, `${docData.userData.name}_${docData.userData.date}_procotol.docx`);
  // }

  // function compileData(data: DataInfo, commits: CommitState[]): DocumentData {
  //   return {
  //     userData: { ...data, date: format(data.date!, 'MM/yyyy') },
  //     commits: commits.map(c => {
  //       if (!c.selected) return null as any; //TODO change
  //       const messageData = parseGithubCommitMessage(c.commit.commit.message);
  //       return {
  //         repo: 'some repo', //TODo change
  //         sha: c.commit.sha.substring(0, 7),
  //         message: messageData.message,
  //         prNum: messageData.prNum
  //       }
  //     }
  //     ).filter(r => !!r)
  //   }
  // }

  function handleUploadDocument(file: File | null) {
    if (file === null) {
      setFile(null);
      return;
    }

    const reader = new FileReader();

    reader.onerror = function (evt) {
      console.error("error reading file", evt);
    };

    reader.onload = function (evt) {
      const content = evt.target!.result;
      setFile(content);
    };

    reader.readAsBinaryString(file);
  }

  return (
    <Wrapper>
      <Header />
      <DataWrapper>
        <InnerDataWrapper>
          <Data
            data={data}
            onNameUpdated={setName}
            onDateUpdated={setDate}
            onHoursUpdated={setHours}
            onPositionUpdated={setPosition}
            onDocumentUploaded={handleUploadDocument} />
        </InnerDataWrapper>
        {/* <Button onClick={generateDocument} disabled={!canGenerateDocx}>Generate</Button> */}
      </DataWrapper>
      <Commits
        month={month}
      />
    </Wrapper>
  );
}

const Wrapper = styled.main`
  background-color: ${p => p.theme.primary100};
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-inline: 8px;
`;

const DataWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const InnerDataWrapper = styled.div`
  flex: 1;
`;