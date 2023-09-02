import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    },
    secondary: {
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
    },
    text: {
      onPrimary: string;
      onSecondary: string;
    }
  }
}