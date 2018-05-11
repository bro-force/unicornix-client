import React from 'react'

import Answer from './Answer'
import Scoreboard from './Scoreboard'

const Quiz = props => (
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
      <Answer
        selectAnswer={props.selectAnswer}
        selectedAnswer={props.selectedAnswer}
        identifier={'A'}
        company={props.currentQuestion.alternatives[0]}
      />

      <Answer
        selectAnswer={props.selectAnswer}
        selectedAnswer={props.selectedAnswer}
        identifier={'B'}
        company={props.currentQuestion.alternatives[1]}
      />

      <Answer
        selectAnswer={props.selectAnswer}
        selectedAnswer={props.selectedAnswer}
        identifier={'C'}
        company={props.currentQuestion.alternatives[2]}
      />

      <Answer
        selectAnswer={props.selectAnswer}
        selectedAnswer={props.selectedAnswer}
        identifier={'D'}
        company={props.currentQuestion.alternatives[3]}
      />
    </div>
  </div>
)

export default Quiz
