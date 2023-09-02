import React from "react";
import { ThemeContext } from "../components/ThemeProvider/ThemeProvider";

export default function useTheme() {
  return React.useContext(ThemeContext);
}