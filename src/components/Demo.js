import React, { Component } from 'react';
import keys from 'lodash/keys';
import styled from 'styled-components';

import { Button, Heading } from './rebel-components';
import {
  gutter, color, border, shadow,
} from '../utilities/styles';

const getOptionValueSnippet = (mode, value) => {
  switch (mode) {
    case 'react':
      return `="${value}"`;
    case 'cms':
      return `: ${value},`;
    default:
      return '';
  }
};

const getOptionSpacing = (mode) => {
  switch (mode) {
    case 'react':
      return '  ';
    case 'cms':
      return '    ';
    default:
      return '';
  }
};

const getOptionsString = (mode, options, state) => {
  const spacing = getOptionSpacing(mode);
  let optionsString = ' ';
  if (options && keys(options).length > 0) {
    optionsString = keys(options)
      .filter(o => options[o].demo === true)
      .map((option, index) => {
        const value = getOptionValueSnippet(mode, state[option]);
        if (index < keys(options).length - 1) {
          return `${spacing}${option}${value}`;
        }
        return `${spacing}${option}${value}`;
      }).join(`
`);
    optionsString = `${optionsString}
`;
  }
  return optionsString;
};

const demoModes = {
  react: {
    name: 'React',
    renderSnippet: (WrappedComponent, state) => {
      const options = getOptionsString('react', WrappedComponent.options, state);
      const { displayName, name } = WrappedComponent;
      const listedName = displayName || name;
      return `<${listedName}${options}/>`;
    },
  },
  cms: {
    name: 'CMS',
    renderSnippet: (WrappedComponent, state) => {
      const options = getOptionsString('cms', WrappedComponent.options, state);
      const { displayName, name } = WrappedComponent;
      const listedName = displayName || name;
      return `ContentMaster.loadComponent(
  "#your-placeholder", 
  "${listedName}",
  {
${options}  }
);`;
    },
  },
};

const themeColors = (props) => {
  return `
    background-color: ${props.dark ? color.blackLighter : color.white};
    color: ${props.dark ? color.white : color.blackLighter};
  `;
};

const DemoContainer = styled.div`
  ${props => themeColors(props)}
  box-shadow: ${shadow};
  border-radius: ${border.radius};
  padding: 0 ${gutter.default};
`;

const DemoPane = styled.div`
  background-color: ${color.whiteDark};
  border-radius: ${border.radius};
  padding: ${gutter.default};
  margin: 1rem 0;
`;

const ComponentPurpose = styled.p``;

const ComponentInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ComponentDetails = styled.ul`
  list-style: none;
  padding: 0;
  padding-left: ${gutter.default};

  li {
    font-size: 1.4rem;
  }
`;

const ComponentDemo = styled.div`
  padding: 1rem;
`;

const ComponentCode = styled.div`
  border-radius: ${border.radius};
  background-color: ${color.whiteDark};
  color: ${color.blackLighter};
  margin: ${gutter.big} 0;
`;

const ComponentCodeSnippet = styled.div`
  padding: ${gutter.default} ${gutter.bigger};

  pre {
    background-color: ${color.white};
    padding: ${gutter.width} ${gutter.big};
    border: 1px solid ${border.color};
    border-radius: ${border.radius};
  }
`;

const DemoOptions = styled.div`
  padding: 2rem;

  & > * {
    margin: 1rem;
  }
`;

const DemoModes = styled.div`
  display: flex;
  padding: 0 3rem;
  border-bottom: 1px solid ${border.color};
`;

export default function (WrappedComponent) {
  class _Demo extends Component {
    constructor(props) {
      super(props);

      this.state = {
        darkTheme: false,
      };

      const options = {};
      keys(WrappedComponent.propTypes).forEach((prop) => {
        let defaultValue = WrappedComponent.defaultProps[prop];
        if (WrappedComponent.options
          && WrappedComponent.options[prop]
          && WrappedComponent.options[prop].default !== 'undefined'
        ) {
          defaultValue = WrappedComponent.options[prop].default;
        }
        options[prop] = defaultValue;
      });

      this.state = {
        ...options,
        mode: demoModes.react,
      };
    }

    getOptionValueSnippet(value) {
      const { mode } = this.state;
      return mode === demoModes.react ? `="${value}"` : `: ${value}`;
    }

    static renderDependencies() {
      if (!WrappedComponent.dependencies) return <div />;
      return (
        <div>
          <Heading size="3">Dependencies</Heading>
          {(!WrappedComponent.dependencies || WrappedComponent.dependencies.length === 0)
            && <div>None</div>
          }
          {(WrappedComponent.dependencies && WrappedComponent.dependencies.length > 0)
            && (
            <ComponentDetails>
              {WrappedComponent.dependencies.map(depName => <li key={depName}>{depName}</li>)}
            </ComponentDetails>
            )
          }
        </div>
      );
    }

    static renderOptions() {
      if (!WrappedComponent.options) return <div />;
      return (
        <div>
          <Heading size="3">Options</Heading>
          <ComponentDetails>
            {
              keys(WrappedComponent.options)
                .map((option) => {
                  return (
                    <li key={option}>
                      <b>{`${option}: `}</b>
                      <i>{WrappedComponent.options[option].type}</i>
                    </li>
                  );
                })
            }
          </ComponentDetails>
        </div>
      );
    }

    optionToggle(option) {
      this.setState((prevState) => {
        return { [option]: !prevState[option] };
      });
    }

    renderOptionToggles() {
      const options = keys(WrappedComponent.options).filter((option) => {
        const { type, demo } = WrappedComponent.options[option];
        return type.toLowerCase() === 'boolean' && demo;
      });
      return (
        <DemoOptions>
          {options.map((option) => {
            return (
              <Button
                id={`demo-toggle-${option}`}
                key={option}
                small
                green
                inverse={!this.state[option]}
                onClick={() => { this.optionToggle(option); }}
              >
                {option}
              </Button>
            );
          })}
        </DemoOptions>
      );
    }

    renderModes(componentName) {
      const { mode } = this.state;
      return (
        <DemoModes>
          {keys(demoModes).map((m) => {
            return (
              <Button
                id={`demo-mode-${m}-${componentName}`}
                key={m}
                role="button"
                green={mode === demoModes[m]}
                onClick={() => { this.setState({ mode: demoModes[m] }); }}
                onKeyPress={() => {}}
                tabIndex="-1"
              >
                {demoModes[m].name}
              </Button>
            );
          })}
        </DemoModes>
      );
    }

    renderCodeSnippet() {
      const { mode } = this.state;

      return (
        <ComponentCodeSnippet>
          <pre>
            {mode.renderSnippet(WrappedComponent, this.state)}
          </pre>
        </ComponentCodeSnippet>
      );
    }

    renderDemo() {
      const { displayName, name } = WrappedComponent;
      const listedName = displayName || name;
      return (
        <ComponentDemo>
          <WrappedComponent {...this.state} />
          <ComponentCode>
            {this.renderModes(listedName)}
            {this.renderCodeSnippet()}
          </ComponentCode>
        </ComponentDemo>
      );
    }

    render() {
      const { darkTheme } = this.state;
      return (
        <React.Fragment>
          <ComponentPurpose>{WrappedComponent.purpose}</ComponentPurpose>
          <DemoPane>
            <ComponentInfo>
              {_Demo.renderOptions()}
              {_Demo.renderDependencies()}
            </ComponentInfo>
            <DemoContainer dark={darkTheme}>
              {this.renderOptionToggles()}
              {this.renderDemo()}
            </DemoContainer>
          </DemoPane>
        </React.Fragment>
      );
    }
  }

  return _Demo;
}
