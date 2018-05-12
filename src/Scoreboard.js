import React from 'react'
import TrackVisibility from 'react-on-screen'

import {
  Motion,
  spring
} from 'react-motion'

import './styles/scoreboard.css'

const animationConfig = {
  stiffness: 1000,
}

const Scoreboard = props => {
  const timeInSeconds = Math.floor(props.time / 1000)

  const minutes = Math.floor(timeInSeconds / 60)
  const remainingSeconds = timeInSeconds % 60

  const minutesDisplay = String(minutes).padStart(2, '0')
  const secondsDisplay = String(remainingSeconds).padStart(2, '0')

  return (
    <div className="scoreboard">
      <TrackVisibility
        throttleInterval={500}
      >
        {({ isVisible }) => {
          const classNames = [
            'scoreboard__floating-timer',
            isVisible && 'scoreboard__floating-timer--hidden'
          ]
            .filter(className => !!className)
            .join(' ')

          return (
            <h2 className={classNames}>
              { minutesDisplay }:{ secondsDisplay }
            </h2>
          )
        }}
      </TrackVisibility>

      <h2 className="scoreboard__time">
        { minutesDisplay }:{ secondsDisplay }
      </h2>

      <Motion
        defaultStyle={{ points: props.previousPoints }}
        style={{ points: spring(props.points, animationConfig) }}
      >
        {({ points }) => {
          return (
            <React.Fragment>
              <div className="scoreboard__score">Pontuação: { Math.floor(points) }</div>
              <div className="scoreboard__combo">Combo: { props.combo }</div>
            </React.Fragment>
          )
        }}
      </Motion>
    </div>
  )
}

export default Scoreboard
