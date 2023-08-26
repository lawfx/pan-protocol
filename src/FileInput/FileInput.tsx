import React from "react";

export default function FileInput({ onFileUpload, allowedTypes }:
  { onFileUpload: (file: File) => void, allowedTypes: string[] }
) {

  const ref = React.useRef<any>();
  const id = React.useId();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) {
      alert("No file was chosen!");
      return;
    }

    const file = e.target.files[0];
    if (!allowedTypes.includes(file.type)) {
      ref.current.value = '';
      console.log('Not a valid mime type!');
      return;
    }

    onFileUpload(file);
  }

  return (
    <input ref={ref} type='file' id={id} onChange={handleOnChange} />
  );
}