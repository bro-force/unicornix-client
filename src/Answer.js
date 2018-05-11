import React from 'react'
import { Motion, spring } from 'react-motion'

import errorIcon from './icons/error.svg'
import successIcon from './icons/success.svg'
import './styles/answer.css'

const Answer = props => {
  const errorSpringConfig = {
    stiffness: 500,
    damping: 15
  }

  return (
    <div
      className="answer"
      onClick={() => props.selectAnswer(props.company)}
      role="button"
      style={props.style}
    >
      <div className="answer__identifier">{ props.identifier }</div>
      <div className="answer__value">{ props.company }</div>

      <Motion
        defaultStyle={{
          scale: 0,
          rotate: 90
        }}
        style={{
          scale: spring(props.error ? 1 : 0, errorSpringConfig),
          rotate: spring(props.error ? 0 : 90, errorSpringConfig)
        }}
      >
        {({ scale, rotate }) => (
          <img
            className="answer__feedback"
            src={errorIcon}
            alt="Error icon"
            style={{
              transform: `scale(${scale}) rotateZ(${rotate}deg)`,
              WebkitTransform: `scale(${scale}deg)`
            }}
          />
        )}
      </Motion>

      <Motion
        defaultStyle={{
          scale: 0,
          rotate: 90
        }}
        style={{
          scale: spring(props.success ? 1 : 0, errorSpringConfig),
          rotate: spring(props.success ? 0 : 90, errorSpringConfig)
        }}
      >
        {({ scale, rotate }) => (
          <img
            className="answer__feedback"
            src={successIcon}
            alt="Success icon"
            style={{
              transform: `scale(${scale}) rotateZ(${rotate}deg)`,
              WebkitTransform: `scale(${scale}deg)`
            }}
          />
        )}
      </Motion>
    </div>
  )
}

export default Answer
