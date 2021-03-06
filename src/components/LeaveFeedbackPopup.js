import React, { Component } from 'react'
import validate from 'validate.js'
import styles from './../styles/components/LeaveFeedbackPopup.css'

import FontAwesome from 'react-fontawesome'
import Form from './containers/Form'
import TextInput from './common/TextInput'
import Paragraph from './common/Paragraph'
import Button from './common/Button'
import RatingInput from './common/RatingInput'
import Popup from './Popup'

class LeaveFeedbackPopup extends Component {
  onFormSubmit = (data) => {
    fetch(
      `${process.env.REACT_APP_API_ROOT}/reviews`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...data,
          isPublished: false
        })
      })
  }

  render() {
    const constraints = {
      author: {
        presence: { allowEmpty: false }
      },
      rating: {
        presence: { allowEmpty: false }
      },
      review: {
        presence: { allowEmpty: false },
      }
    }

    return (
      <div className={styles['wrapper']}>
        <Popup {...this.props}>
          <Form
            withLoading
            loadingTime={2500}
            onSubmit={this.onFormSubmit}
            constraints={constraints}
          >
            <div className={styles['name-input']}>
              <TextInput
                alt
                label='Имя'
                name='author'
              />
            </div>
            <TextInput
              alt
              type='textarea'
              rows={4}
              label='Отзыв'
              name='review'
            />
            <div className={styles['rating-input']}>
              <RatingInput
                name='rating'
                label='Ваша оценка'
              />
            </div>
            <div className={styles['hint']}>
              <Paragraph type='small' >
                Ваш отзыв будет опубликован в течение суток.
              </Paragraph>
            </div>
            <Button
              formSubmit
              type='popup'
              successText='Спасибо!'
            >
              Отправить
            </Button>
          </Form>
        </Popup>
      </div>
    )
  }
}

export default LeaveFeedbackPopup
