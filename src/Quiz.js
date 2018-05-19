import React from 'react'

import Scoreboard from './Scoreboard'
import Answers from './Answers'
import PointsPopup from './PointsPopup'
import AppContext from './AppContext'

import { iOSSafari } from './helpers/userAgent'

const Quiz = props => {
  const { innerHeight } = window

  let iosStyles = {
    quizMain: {},
    quizAnswers: {},
    quizBlockquote: {}
  }

  if (iOSSafari) {
    iosStyles.quizMain = {
      height: `${0.7 * innerHeight}px`,
      minHeight: 0
    }

    iosStyles.quizAnswers = {
      position: 'absolute',
      bottom: 0
    }

    iosStyles.quizBlockquote = {
      marginTop: '5px'
    }
  }

  return (
    <AppContext.Consumer>
      {(context) => {
        const currentQuestion = context.quiz.questions[context.currentQuestionId]

        return (
          <div className="quiz">
            <div
              className="quiz__main"
              style={iosStyles.quizMain}
            >
              <Scoreboard
                time={context.time}
                points={context.points}
                previousPoints={context.previousPoints}
                combo={context.combo}
              />
              <blockquote
                className="quiz__quote"
                style={iosStyles.quizBlockquote}
              >
                <p className="quiz__commentary">
                  { currentQuestion.comment }
                </p>
              </blockquote>
            </div>

            <div
              className="quiz__answers"
              style={iosStyles.quizAnswers}
            >
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
