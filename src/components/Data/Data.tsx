import { styled } from "styled-components";
import Input from "../Input/Input";

import React from "react";
import FileInput from "../FileInput/FileInput";
import { UserData } from "../../models/user-data.model";
import Section from "../Section/Section";
import MonthPicker from "../MonthPicker/MonthPicker";
import { DOCX_MIME_TYPE, QUERIES } from "../../constants/constants";
import DocumentGenerator from "../DocumentGenerator/DocumentGenerator";

function Data({ data, onDateUpdated, onHoursUpdated, onDocumentUploaded }:
  {
    data: UserData,
    onDateUpdated: (date: Date | null) => void,
    onHoursUpdated: (hours: string) => void,
    onDocumentUploaded: (file: File | null) => void
  }) {

  return (
    <Section>
      <Wrapper>
        <MonthPicker label="Month" value={data.date} onChange={onDateUpdated} placeholder='Select month' />
        <Input label="Creative hours" type="text" value={data.hours} onChange={onHoursUpdated} pattern='\d+' />
        <FileInput label="Select protocol..." onFileUpload={onDocumentUploaded} allowedTypes={[DOCX_MIME_TYPE]} />
        <DocumentGenerator userData={data} />
      </Wrapper>
    </Section>
  );
}

export default React.memo(Data);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;
  gap: 8px;

  @media ${QUERIES.tabletAndSmaller}{
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
`;