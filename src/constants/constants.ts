import { DefaultTheme } from "styled-components";

export const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const DARK_THEME: DefaultTheme = {
  primary: {
    100: 'hsl(257, 18%, 23%)',
    200: 'hsl(256, 12%, 30%)',
    300: 'hsl(255, 8%, 38%)',
    400: 'hsl(260, 6%, 46%)',
    500: 'hsl(258, 5%, 54%)'
  },
  secondary: {
    100: 'hsl(30, 5%, 56%)',
    200: 'hsl(30, 8%, 66%)',
    300: 'hsl(30, 13%, 75%)',
    400: 'hsl(30, 23%, 85%)',
    500: 'hsl(30, 67%, 94%)'
  },
  text: {
    onPrimary: 'hsl(30, 67%, 94%)',
    onSecondary: 'hsl(257, 18%, 23%)'
  },
  logo: 'invert(86%) sepia(9%) saturate(809%) hue-rotate(322deg) brightness(115%) contrast(96%)'
};

export const LIGHT_THEME: DefaultTheme = {
  primary: {
    100: 'hsl(30, 67%, 94%)',
    200: 'hsl(30, 23%, 85%)',
    300: 'hsl(30, 13%, 75%)',
    400: 'hsl(30, 8%, 66%)',
    500: 'hsl(30, 5%, 56%)'
  },
  secondary: {
    100: 'hsl(258, 5%, 54%)',
    200: 'hsl(260, 6%, 46%)',
    300: 'hsl(255, 8%, 38%)',
    400: 'hsl(256, 12%, 30%)',
    500: 'hsl(257, 18%, 23%)',
  },
  text: {
    onPrimary: 'hsl(257, 18%, 23%)',
    onSecondary: 'hsl(30, 67%, 94%)'
  },
  logo: 'invert(17%) sepia(5%) saturate(3509%) hue-rotate(216deg) brightness(96%) contrast(90%)'
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