import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import validate from 'validate.js'
import utils from 'utils'
import _ from 'lodash'
import styles from './../styles/components/AppointmentModal.css'

import Form from './containers/Form'
import Modal from './Modal'
import Button from './common/Button'
import TextInput from './common/TextInput'
import Select from './common/Select'
import Paragraph from './common/Paragraph'

import {
  APPOINTMENT_LOADED,
  APPOINTMENT_UNLOADED
} from './../constants/actionTypes'

import { Staff as StaffApi } from './../agent'

const doctorsOptions = [
  { name: 'Не выбрано', value: '' },
  { name: 'Юров Р.В. (ортопед)', value: 'yurov' },
  { name: 'Мальнева Н.С. (терапевт)', value: 'malneva' },
  { name: 'Королев Ю.Л. (хирург)', value: 'korolev' },
  { name: 'Кожухова Е.П. (терапевт)', value: 'kozhuhova' },
  { name: 'Ковалев С.В. (терапевт)', value: 'kovalev' },
  { name: 'Кяргина Н.Н. (ортодонт)', value: 'kyargina' }
]

const mapStateToProps = state => ({
  ...state.appointment
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: APPOINTMENT_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: APPOINTMENT_UNLOADED })
})

const LOADING_TIME = 2500
const SUCCESS_TEXT = 'Спасибо, %username%! Через несколько минут с вами свяжется администратор клиники для уточнения деталей приема.'

class AppointmentModal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    staff: PropTypes.array
  }

  state = {
    contentState: 'form' // or 'success'
  }

  componentWillMount() {
    this.props.onLoad(StaffApi.options())
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  onFormSubmit = ({ name, phone, problem, doctor }) => {
    const emailData = {
      name: _.capitalize(name),
      phone,
      problem,
      doctor: doctor || 'не указано'
    }

    // emailjs
    //   .send(process.env.REACT_APP_MAIL_SERVICE, '_appointment', emailData)
    //   .catch(console.log)

    this.userName = name

    setTimeout(() =>
      this.setState({ contentState: 'success' })
    , LOADING_TIME)
  }

  toSelectOptions(data) {
    return data.reduce((res, { name, positions }) => {
      const initials = utils.cutName(name)
      return [
        ...res,
        {
          name: `${initials} (${positions.slice(0, 2).join(', ')})`,
          value: initials
        }
      ]
    }, [])
  }

  renderSuccess() {
    const text = SUCCESS_TEXT.replace(
      '%username%',
      _.capitalize(this.userName.trim())
    )

    return (
      <div className={styles['success-text']}>
        <Paragraph type='small'>
          {text}
        </Paragraph>
      </div>
    )
  }

  renderForm() {
    return (
      <div className={styles['form']}>
        <div className={styles['input-group']}>
          <div className={styles['input-row']}>
            <div className={styles['label']}>
              <div className={styles['label-text']}>
                Имя
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['tiny-wrapper']}>
                <TextInput name='name' />
              </div>
            </div>
          </div>
          <div className={styles['input-row']}>
            <div className={styles['label']}>
              <div className={styles['label-text']}>
                Номер телефона
              </div>
            </div>
            <div className={styles['field']}>
              <div className={styles['tiny-wrapper']}>
                <TextInput
                  type='tel'
                  name='phone'
                  mask="+7 (999) 999 99 99"
                  maskChar="_"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles['input-row']}>
          <div className={styles['label']}>
            <div className={styles['label-text']}>
              Врач
            </div>
            <div className={styles['label-caption']}>
              опционально
            </div>
          </div>
          <div className={styles['field']}>
            <div className={styles['tiny-wrapper']}>
              <Select
                name='doctor'
                options={this.toSelectOptions(this.props.staff)}
              />
            </div>
          </div>
        </div>
        <div className={styles['input-row']}>
          <div className={styles['label']}>
            <div className={styles['label-text']}>
              Опишите в чем состоит ваша проблема
            </div>
          </div>
          <div className={styles['field']}>
            <TextInput
              type='textarea'
              name='problem'
              rows='5'
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { staff, onClose } = this.props

    if (!staff || staff.length === 0) {
      return null
    }

    const constraints = {
      name: {
        presence: { allowEmpty: false },
      },
      phone: {
        presence: { allowEmpty: false, },
        format: /\+7 \(9\d{2}\) \d{3} \d{2} \d{2}/
      },
      problem: {
        presence: { allowEmpty: false },
      }
    }

    return (
      <Modal
        heading={'Запись на прием'}
        onClose={onClose}
      >
        <Form
          constraints={constraints}
          withLoading
          onSubmit={this.onFormSubmit}
          loadingTime={LOADING_TIME}
        >
          {this.state.contentState === 'form'
            ? this.renderForm()
            : this.renderSuccess()}
          <Button
            formSubmit
            width='10em'
            successText='Вы записаны'
          >
            Записаться
          </Button>
        </Form>
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentModal)
