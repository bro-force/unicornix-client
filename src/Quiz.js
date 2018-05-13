import React from 'react'

import Scoreboard from './Scoreboard'
import Answers from './Answers'
import PointsPopup from './PointsPopup'
import AppContext from './AppContext'

const Quiz = props => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const currentQuestion = context.quiz[context.currentQuestionId]

        return (
          <div className="quiz">
            <div className="quiz__main">
              <Scoreboard
                time={context.time}
                points={context.points}
                previousPoints={context.previousPoints}
                combo={context.combo}
              />
              <blockquote className="quiz__quote">
                <p className="quiz__commentary">
                  { currentQuestion.comment }
                </p>
              </blockquote>
            </div>

            <div className="quiz__answers">
              <PointsPopup
                points={context.points}
                previousPoints={context.previousPoints}
              />

              <Answers
                time={context.time}
                startTime={context.startTime}
                currentQuestion={currentQuestion}
                selectAnswer={context.selectAnswer}
                selectedAnswer={context.selectedAnswer}
              />
            </div>
          </div>
        )
      }}
    </AppContext.Consumer>
  )
}

export default Quiz
