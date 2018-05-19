import React from 'react'

import {
  StaggeredMotion,
  spring
} from 'react-motion'

import Answer from './Answer'

import { encryptAnswer } from './helpers/crypto'
import { iOSSafari } from './helpers/userAgent'

const animationConfig = {
  stiffness: 1000,
  damping: 100
}

const identifiers = [ 'A', 'B', 'C', 'D' ]

const Answers = props => {
  const { innerHeight } = window

  let iosStyles = {
    answer: {}
  }

  if (iOSSafari) {
    iosStyles.answer = {
      height: `${0.15 * innerHeight}px`
    }
  }

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
                  key={alternative}
                  selectAnswer={props.selectAnswer}
                  selectedAnswer={props.selectedAnswer}
                  identifier={identifiers[index]}
                  company={alternative}
                  error={hasError(alternative)}
                  success={hasSuccess(alternative)}
                  style={{
                    transform: `scale(${style.scale})`,
                    opacity: style.scale,
                    ...iosStyles.answer
                  }}
                />
              )
            })}
          </React.Fragment>
        )
      }}
    </StaggeredMotion>
  )
}

export default Answers
