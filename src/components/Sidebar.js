import React from 'react';
import styled from 'styled-components';

import { Heading } from './rebel-components';
import RebelLogo from '../images/RebelLogo.svg';
import ComponentList from './ComponentList';
import { color, font } from '../utilities/styles';

const ComponentSection = styled.div`
  padding: 0 1rem;
`;

const SidebarContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  background-color: ${color.blackLighter};
  padding: 2rem 1rem;
  box-shadow: 1rem 0 4rem rgba(${color.black}, .4);
  z-index: 3;
  display: flex;
  flex-direction: column;
  color: ${color.whiteDark};

  svg {
    width: 70%;
    height: auto;
    align-self: center;
  }
`;

const Sidebar = () => {

  return (
    <SidebarContainer>
      <RebelLogo />
      <ComponentSection>
        <Heading size="3">Components</Heading>
        <ComponentList />
      </ComponentSection>
    </SidebarContainer>
  );
};

export default Sidebar;
