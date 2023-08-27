import { styled } from "styled-components";
import Input from "../Input/Input";
import { DataInfo } from "../models/data-info";
import React from "react";

function Data({ data, setName, setDateFrom, setDateTo, setHours, setPosition }:
  {
    data: DataInfo, setName: (name: string) => void,
    setDateFrom: (date: string) => void,
    setDateTo: (date: string) => void,
    setHours: (hours: string) => void,
    setPosition: (position: string) => void
  }) {

  return (
    <Wrapper>
      <Input label="Name" value={data.name} setValue={setName} />
      <Input label="Position" value={data.position} setValue={setPosition} />
      <Input label="From" type="date" value={data.date.from} setValue={setDateFrom} max={data.date.to} />
      <Input label="To" type="date" value={data.date.to} setValue={setDateTo} min={data.date.from} />
      <Input label="Creative hours" type="number" value={data.hours} setValue={setHours} min="0" />
    </Wrapper>
  );
}

export default React.memo(Data);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;