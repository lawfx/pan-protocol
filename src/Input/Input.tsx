import React from "react";
import { styled } from "styled-components";

export default function Input({ type = 'text', value, setValue, label, ...rest }:
  {
    type?: string,
    value: any,
    setValue: (val: string) => void,
    label: string,
    [key: string]: any
  }) {

  const id = React.useId();

  return (
    <Wrapper>
      <label htmlFor={id}>
        {label}:
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
        {...rest}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;