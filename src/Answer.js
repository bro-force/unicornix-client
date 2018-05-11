import React from 'react'
import './Answer.css'

const Answer = props => {
  return (
    <div
      className="answer"
      onClick={() => props.selectAnswer(props.company)}
    >
      <div className="answer__identifier">{ props.identifier }</div>
      <div className="answer__value">{ props.company }</div>
    </div>
  )
}

export default Answer
