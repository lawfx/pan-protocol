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
        {label}:
      </label>
      <DatePicker
        id={id}
        selected={value}
        onChange={onChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        placeholderText={placeholder}
        enableTabLoop={false}
      />
    </Wrapper>
  );
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;