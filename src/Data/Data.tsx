import Input from "../Input/Input";
import { DataInfo } from "../models/data-info";

export default function Data({ data, setName, setDate, setHours, setPosition }:
  {
    data: DataInfo, setName: (name: string) => void,
    setDate: (date: string) => void,
    setHours: (hours: string) => void,
    setPosition: (position: string) => void
  }) {

  return (
    <>
      <Input label="Name" value={data.name} setValue={setName} />
      <Input label="Position" value={data.position} setValue={setPosition} />
      <Input label="Month" type="month" value={data.date} setValue={setDate} />
      <Input label="Creative hours" type="number" value={data.hours} setValue={setHours} />
    </>
  );
}