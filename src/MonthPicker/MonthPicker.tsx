import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

export default function MonthPicker({ label, value, onChange, placeholder }:
  { label: string, value: Date | null, onChange: (date: Date | null) => void, placeholder: string }) {

  const id = React.useId();

  return (
    <Wrapper>
      <label htmlFor={id}>
        {label}
      </label>
      <DatePicker
        id={id}
        selected={value}
        onChange={onChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText={placeholder}
        enableTabLoop={false}
        customInput={<CustomInput />}
      />
    </Wrapper>
  );
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CustomInput = React.forwardRef(({ value, onClick, ...rest }: { value: string, onClick: (e: any) => void, [key: string]: any },
  ref: ((instance: HTMLInputElement | null) => void) | React.MutableRefObject<HTMLInputElement | null> | null) => (
  <StyledInput
    ref={ref}
    type='text'
    value={value}
    onClick={onClick}
    {...rest}
  />
));

const StyledInput = styled.input`
  all: unset;
  width: 150px;
  height: 30px;
  line-height: 30px;
  background-color: ${p => p.theme.primary300};
  border-radius: 8px;
  padding: 2px 8px;

  &::placeholder {
    color: ${p => p.theme.secondary100};
  }
`;