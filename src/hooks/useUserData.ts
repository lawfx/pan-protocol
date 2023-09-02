import React from "react";
import { UserDataContext } from "../components/UserDataProvider/UserDataProvider";

export default function useUserData() {
  return React.useContext(UserDataContext);
}