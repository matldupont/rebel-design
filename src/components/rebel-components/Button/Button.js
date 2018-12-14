import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SpringSpinner } from 'react-epic-spinners';
import {
  body, font, border, color, gutter,
} from '../styles';


const getStylesByColor = ({
  buttonColor, minimal, inverse, clean,
}) => {
  if (!color[buttonColor]) return {};
  const styles = {
    borderColor: color[buttonColor],
    background: color[buttonColor],
    fontColor: color.white,
    hoverBorderColor: color[`${buttonColor}Light`],
    hoverBackground: color[`${buttonColor}Light`],
    hoverFontColor: color.white,
  };

  if (buttonColor === 'white') {
    styles.fontColor = color.black;
    styles.hoverFontColor = color.blackLight;
    styles.hoverBorderColor = color.whiteDark;
    styles.hoverBackground = color.whiteDark;
  }

  if (inverse) {
    styles.borderColor = color[buttonColor];
    styles.fontColor = color[buttonColor];
    styles.hoverBorderColor = color[`${buttonColor}Light`];
    styles.hoverFontColor = color[`${buttonColor}Light`];

    if (buttonColor === 'white') {
      styles.fontColor = color.black;
      styles.borderColor = color.black;
      styles.hoverFontColor = color.blackLighter;
      styles.hoverBorderColor = color.blackLighter;
      styles.hoverBackground = color.whiteDark;
    }
  }

  if (minimal) {
    styles.fontColor = color[buttonColor];
    styles.hoverBorderColor = color[`${buttonColor}Light`];
    styles.hoverFontColor = color[`${buttonColor}Light`];

    if (buttonColor === 'white') {
      styles.fontColor = color.black;
      styles.borderColor = color.black;
      styles.hoverFontColor = color.blackLighter;
      styles.hoverBorderColor = color.blackLighter;
    }
  }

  if (clean) {
    styles.fontColor = color[buttonColor];
    styles.hoverFontColor = color[`${buttonColor}Light`];
    styles.hoverBackground = 'transparent';
    styles.hoverBorderColor = 'transparent';

    if (buttonColor === 'white') {
      styles.hoverFontColor = color[`${buttonColor}Dark`];

      if (inverse) {
        styles.fontColor = color.black;
        styles.hoverFontColor = color.blackLighter;
        styles.borderColor = 'transparent';
        styles.hoverBorderColor = 'transparent';
      }
    }
  }

  return styles;
};

const getColorStyles = ({
  green, red, blue, white, minimal, inverse, clean,
}) => {
  let colorStyles = {
    borderColor: color.greyLight,
    background: color.greyLight,
    fontColor: body.color,
    hoverBorderColor: '',
    hoverBackground: '',
    hoverFontColor: '',
  };

  if (green) {
    colorStyles = {
      ...colorStyles,
      ...getStylesByColor({
        buttonColor: 'green', minimal, inverse, clean,
      }),
    };
  } else if (red) {
    colorStyles = {
      ...colorStyles,
      ...getStylesByColor({
        buttonColor: 'red', minimal, inverse, clean,
      }),
    };
  } else if (blue) {
    colorStyles = {
      ...colorStyles,
      ...getStylesByColor({
        buttonColor: 'blue', minimal, inverse, clean,
      }),
    };
  } else if (white) {
    colorStyles = {
      ...colorStyles,
      ...getStylesByColor({
        buttonColor: 'white', minimal, inverse, clean,
      }),
    };
  }

  let borderStyles = `border: 1px solid ${colorStyles.borderColor};`;
  let hoverBorderStyles = `border: 1px solid ${colorStyles.hoverBorderColor};`;

  if (inverse) {
    colorStyles.background = color.white;
    colorStyles.hoverBackground = color.white;
  }

  if (minimal) {
    colorStyles.background = color.clear;
    colorStyles.hoverBackground = color.clear;
    borderStyles = `
      border: none;
      border-bottom: 1px solid ${colorStyles.borderColor};
    `;
    hoverBorderStyles = `
      border: none;
      border-bottom: 1px solid ${colorStyles.hoverBorderColor};
    `;
  }

  if (clean) {
    borderStyles = 'border: 1px solid transparent;';
    colorStyles.background = 'transparent';
  }

  return `
      ${borderStyles}
      background: ${colorStyles.background};
      color: ${colorStyles.fontColor};

      &:hover {
        ${hoverBorderStyles}
        background: ${colorStyles.hoverBackground};
        color: ${colorStyles.hoverFontColor};
        cursor: pointer;
      }

      &:disabled {
        border: 1px solid ${color.greyLight} !important;
        background: ${color.greyLight} !important;
        color: ${color.greyDarker}
      }
    `;
};

