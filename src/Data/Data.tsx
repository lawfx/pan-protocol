import { styled } from "styled-components";
import Input from "../Input/Input";
import { DataInfo } from "../models/data-info";
import React from "react";
import MonthPicker from "../MonthPicker/MonthPicker";
import FileInput from "../FileInput/FileInput";
import { DOCX_MIME_TYPE } from "../constants/constants";
import Section from "../Section/Section";

function Data({ data, onNameUpdated, onDateUpdated, onHoursUpdated, onPositionUpdated, onDocumentUploaded }:
  {
    data: DataInfo,
    onNameUpdated: (name: string) => void,
    onDateUpdated: (date: Date | null) => void,
    onHoursUpdated: (hours: string) => void,
    onPositionUpdated: (position: string) => void,
    onDocumentUploaded: (file: File) => void
  }) {

  return (
    <Section>
      <Wrapper>
        <Input label="Name" value={data.name} onChange={onNameUpdated} placeholder='Namey McNameface' />
        <Input label="Position" value={data.position} onChange={onPositionUpdated} placeholder='Senior Chairwarmer' />
        <MonthPicker label="Month" value={data.date} onChange={onDateUpdated} placeholder='Select month' />
        <Input label="Creative hours" type="text" value={data.hours} onChange={onHoursUpdated} pattern='\d+' />
        <FileInput label="Choose protocol template" onFileUpload={onDocumentUploaded} allowedTypes={[DOCX_MIME_TYPE]} />
      </Wrapper>
    </Section>
  );
}

export default React.memo(Data);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;