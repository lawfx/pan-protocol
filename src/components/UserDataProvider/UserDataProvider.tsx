import React, { ReactNode } from "react";
import { UserData } from "../../models/user-data.model";
import { processFileAsync } from "../../utils/utils";

export default function UserDataProvider({ children }: { children: ReactNode }) {

  const [data, dataDispatcher] = React.useReducer(reducer, {
    date: new Date(),
    hours: 0
  });
  const [file, setFile] = React.useState<string | ArrayBuffer | null>(null);

  const uploadFile = React.useCallback(async (file: File | null) => {
    try {
      const processedFile = await processFileAsync(file);
      setFile(processedFile);
    }
    catch (e) {
      console.error('Error reading file', e);
    }
  }, []);

  return (
    <UserDataContext.Provider value={{ data, file, dataDispatcher, uploadFile }}>
      {children}
    </UserDataContext.Provider>
  )
}

export enum UserDataActionType {
  UPDATE_DATE,
  UPDATE_HOURS
}

interface UserDataUpdateDateAction {
  type: UserDataActionType.UPDATE_DATE;
  date: Date | null;
}

interface UserDataUpdateHoursAction {
  type: UserDataActionType.UPDATE_HOURS;
  hours: string;
}

export type UserDataAction = UserDataUpdateDateAction | UserDataUpdateHoursAction;

export const UserDataContext = React.createContext<{
  data: UserData;
  file: string | ArrayBuffer | null;
  dataDispatcher: React.Dispatch<UserDataAction>;
  uploadFile: (file: File | null) => void;
}>(null as any);

function reducer(state: UserData, action: UserDataAction): UserData {
  switch (action.type) {
    case UserDataActionType.UPDATE_DATE:
      return { ...state, date: action.date };
    case UserDataActionType.UPDATE_HOURS:
      const newHours = isNaN(+action.hours) ? state.hours : +action.hours;
      return { ...state, hours: newHours };
  }
}