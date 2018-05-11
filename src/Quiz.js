import React from 'react'

import Answer from './Answer'
import Scoreboard from './Scoreboard'

const identifiers = [ 'A', 'B', 'C', 'D' ]

const Quiz = props => {
  const hasError = (answer) => {
    return (
      props.selectedAnswer !== null &&
      props.selectedAnswer === answer &&
      props.selectedAnswer !== props.currentQuestion.answer
    )
  }

  const hasSuccess = (answer) => {
    return (
      props.selectAnswer !== null &&
      props.selectedAnswer === answer &&
      props.selectedAnswer === props.currentQuestion.answer
    )
  }

  return (
    <div className="quiz">
      <div className="quiz__main">
        <Scoreboard
          time={props.time}
        />
        <blockquote className="quiz__quote">
          <p className="quiz__commentary">
            { props.currentQuestion.comment }
          </p>
        </blockquote>
      </div>

      <div className="quiz__answers">
        { props.currentQuestion.alternatives.map((alternative, index) => (
          <Answer
            selectAnswer={props.selectAnswer}
            selectedAnswer={props.selectedAnswer}
            identifier={identifiers[index]}
            company={alternative}
            error={hasError(alternative)}
            success={hasSuccess(alternative)}
          />
        ))}
      </div>
    </div>
  )
}

export default Quiz
