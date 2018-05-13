import React from 'react'

import {
  Motion,
  spring
} from 'react-motion'

const pointsSpringConfig = {
  stiffness: 1000
}

const PointsPopup = props => {
  return (
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
  )
}

export default PointsPopup
