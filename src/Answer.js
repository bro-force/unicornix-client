import React from 'react'

import errorIcon from './icons/error.svg'
import successIcon from './icons/success.svg'
import './styles/answer.css'

const Answer = props => {
  return (
    <div
      className="answer"
      onClick={() => props.selectAnswer(props.company)}
      role="button"
    >
      <div className="answer__identifier">{ props.identifier }</div>
      <div className="answer__value">{ props.company }</div>

      { props.error && (
        <img
          className="answer__feedback"
          src={errorIcon}
          alt="Error icon"
        />
      )}

      { props.success && (
        <img
          className="answer__feedback"
          src={successIcon}
          alt="Success icon"
        />
      )}
    </div>
  )
}

export default Answer
