import { styled } from "styled-components";
import Input from "../Input/Input";
import { DataInfo } from "../models/data-info";
import React from "react";
import MonthPicker from "../MonthPicker/MonthPicker";

function Data({ data, setName, setDate, setHours, setPosition }:
  {
    data: DataInfo, setName: (name: string) => void,
    setDate: (date: Date | null) => void,
    setHours: (hours: string) => void,
    setPosition: (position: string) => void
  }) {

  return (
    <Wrapper>
      <Input label="Name" value={data.name} setValue={setName} placeholder='Namey McNameface' />
      <Input label="Position" value={data.position} setValue={setPosition} placeholder='Senior Chairwarmer' />
      <MonthPicker label="Month" value={data.date} onChange={setDate} placeholder='Select month' />
      <Input label="Creative hours" type="number" value={data.hours} setValue={setHours} min="0" />
    </Wrapper>
  );
}

export default React.memo(Data);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;