import React from 'react';
import styled from 'styled-components';
import { UserData } from './models/user-data.model';

import { format } from 'date-fns';
import Header from './components/Header/Header';
import Data from './components/Data/Data';
import Commits from './components/Commits/Commits';
import DocumentGenerator from './components/DocumentGenerator/DocumentGenerator';

export default function App() {

  const [data, setData] = React.useState<UserData>({
    name: '',
    position: '',
    date: new Date(),
    hours: 0
  });
  const [file, setFile] = React.useState<string | ArrayBuffer | null>(null);
  console.log('data', data);

  const month = React.useMemo(() => !!data.date ? format(data.date, 'yyyy-MM') : '', [data]);

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
        <DocumentGenerator file={file} userData={data} />
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