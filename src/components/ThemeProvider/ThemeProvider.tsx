import React, { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { DARK_THEME, LIGHT_THEME } from "../../constants/constants";

export default function ThemeProvider({ children }: { children: ReactNode }) {

  const [isDarkTheme, setIsDarkTheme] = React.useState(true);

  const toggleTheme = React.useCallback(() => {
    setIsDarkTheme(s => !s);
  }, []);

  return (
    <StyledThemeProvider theme={isDarkTheme ? DARK_THEME : LIGHT_THEME}>
      <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </StyledThemeProvider>
  );
}


export const ThemeContext = React.createContext<{
  isDarkTheme: boolean;
  toggleTheme: () => void;
}>(null as any);