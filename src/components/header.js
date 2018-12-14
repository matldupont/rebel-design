import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components';

import { Heading } from './rebel-components';

import { color } from '../utilities/styles';

const HeaderContainer = styled.header`
  color: ${color.whiteDark};
  background-color: ${color.blackLighter}; 

  padding: 1rem 3rem;
  height: 10rem;
  background-color: ${color.blackLight};
  box-shadow: 0 1rem 4rem rgba(${color.black}, .4);
  display: flex;
  align-items: center; 
  background-image: url(//s3.amazonaws.com/resources.rebel.com/wordpress/assets/wp-content/uploads/2018/04/background-grey.jpg);
  background-position: bottom;

  h1 {
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, ${color.whiteDark}, ${color.orange});
  }
`;

const Header = ({ siteTitle }) => {
  return (
    <HeaderContainer>
      <Heading size="1">{siteTitle}</Heading>
    </HeaderContainer>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header;
