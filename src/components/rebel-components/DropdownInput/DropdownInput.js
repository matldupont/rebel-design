import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { color, gutter, input } from '../styles'

const DropdownContainer = styled.div`
  ${({ inline }) => {
    return (
      inline &&
      `
      display: flex;
      align-items: center;
    `
    )
  }}
`

const DropdownLabel = styled.label`
  flex-direction: column;
  font-weight: 600;
  font-variant: small-caps;
  margin-bottom: 5px;
  font-size: 1.4rem;
  transition: all 0.2s;

  ${({ inline }) => {
    return (~
      inline &&
      `
      letter-spacing: 1px;
      margin-bottom: 0;
      margin-right: ${gutter.half};
      font-weight: 400;
      font-size: 1.8rem;
    `
    )
  }}
`

const DropdownComponentContainer = styled.div`
  padding: '6px 2px';
  font-size: 1.4rem;
  border: ${input.border};

  ${({ borderless }) => {
    return (
      borderless &&
      `
      border-top: none;
      border-left: none;
      border-right: none;
    `
    )
  }}

  ${({ inline }) => {
    return (
      inline &&
      `
      padding: 2px;
      height: 2.2rem;
    `
    )
  }};

  select {
    width: 100%;
    border: none;
    background: transparent;
    color: #000;

    &:disabled {
      background: rgba(${color.black}, 0.05);
      color: ${color.greyDark};
    }

    option {
      border: none;
    }
  }
`

const DropdownInput = ({
  id,
  label,
  value,
  options,
  inline,
  borderless,
  disabled,
  onChange,
  emptyOption,
  emptyOptionText,
}) => {
  const getEmptyOption = () => {
    if (!emptyOption) return null
    return (
      <option key={`${id}-none`} value="">
        {emptyOptionText}
      </option>
    )
  }

  const dropdownOptions = () => {
    if (!options) return null
    return options.map(option => {
      return (
        <option key={option.value} value={option.value}>
          {option.display}
        </option>
      )
    })
  }

  const changeHandler = event => {
    onChange(event.target.value)
  }

  return (
    <DropdownContainer inline={inline}>
      {label && (
        <DropdownLabel htmlFor={id} inline={inline}>
          {label}
        </DropdownLabel>
      )}
      <DropdownComponentContainer borderless={borderless} inline={inline}>
        <select
          disabled={disabled}
          id={id}
          name={id}
          onChange={changeHandler}
          value={value}
        >
          {getEmptyOption()}
          {dropdownOptions()}
        </select>
      </DropdownComponentContainer>
    </DropdownContainer>
  )
}

DropdownInput.defaultProps = {
  label: '',
  value: '',
  options: [],
  inline: false,
  borderless: false,
  disabled: false,
  onChange: () => {},
  emptyOption: false,
  emptyOptionText: 'Select an option',
}

DropdownInput.propTypes = {
  borderless: PropTypes.bool,
  disabled: PropTypes.bool,
  emptyOption: PropTypes.bool,
  emptyOptionText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
      ]),
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

DropdownInput.displayName = 'DropdownInput';

export default DropdownInput

DropdownInput.demo = true
DropdownInput.purpose =
  'A labelled dropdown input field that meets a11y standards'
DropdownInput.options = {
  id: { type: 'string', default: 'input-id' },
  label: { type: 'label', default: 'input label' },
  value: { type: 'string | number' },
  options: {
    type: '[string | number | object]',
    default: [
      { display: 'Option 1', value: 1 },
      { display: 'Option 2', value: 2 },
      { display: 'Option 3', value: 3 },
    ],
  },
  inline: { type: 'boolean', defaut: false, demo: true },
  borderless: { type: 'boolean', default: false, demo: true },
  disabled: { type: 'boolean', demo: true },
  onChange: { type: 'function' },
  emptyOption: { type: 'boolean', default: false, demo: true },
  emptyOptionText: { type: 'string', default: 'Select an option' },
}
DropdownInput.dependencies = []
