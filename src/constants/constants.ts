export const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const DARK_THEME = {
  primary100: 'hsl(257, 18%, 23%)',
  primary200: 'hsl(256, 12%, 30%)',
  primary300: 'hsl(255, 8%, 38%)',
  primary400: 'hsl(260, 6%, 46%)',
  primary500: 'hsl(258, 5%, 54%)',
  secondary100: 'hsl(30, 5%, 56%)',
  secondary200: 'hsl(30, 8%, 66%)',
  secondary300: 'hsl(30, 13%, 75%)',
  secondary400: 'hsl(30, 23%, 85%)',
  secondary500: 'hsl(30, 67%, 94%)',
  textOnPrimary: 'hsl(30, 67%, 94%)',
  textOnSecondary: 'hsl(257, 18%, 23%)'
}

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

export const APP_TITLE = 'Protocol Maker OmniMax 9000';