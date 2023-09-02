import React from "react";
import FormControl from "../FormControl/FormControl";
import StyledTextarea from "../StyledTextarea/StyledTextarea";

export default function Textarea({ value, onChange, label, ...rest }:
  {
    value: any;
    onChange: (val: string) => void;
    label: string;
    [key: string]: any;
  }) {

  const id = React.useId();

  return (
    <FormControl id={id} label={label}>
      <StyledTextarea value={value} onChange={onChange} {...rest} />
    </FormControl>
  )
}