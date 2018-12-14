import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


const common = `
  padding: 0 !important;
  margin: 0 !important;
`;

const headings = {
  1: styled.h1`
    ${common}
    font-weight: 300;
    font-size: 3rem;
  `,
  2: styled.h2`
    ${common}
    font-weight: 400;
  `,
  3: styled.h3`
    ${common}
    font-weight: 400;
  `,
  4: styled.h4`
    ${common}
  `,
  5: styled.h5`
    ${common}
  `,
  6: styled.h6`
    ${common}
  `,

};

const Heading = (props) => {
  const {
    id,
    size,
    children,
    className,
  } = props;
  const resolveSize = size > 0 && size <= 6 ? size : 1;
  const Element = headings[resolveSize];
  return (
    <Element {...props} className={className} id={id}>{children}</Element>
  );
};

Heading.displayName = 'Heading';

Heading.defaultProps = {
  id: '',
  size: '1',
  children: 'Heading',
  className: '',
  tabIndex: '0',
};

Heading.propTypes = {
  id: PropTypes.string,
  size: PropTypes.oneOf([
    '1', '2', '3', '4', '5', '6',
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  className: PropTypes.string,
  tabIndex: PropTypes.string,
};

Heading.demo = true;
Heading.purpose = 'Styled Rebel Headings';
Heading.options = {
  id: { type: 'string' },
  size: { type: 'number' },
};

export default Heading;
