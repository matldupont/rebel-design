import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { border, color, gutter } from '../styles'

const InputLabel = styled.label`
  flex-direction: column;
  font-weight: 600;
  font-variant: small-caps;
  margin-bottom: 5px;
  font-size: 1.4rem;
  transition: all 0.2s;
`

const InputContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column-reverse;

  input {
    width: 100%;
    padding: ${gutter.half};
    padding-right: ${gutter.big};
    box-sizing: border-box;
    font-size: 1.4rem;
    border: 1px solid ${border.color};
    height: 34px;

    transition: all 0.2s;

    &[aria-invalid='true'] {
      border: 1px solid ${color.red};
      position: relative;

      &::after,
      &:hover::after {
        content: '';
        color: ${color.red};
        position: absolute;
        right: 8px;
        top: 8px;
      }
    }

    &:focus {
      border-color: transparent;
      box-shadow: 0 0 0 2px ${color.focus};
    }

    input[aria-invalid='true'] + ${InputLabel} {
      color: ${color.red};
    }

    ${({ suffix }) => {
      return suffix && 'display: inline-block; width: 60% !important;'
    }}
  }
`

const InputSuffix = styled.div`
  margin-left: ${gutter.half};
  display: inline-block;
  font-size: 1.4rem;
  vertical-align: text-bottom;
  max-width: 35%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const InputErrorMessage = styled.div`
  margin-top: ${gutter.quarter};
  font-size: 1.4rem;
  color: ${color.red};
`

export default class Input extends Component {
  constructor() {
    super()

    this.state = {
      error: false,
      message: '',
    }

    this.input = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.triggerValidation = this.triggerValidation.bind(this)
    this.timer = {}
  }


  componentDidMount() {
    const { onRefMount, value } = this.props
    if (value) {
      this.triggerValidation(value)
    }

    if (onRefMount) {
      onRefMount(this.input)
    }
  }

  componentDidUpdate(nextProps) {
    const { value } = this.props
    if (value !== nextProps.value) {
      this.triggerValidation(nextProps.value)
    }
  }

  getClasses() {
    if (this.state.error) {
      return 'rw__input--warning'
    }
    return ''
  }

  getValue() {
    return this.props.value
  }

  setSuccessState(bool, message) {
    this.setState({
      error: !bool,
      message,
    })
  }

  focus() {
    this.input.focus()
  }

  handleChange(event) {
    const { value } = event.target
    this.props.onChange(event)

    this.throttle(() => {
      this.triggerValidation(value)
    })
  }

  triggerValidation(val) {
    if (val === undefined) {
      val = this.getValue()
    }
    const check = this.isValid(val)
    let pass = true
    let message = ''
    if (check) ({ pass, message } = check)
    if (typeof check !== 'undefined') {
      this.setSuccessState(pass, message)
    }
  }

  throttle(cb) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      cb()
    }, 300)
  }

  isValid(value) {
    return this.props.validation.call(this, value)
  }

  renderSuffix() {
    const { suffix } = this.props
    if (!suffix) return null
    return <InputSuffix>{suffix}</InputSuffix>
  }

  getInputType() {
    const { textarea } = this.props

    if (textarea) return this.getTextArea()

    return this.getInput()
  }

  getInput() {
    const { error } = this.state
    const { type, id, disabled, required, autocomplete, name } = this.props

    return (
      <div>
        <input
          ref={i => {
            this.input = i
          }}
          aria-invalid={error}
          aria-required={required}
          autoComplete={autocomplete}
          data-lpignore={autocomplete !== 'on'}
          disabled={disabled}
          id={id}
          name={name}
          onChange={this.handleChange}
          onKeyPress={this.props.onKeyPress}
          required={required}
          type={type}
          value={this.getValue()}
        />
        {this.renderSuffix()}
      </div>
    )
  }

  getTextArea() {
    const { type, id, disabled, required, rows, value } = this.props

    return (
      <textarea
        ref={i => {
          this.input = i
        }}
        disabled={disabled}
        id={id}
        onChange={this.handleChange}
        required={required}
        rows={`${rows}`}
        type={type}
        value={value}
      />
    )
  }

  render() {
    const { label, id, suffix } = this.props
    return (
      <InputContainer className={`${this.getClasses()}`} suffix={suffix}>
        {this.state.message.length > 0 && (
          <InputErrorMessage
            aria-live="assertive"
            id={`${id}-error`}
            role="alert"
          >
            {this.state.message}
          </InputErrorMessage>
        )}
        {this.getInputType()}
        <InputLabel htmlFor={id}>{label}</InputLabel>
      </InputContainer>
    )
  }
}

Input.displayName = 'Input'

Input.defaultProps = {
  label: '',
  value: '',
  type: 'text',
  rows: 5,
  textarea: false,
  suffix: '',
  autocomplete: 'on',
  name: '',
  disabled: false,
  onChange: () => {},
  onRefMount: () => {},
  onKeyPress: () => {},
  validation: () => {},
  required: false,
}

Input.propTypes = {
  autocomplete: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onRefMount: PropTypes.func,
  required: PropTypes.bool,
  rows: PropTypes.number,
  suffix: PropTypes.string,
  textarea: PropTypes.bool,
  type: PropTypes.string,
  validation: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Input.demo = true
Input.purpose =
  'A labelled input field with validation that meets a11y standards'
Input.options = {
  id: { type: 'string', default: 'input-id' },
  label: { type: 'label', default: 'input label' },
  value: { type: 'string | number' },
  type: { type: 'string' },
  textarea: { type: 'boolean', demo: true },
  rows: { type: 'number' },
  suffix: { type: 'string' },
  autocomplete: { type: 'string' },
  name: { type: 'string' },
  disabled: { type: 'boolean', demo: true },
  onChange: { type: 'function' },
  onKeyPress: { type: 'function' },
  validation: { type: 'function' },
  placeholder: { type: 'string' },
  required: { type: 'boolean', demo: true },
}
Input.dependencies = []
