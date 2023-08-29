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
        {label}
      </label>
      <StyledInput
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

const StyledInput = styled.input`
  all: unset;
  width: 150px;
  height: 30px;
  line-height: 30px;
  background-color: ${p => p.theme.primary300};
  color: ${p => p.theme.secondary500};
  border-radius: 8px;
  padding: 2px 8px;

  &::placeholder {
    color: ${p => p.theme.secondary100};
  }
`;