export interface DataInfo {
  name: string;
  position: string;
  date: DateRange;
  hours: number;
}

export interface DateRange {
  from: string;
  to: string;
}