import React from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import * as components from './rebel-components';
import { gutter } from '../utilities/styles';
import demo from './Demo';

const ComponentLibraryWrapper = styled.div`
  padding: 2rem;
`;

const ComponentSection = styled.section`
  padding: ${gutter.default} 0;
`;

const ComponentLibrary = () => {
  const loadComponentDemos = () => {
    return map(components, (component) => {
        const DemoComponent = demo(component);
        return {
          name: component.name,
          instance: <DemoComponent />,
        };
      });
  };

  return (
    <ComponentLibraryWrapper>
      {
        map(loadComponentDemos(), ({ name, instance }) => {
            return (
              <ComponentSection id={name} key={name}>
                <components.Heading id={`${name}-heading`} size="2">
                  {name.replace(/([A-Z])/g, ' $1')}
                </components.Heading>
                {instance}
              </ComponentSection>
            );
          })
      }
    </ComponentLibraryWrapper>
  );
};

export default ComponentLibrary;
