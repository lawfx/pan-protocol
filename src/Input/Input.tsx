import React from "react";
import FormControl from "../FormControl/FormControl";
import StyledInput from "../StyledInput/StyledInput";

export default function Input({ type = 'text', value, onChange, label, ...rest }:
  {
    type?: string,
    value: any,
    onChange: (val: string) => void,
    label: string,
    [key: string]: any
  }) {

  const id = React.useId();

  return (
    <FormControl label={label}>
      <StyledInput
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </FormControl>
  );
}