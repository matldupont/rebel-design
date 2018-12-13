import { css, keyframes, createGlobalStyle } from 'styled-components';

export const color = {
  white: '#fff',
  whiteDark: '#f7f7f7',
  greyLight: '#d7d7d7',
  grey: '#B2B2B2',
  greyDark: '#999999',
  greyDarker: '#666',
  blackLighter: '#333',
  blackLight: '#222328',
  black: '#000',

  greenLightest: '#f3f5e6',
  greenLighter: '#D3DCA3',
  greenLight: '#A5C20F',
  green: '#859F00',
  greenDark: '#6B8000',

  redLighter: '#F9BEAE',
  redLight: '#E37054',
  red: '#F04A22',
  redDark: '#CC3E1C',
  redNew: '#d82a29',

  blueLightest: '#C1D5F7',
  blue: '#1B50B8',

  orange: '#ff9600',

  clear: 'transparent',

  focus: '#406198',

  overlay: 'rgba(0,0,0,.6)',

  success: '#859f00',
  successLight: '#e4eeaa',

  warning: '#d49e03',
  warningLight: '#f7eac9',

  error: '#f04822',
  errorLight: '#ffd1c7',
};

export const font = {
  new: '\"Montserrat\", sans-serif',
};

export const gutter = {
  eigth: '0.2rem',
  quarter: '0.4rem',
  half: '0.8rem',
  default: '1.6rem',
  big: '2.4rem',
  bigger: '4rem',
  biggest: '8rem',
};


export const border = {
  radius: '2px',
  color: color.greyLight,
};

export const input = {
  border: '1px solid #ddd',
};

export const html = {
  fontSize: '62.5%',
};

export const body = {
  margin: '0',
  padding: '0',
  fontFamily: `${font.new}`,
  fontWeight: '300',
  fontSize: '1.6rem',
  lineHeight: '1.7',
  color: color.blackLighter,
};

export const shadow = `0 1rem 3rem rgba(${color.black},.5)`;

// $primary: '#333 !default',
// $primary_dark: darken($primary, 10%)',
// $primary_darker: darken($primary, 25%)',
// $primary_darkest: darken($primary, 50%)',
// $primary_light: lighten($primary, 10%)',
// $primary_primary_lighter: lighten($primary, 25%)',
// $primary_primary_lightest: lighten($primary, 50%)',

// $secondary: '#ff9600 !default',
// $tertiary: '#859f00 !default',
// $accent: '#fff !default',

export const screen = {
  small: '600px',
  smallUp: '601px',
  medium: '992px',
  mediumUp: '993px',
  large: '1200px',
  largeUp: '1201px',
};

export const media = {
  smallAndDown: (...args) => css`
    @media only screen and (max-width: ${screen.small}) {
      ${css(...args)};
    }
  `,
  mediumOnly: (...args) => css`
    @media only screen and (min-width : ${screen.smallUp}) and (max-width : ${screen.medium}) {
      ${css(...args)};
    }
  `,
  mediumAndDown: (...args) => css`
    @media only screen and (max-width: ${screen.medium}) {
      ${css(...args)};
    }
  `,
  mediumAndUp: (...args) => css`
    @media only screen and (min-width: ${screen.smallUp}) {
      ${css(...args)};
    }
  `,
  largeAndDown: (...args) => css`
    @media only screen and (max-width: ${screen.large}) {
      ${css(...args)};
    }
  `,
  largeAndUp: (...args) => css`
    @media only screen and (min-width: ${screen.largeUp}) {
      ${css(...args)};
    }
  `,
};

export const animations = {
  scaleout: keyframes`
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1.0);
      opacity: 0;
    }
  `,
};

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: ${html.fontSize}; 

    
  }

  body {
    margin: ${body.margin};
    padding: ${body.padding};
    font-family: ${body.fontFamily};
    font-weight: ${body.fontWeight};
    line-height: ${body.lineHeight};
    color: ${body.color};
    font-size: ${body.fontSize};

    & > *,
    & > *::before,
    & > *::after {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
      font-family: ${body.fontFamily};
    }
  }
`;
