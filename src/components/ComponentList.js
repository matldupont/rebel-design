import * as React from 'react';
import keys from 'lodash/keys';
import styled from 'styled-components';
import * as components from './rebel-components';

import { color, font } from '../utilities/styles';

const ComponentListWrapper = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100vh;
  box-shadow: 1rem 0 4rem rgba(${color.black}, .4);
  z-index: 3;
  display: flex;
  flex-direction: column;
  color: ${color.whiteDark};

  li {
    list-style: none;
    margin-left: 1rem;
  }
`;

const ComponentButton = styled.button`
  font-family: ${font.main};
  color: ${color.white};
  border: none;
  background: transparent;
`;

const scrollToComponent = (name) => {
  document.querySelector(`#${name}-heading`).scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });

  document.querySelector(`#${name}-heading`).focus();
};

const ComponentList = () => {
  return (
    <ComponentListWrapper>
      {
        keys(components)
        .filter(c => !!components[c].demo)
        .sort()
        .map(c => components[c])
        .map((component) => {
          return (
            <li
              key={component.name}
            >
              <ComponentButton
                type="button"
                tabIndex="0"
                onClick={() => scrollToComponent(component.name)}
                onKeyPress={() => scrollToComponent(component.name)}
              >
                {component.name}
              </ComponentButton>
            </li>
    
          );
        })
      }
    </ComponentListWrapper>
  )
};

export default ComponentList;
