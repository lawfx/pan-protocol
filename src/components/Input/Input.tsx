import React from "react";
import FormControl from "../FormControl/FormControl";
import StyledInput from "../StyledInput/StyledInput";

export default function Input({ type = 'text', value, onChange, label, inline = false, ...rest }:
  {
    type?: string,
    value: any,
    onChange: (val: string) => void,
    label: string,
    inline?: boolean,
    [key: string]: any
  }) {

  const id = React.useId();

  return (
    <FormControl id={id} label={label} inline={inline}>
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