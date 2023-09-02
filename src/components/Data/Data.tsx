import { styled } from "styled-components";
import Input from "../Input/Input";

import React from "react";
import FileInput from "../FileInput/FileInput";
import Section from "../Section/Section";
import MonthPicker from "../MonthPicker/MonthPicker";
import { DOCX_MIME_TYPE, QUERIES } from "../../constants/constants";
import DocumentGenerator from "../DocumentGenerator/DocumentGenerator";
import { UserDataContext } from "../UserDataProvider/UserDataProvider";

export default function Data() {

  const { data, setHours, setDate, setFile } = React.useContext(UserDataContext);

  return (
    <Section>
      <Wrapper>
        <MonthPicker label="Month" value={data.date} onChange={setDate} placeholder='Select month' />
        <Input label="Creative hours" type="text" value={data.hours} onChange={setHours} pattern='\d+' />
        <FileInput label="Select protocol..." onFileUpload={setFile} allowedTypes={[DOCX_MIME_TYPE]} />
        <DocumentGenerator userData={data} />
      </Wrapper>
    </Section>
  );
}

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