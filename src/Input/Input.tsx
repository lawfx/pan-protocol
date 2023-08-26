import React from "react";
import { styled } from "styled-components";

export default function Input({ type = 'text', value, setValue, label }: { type?: string, value: any, setValue: (val: string) => void, label: string }) {

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
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;