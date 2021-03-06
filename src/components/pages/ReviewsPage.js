import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/components/pages/ReviewsPage.css'

import withFetch from './../HOCs/withFetch'
import Link from './../common/Link'
import NarrowPage from './NarrowPage'
import Reviews from './../Reviews'
import LeaveFeedbackPopup from './../LeaveFeedbackPopup'
import Pagination from './../common/Pagination'

class ReviewsPage extends Component {
  state = { leaveFeedbackPopup: false }

  handleLeaveFeedbackClick = (e) => {
    e.preventDefault()

    this.setState(prev => ({
      ...prev,
      leaveFeedbackPopup: true
    }))
  }

  onPopupClose = () => {
    this.setState(prev => ({
      ...prev,
      leaveFeedbackPopup: false
    }))
  }

  renderPopup() {
    return (
      <div className={styles['feedback-popup']}>
        <LeaveFeedbackPopup
          onClose={this.onPopupClose}
        />
      </div>
    )
  }

  render() {
    const { leaveFeedbackPopup } = this.state

    return (
      <NarrowPage heading='отзывы'>
        <div className={styles['give-feedback']}>
          <div className={styles['feedback-link-wrapper']}>
            <Link
              type='dashed'
              onClick={this.handleLeaveFeedbackClick}
              isActive={leaveFeedbackPopup}
            >
              Оставить отзыв
            </Link>
          </div>
          {leaveFeedbackPopup && this.renderPopup()}
        </div>
        <div className={styles['reviews']}>
          {this.props.children}
        </div>
      </NarrowPage>
    )
  }
}

export default ReviewsPage
