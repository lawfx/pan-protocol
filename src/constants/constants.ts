import { DefaultTheme } from "styled-components";

export const APP_TITLE = 'Protocol Pal';

export const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const DARK_THEME: DefaultTheme = {
  primary: {
    100: 'hsl(257, 18%, 23%)',
    200: 'hsl(256, 12%, 30%)',
    300: 'hsl(255, 8%, 38%)',
    400: 'hsl(260, 6%, 46%)',
    500: 'hsl(258, 5%, 54%)',
  },
  secondary: {
    100: 'hsl(30, 5%, 56%)',
    200: 'hsl(30, 8%, 66%)',
    300: 'hsl(30, 13%, 75%)',
    400: 'hsl(30, 23%, 85%)',
    500: 'hsl(30, 67%, 94%)',
  },
  text: {
    onPrimary: 'hsl(30, 67%, 94%)',
    onSecondary: 'hsl(257, 18%, 23%)'
  }
};

export const LIGHT_THEME: DefaultTheme = {
  primary: {
    100: 'hsl(0, 0%, 100%)',
    200: 'hsl(200, 16%, 74%)',
    300: 'hsl(201, 16%, 64%)',
    400: 'hsl(201, 16%, 54%)',
    500: 'hsl(200, 17%, 49%)',
  },
  secondary: {
    100: 'hsl(200, 17%, 49%)',
    200: 'hsl(200, 24%, 40%)',
    300: 'hsl(201, 34%, 32%)',
    400: 'hsl(199, 53%, 23%)',
    500: 'hsl(200, 95%, 14%)',
  },
  text: {
    onPrimary: 'hsl(200, 95%, 14%)',
    onSecondary: 'hsl(0, 0%, 100%)'
  }
};


export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`,
};

export const SQUASH_AND_MERGE_REGEX = /(?<message>.+) (\(#(?<pr>\d+)\))/;
export const MERGE_REGEX = /.+ #(?<pr>\d+).*\n(?<message>.+)/s;