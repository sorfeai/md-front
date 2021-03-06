import React from 'react'
import FeedbackResponse from './FeedbackResponse'
import styles from './../styles/components/Question.css'
import withFetch from './HOCs/withFetch'

const Question = ({ author, question, answer }) => {
  return (
    <div className={styles['question-wrapper']}>
      <FeedbackResponse
        hideResponse={true}
        feedback={question}
        response={answer}
      />
    </div>
  )
}

export default Question
