import React from 'react';
import styled from 'styled-components';

// import { Heading } from 'components';
import RebelLogo from '../images/RebelLogo.svg';
// import { getComponentList } from '../helper';
import { color, font } from '../utilities/styles';

const ComponentSection = styled.div`
  padding: 0 1rem;
`;

const ComponentList = styled.ul`
  margin: 0;
  padding: 0;
  height: 100%;
  min-height: 100vh;
  background-color: ${color.blackLighter};
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

// const ComponentButton = styled.button`
//   font-family: ${font.new};
//   color: ${color.white};
//   border: none;
//   background: transparent;
// `;

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
  // const scrollToComponent = (name) => {
  //   document.querySelector(`#${name}-heading`).scrollIntoView({
  //     behavior: 'smooth',
  //     block: 'start',
  //     inline: 'nearest',
  //   });

  //   document.querySelector(`#${name}-heading`).focus();
  // };

  const renderComponentList = () => {
    return (
      <ComponentSection>
        <h3>Components</h3>
        <ComponentList>
          {/* {getComponentList().map((component) => {
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
          })} */}
        </ComponentList>
      </ComponentSection>
    );
  };

  return (
    <SidebarContainer>
      <RebelLogo />
      {renderComponentList()}
    </SidebarContainer>
  );
};

export default Sidebar;
