import React from "react";
import styled from "styled-components";

function StyledInput({ value, onClick, onChange, ...rest }:
  {
    value: string;
    onClick: (e: any) => void;
    onChange: (val: string) => void;
    [key: string]: any;
  },
  ref: ((instance: HTMLInputElement | null) => void) | React.MutableRefObject<HTMLInputElement | null> | null) {

  return (
    <Input
      ref={ref}
      type='text'
      value={value}
      onClick={onClick}
      onChange={event => {
        onChange(event.target.value);
      }}
      {...rest}
    />
  );
};

export default React.forwardRef(StyledInput);

const Input = styled.input`
  all: unset;
  width: 134px;
  height: 30px;
  line-height: 30px;
  background-color: ${p => p.theme.primary100};
  border-radius: 8px;
  padding: 2px 8px;

  &::placeholder {
    color: ${p => p.theme.secondary100};
  }

  &:focus {
    outline: 2px solid ${p => p.theme.secondary200};
    outline-offset: -2px;
  }
`;