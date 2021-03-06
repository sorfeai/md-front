import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { validate as validateJS } from 'validate.js'
import { recursiveReactMap } from 'utils'

import TextInput from './../common/TextInput'
import Select from './../common/Select'
import Checkbox from './../common/Checkbox'
import RatingInput from '../common/RatingInput'
import Button from './../common/Button'

const INPUT_TYPES = [TextInput, Checkbox, Select, RatingInput]

class Form extends Component {
  static propTypes = {
    withLoading: PropTypes.bool,
    onSubmit: PropTypes.func,
    loadingTime: PropTypes.number,
    constraints: PropTypes.object
  }

  static defaultProps = {
    withLoading: false,
    loadingTime: 3000
  }

  constructor(props) {
    super(props)
    this.constraints = {}
    this.state = this.getInitalState()
  }

  componentDidMount() {
    this.validate()
  }

  getInitalState() {
    let prepState = {
      inputData: {},
      errors: [],
      formState: null
    }

    recursiveReactMap(this.props.children, child => {
      if (INPUT_TYPES.includes(child.type)) {
        const { name, constraints } = child.props

        prepState = {
          ...prepState,
          inputData: {
            ...prepState.inputData,
            [name]: ''
          }
        }
      }
    })

    return prepState
  }

  getBtnState = () => {
    switch(this.state.formState) {
      case null:
        return 'disabled'
        break
      case 'pending':
        return 'loading'
        break
      case 'submitted':
        return 'finished'
        break
      case 'canSubmit':
      default:
        return 'normal'
    }
  }

  trySubmit = () => {
    if (this.state.formState === 'canSubmit') {
      this.submit()
    }
  }

  submit = () => {
    this.props.onSubmit(this.state.inputData)

    if (this.props.withLoading) {
      this.setState(prev => ({
        ...prev,
        formState: 'pending'
      }), () => {
        setTimeout(() => {
          this.setState(prev => ({
            ...prev,
            formState: 'submitted'
          }))
        }, this.props.loadingTime || 0)
      })
    }
  }

  validate = () => {
    const { inputData, formState } = this.state

    const canSubmit = (formState === 'canSubmit')
    const result = validateJS(inputData, this.props.constraints)

    if (result && canSubmit) {
      this.disableSubmit()
    } else if (!result && !canSubmit) {
      this.enableSubmit()
    }
  }

  enableSubmit() {
    this.setState(prev => ({
      ...prev,
      formState: 'canSubmit'
    }))
  }

  disableSubmit() {
    this.setState(prev => ({
      ...prev,
      formState: null
    }))
  }

  updateInputData = (e) => {
    const { name, value } = e.target

    this.setState(prev => ({
      ...prev,
      inputData: {
        ...prev.inputData,
        [name]: value
      }
    }), this.validate)
  }

  onInputFocus = (e) => {
    const { name } = e.target

    if (this.state.errors.includes(name)) {
      this.setState(prev => ({
        ...prev,
        errors: _.filter(prev.errors, n => n !== name)
      }))
    }
  }

  renderChildren() {
    return recursiveReactMap(this.props.children, child => {
      if (INPUT_TYPES.includes(child.type)) {
        const inputProps = {
          onChange: this.updateInputData,
          value: this.state.inputData[child.props.name]
        }
        return React.cloneElement(child, inputProps)
      }
      if(child.props.formSubmit) {
        const btnProps = {
          onClick: this.trySubmit,
          getState: this.getBtnState
        }
        return React.cloneElement(child, btnProps)
      }

      return child
    })
  }

  render() {
    return (
      <div>
        {this.renderChildren()}
      </div>
    )
  }
}

export default Form
