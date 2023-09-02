import React, { ReactNode } from "react";
import { UserData } from "../../models/user-data.model";

export const UserDataContext = React.createContext<{
  data: UserData;
  setDate: (date: Date | null) => void;
  setHours: (hours: string) => void;
  setFile: (file: File | null) => void;
}>(null as any);

export default function UserDataProvider({ children }: { children: ReactNode }) {

  const [data, setData] = React.useState<UserData>({
    date: new Date(),
    hours: 0,
    file: null
  });
  console.log('data', data);

  const setDate = React.useCallback((date: Date | null) => {
    setData(d => ({ ...d, date: date }));
  }, []);

  const setHours = React.useCallback((hours: string) => {
    setData(d => ({ ...d, hours: isNaN(+hours) ? d.hours : +hours }));
  }, []);

  const setFile = React.useCallback((file: File | null) => {
    if (file === null) {
      setData(d => ({ ...d, file: null }));
      return;
    }

    const reader = new FileReader();

    reader.onerror = function (evt) {
      console.error("error reading file", evt);
    };

    reader.onload = function (evt) {
      const content = evt.target!.result;
      setData(d => ({ ...d, file: content }));
    };

    reader.readAsBinaryString(file);
  }, []);

  return (
    <UserDataContext.Provider value={{ data, setDate, setHours, setFile }}>
      {children}
    </UserDataContext.Provider>
  )
}