import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { FileIcon } from "@radix-ui/react-icons";

export default function FileInput({ onFileUpload, allowedTypes, label }:
  {
    onFileUpload: (file: File | null) => void,
    allowedTypes: string[],
    label: string
  }
) {

  const [filename, setFilename] = React.useState(label);
  const ref = React.useRef<any>();
  const id = React.useId();

  const handleOnChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      onFileUpload(null);
      setFilename(label);
      return;
    }

    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      ref.current.value = '';
      console.log('Not a valid mime type!');
      return;
    }

    onFileUpload(file);
    setFilename(file.name);
  }, [allowedTypes, label]);

  return (
    <Wrapper>
      <Button
        style={{
          width: '18px',
          height: '18px'
        }}
        onClick={() => ref.current.click()}>
        <StyledFileIcon />
      </Button>
      <FileName>{filename}</FileName>
      <HiddenInput ref={ref} type='file' id={id} onChange={handleOnChange} />
    </Wrapper>
  );
}

const HiddenInput = styled.input`
  display: none;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledFileIcon = styled(FileIcon)`
  width: 20px;
  height: 20px;
`;

const FileName = styled.span`
  max-width: calc(200px - 34px - 8px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;