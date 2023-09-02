import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormControl from '../FormControl/FormControl';
import StyledInput from '../StyledInput/StyledInput';

export default function MonthPicker({ label, value, onChange, placeholder }:
  {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    placeholder: string;
  }) {

  const id = React.useId();

  return (
    <FormControl id={id} label={label}>
      <DatePicker
        id={id}
        selected={value}
        onChange={onChange}
        dateFormat="MMMM yyyy"
        showMonthYearPicker
        placeholderText={placeholder}
        enableTabLoop={false}
        customInput={<StyledInput />}
      />
    </FormControl>
  );
}