const getSizeStyles = ({
  minimal, small, large, fullWidth,
}) => {
  const padding = small ? `${gutter.quarter} ${gutter.half}` : '.7rem 1.2rem';
  const fontSize = large ? '1.6rem' : '1.2rem';
  const fontWeight = '400';
  const height = large ? 'height: 4rem;' : '';
  const flex = large ? 'flex: 0 0 auto;' : '';
  const width = fullWidth ? 'width: 100%;' : '';
  const margin = fullWidth ? 'margin: 0;' : '';
  const radius = minimal ? '0' : border.radius;

  return `
    padding: ${padding};
    font-size: ${fontSize};
    font-weight: ${fontWeight};
    border-radius: ${radius};
    ${height}
    ${flex}
    ${width}
    ${margin}
    
  `;
};

const StyledButton = styled.button`
  ${props => getColorStyles(props)}
  ${props => getSizeStyles(props)}
  
  font-family: ${font.new}; 
  min-width: 30px;
  text-transform: uppercase;
  display: inline-block;
  transition: all .2s ease-in-out;

  ${({ loading }) => {
    return loading && `
      border: 1px solid ${color.greyDarker} !important;
      background: ${color.greyDarker} !important;
      color: ${color.white} !important;
      cursor: default;
    `;
  }}
`;

const ButtonTextContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  & > *:first-child {
    margin-right: ${gutter.half};
  }
`;

const ButtonText = styled.div`
  transition: all .2s ease-in-out;
  opacity: ${({ loading }) => { return loading ? '0' : '1'; }};
`;

const SpinnerContainer = styled.div`
  position: absolute;
  transition: all .2s ease-in-out;
  left: 50%;
  transform: translateX(-50%);
  opacity: ${({ loading }) => { return loading ? '1' : '0'; }};
  display: ${({ loading }) => { return loading ? 'inline-block' : 'none'; }};
`;


const Button = ({
  id,
  children,
  loading,
  ariaLabel,
  onClick,
  classes,
  disabled,
  title,
  green,
  red,
  blue,
  white,
  minimal,
  inverse,
  small,
  large,
  fullWidth,
  clean,
}) => {
  const handleButtonClick = (event) => {
    event.preventDefault();
    if (!loading) {
      onClick();
    }
  };
  const btnClass = `${classes}`;
  return (
    <StyledButton
      type="button"
      id={id}
      aria-label={ariaLabel || undefined}
      onClick={handleButtonClick}
      className={btnClass}
      disabled={disabled}
      title={title}
      green={green}
      red={red}
      blue={blue}
      white={white}
      minimal={minimal}
      inverse={inverse}
      small={small}
      large={large}
      fullWidth={fullWidth}
      clean={clean}
      loading={loading}
    >
      <ButtonTextContainer>
        <SpinnerContainer loading={loading}>
          <SpringSpinner size={16} />
        </SpinnerContainer>
        <ButtonText loading={loading}>
          {children}
        </ButtonText>
      </ButtonTextContainer>


    </StyledButton>
  );
};

Button.defaultProps = {
  classes: '',
  children: null,
  green: false,
  red: false,
  blue: false,
  white: false,
  inverse: false,
  minimal: false,
  small: false,
  large: false,
  fullWidth: false,
  clean: false,
  ariaLabel: '',
  disabled: false,
  loading: false,
  title: '',
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  green: PropTypes.bool,
  red: PropTypes.bool,
  blue: PropTypes.bool,
  white: PropTypes.bool,
  inverse: PropTypes.bool,
  minimal: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  fullWidth: PropTypes.bool,
  clean: PropTypes.bool,
  classes: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  title: PropTypes.string,
};

Button.displayName = 'Button';

export default Button;

Button.demo = true;
Button.purpose = 'General Buttons to be used to fire actions';
Button.options = {
  id: { type: 'string', default: 'ux-button' },
  onClick: { type: 'function', default: () => {} },
  children: { type: 'node(s)', default: 'button text' },
  classes: { type: 'string' },
  ariaLabel: { type: 'string' },
  disabled: { type: 'boolean', demo: true },
  loading: { type: 'boolean', demo: true },
  title: { type: 'string' },
  green: { type: 'boolean', demo: true, default: false },
  red: { type: 'boolean', demo: true, default: false },
  blue: { type: 'boolean', demo: true, default: false },
  white: { type: 'boolean', demo: true, default: false },
  inverse: { type: 'boolean', demo: true, default: false },
  minimal: { type: 'boolean', demo: true, default: false },
  small: { type: 'boolean', demo: true, default: false },
  large: { type: 'boolean', demo: true, default: false },
  fullWidth: { type: 'boolean', demo: true, default: false },
  clean: { type: 'boolean', demo: true, default: false },
};
Button.dependencies = [];
