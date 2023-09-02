import { styled } from "styled-components";
import Input from "../Input/Input";

import FileInput from "../FileInput/FileInput";
import Section from "../Section/Section";
import MonthPicker from "../MonthPicker/MonthPicker";
import { DOCX_MIME_TYPE, QUERIES } from "../../constants/constants";
import DocumentGenerator from "../DocumentGenerator/DocumentGenerator";
import useUserData from "../../hooks/useUserData";
import { UserDataActionType } from "../UserDataProvider/UserDataProvider";
import React from "react";

export default function Data() {

  const { data, dispatch, uploadFile } = useUserData();

  const setDate = React.useCallback((date: Date | null) => {
    dispatch({ type: UserDataActionType.UPDATE_DATE, date });
  }, []);

  const setHours = React.useCallback((hours: string) => {
    dispatch({ type: UserDataActionType.UPDATE_HOURS, hours });
  }, []);

  return (
    <Section>
      <Wrapper>
        <MonthPicker label="Month" value={data.date} onChange={setDate} placeholder='Select month' />
        <Input label="Creative hours" type="text" value={data.hours} onChange={setHours} pattern='\d+' />
        <FileInput label="Select protocol..." onFileUpload={uploadFile} allowedTypes={[DOCX_MIME_TYPE]} />
        <DocumentGenerator />
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