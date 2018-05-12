import React from 'react'

import {
  Motion,
  StaggeredMotion,
  spring
} from 'react-motion'

import Answer from './Answer'
import Scoreboard from './Scoreboard'

import { encryptAnswer } from './helpers/crypto'

const identifiers = [ 'A', 'B', 'C', 'D' ]

const animationConfig = {
  stiffness: 1000,
  damping: 100
}

const pointsSpringConfig = {
  stiffness: 1000
}

const Quiz = props => {
  const hasError = (answer) => {
    return (
      props.selectedAnswer !== null &&
      props.selectedAnswer === answer &&
      encryptAnswer(props.selectedAnswer) !== props.currentQuestion.answer
    )
  }

  const hasSuccess = (answer) => {
    return (
      props.selectAnswer !== null &&
      props.selectedAnswer === answer &&
      encryptAnswer(props.selectedAnswer) === props.currentQuestion.answer
    )
  }

  return (
    <div className="quiz">
      <div className="quiz__main">
        <Scoreboard
          time={props.time}
          points={props.points}
          previousPoints={props.previousPoints}
          combo={props.combo}
        />
        <blockquote className="quiz__quote">
          <p className="quiz__commentary">
            { props.currentQuestion.comment }
          </p>
        </blockquote>
      </div>

      <div className="quiz__answers">
        <Motion
          defaultStyle={{ points: props.previousPoints }}
          style={{ points: spring(props.points, pointsSpringConfig) }}
        >
          {({ points }) => {
            const newPoints = props.points - props.previousPoints
            const canDisplay = points !== props.points

            return (
              <span
                className="quiz__new-points"
                style={{
                  transform: `scale(${ points / props.points })`,
                  display: canDisplay ? 'block' : 'none'
                }}
              >
                +{ newPoints }
              </span>
            )
          }}
        </Motion>
        <StaggeredMotion
          defaultStyles={[
            { scale: props.time === props.startTime ? 0 : 1 },
            { scale: props.time === props.startTime ? 0 : 1 },
            { scale: props.time === props.startTime ? 0 : 1 },
            { scale: props.time === props.startTime ? 0 : 1 },
          ]}
          styles={prevInterpolatedStyles => [
            { scale: props.time === props.startTime ? spring(0, animationConfig) : spring(1, animationConfig) },
            { scale: spring(prevInterpolatedStyles[0].scale, animationConfig) },
            { scale: spring(prevInterpolatedStyles[3].scale, animationConfig) },
            { scale: spring(prevInterpolatedStyles[1].scale, animationConfig) },
          ]}
        >
          { interpolatingStyles => {
            return (
              <React.Fragment>
                { props.currentQuestion.alternatives.map((alternative, index) => {
                  const style = interpolatingStyles[index]

                  return (
                    <Answer
                      selectAnswer={props.selectAnswer}
                      selectedAnswer={props.selectedAnswer}
                      identifier={identifiers[index]}
                      company={alternative}
                      error={hasError(alternative)}
                      success={hasSuccess(alternative)}
                      style={{
                        transform: `scale(${style.scale})`,
                        opacity: style.scale
                      }}
                    />
                  )
                })}
              </React.Fragment>
            )
          }}
        </StaggeredMotion>
      </div>
    </div>
  )
}

export default Quiz
