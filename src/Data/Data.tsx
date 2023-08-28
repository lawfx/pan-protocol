import { styled } from "styled-components";
import Input from "../Input/Input";
import { DataInfo } from "../models/data-info";
import React from "react";
import MonthPicker from "../MonthPicker/MonthPicker";
import FileInput from "../FileInput/FileInput";

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
    <Wrapper>
      <Input label="Name" value={data.name} setValue={onNameUpdated} placeholder='Namey McNameface' />
      <Input label="Position" value={data.position} setValue={onPositionUpdated} placeholder='Senior Chairwarmer' />
      <MonthPicker label="Month" value={data.date} onChange={onDateUpdated} placeholder='Select month' />
      <Input label="Creative hours" type="number" value={data.hours} setValue={onHoursUpdated} min="0" />
      <FileInput label="Choose protocol template" onFileUpload={onDocumentUploaded} allowedTypes={['application/vnd.openxmlformats-officedocument.wordprocessingml.document']} />
    </Wrapper>
  );
}

export default React.memo(Data);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;