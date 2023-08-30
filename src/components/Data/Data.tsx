import { styled } from "styled-components";
import Input from "../Input/Input";

import React from "react";
import FileInput from "../FileInput/FileInput";
import { UserData } from "../../models/user-data.model";
import Section from "../Section/Section";
import MonthPicker from "../MonthPicker/MonthPicker";
import { DOCX_MIME_TYPE } from "../../constants/constants";

function Data({ data, onNameUpdated, onDateUpdated, onHoursUpdated, onPositionUpdated, onDocumentUploaded }:
  {
    data: UserData,
    onNameUpdated: (name: string) => void,
    onDateUpdated: (date: Date | null) => void,
    onHoursUpdated: (hours: string) => void,
    onPositionUpdated: (position: string) => void,
    onDocumentUploaded: (file: File | null) => void
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