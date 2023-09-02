import React from "react";
import styled from "styled-components";

function StyledTextarea({ value, onClick, onChange, ...rest }:
  {
    value: string;
    onClick: (e: any) => void;
    onChange: (val: string) => void;
    [key: string]: any;
  },
  ref: ((instance: HTMLTextAreaElement | null) => void) | React.MutableRefObject<HTMLTextAreaElement | null> | null) {

  return (
    <Textarea
      ref={ref}
      value={value}
      onChange={event => {
        onChange(event.target.value);
      }}
      {...rest}
    />
  );
};

export default React.forwardRef(StyledTextarea);

const Textarea = styled.textarea`
  all: unset;
  resize: vertical;
  background-color: ${p => p.theme.primary[100]};
  border-radius: 8px;
  padding: 2px 8px;

  &::placeholder {
    color: ${p => p.theme.secondary[100]};
  }

  &:focus {
    outline: 2px solid ${p => p.theme.secondary[200]};
    outline-offset: -2px;
  }
`;