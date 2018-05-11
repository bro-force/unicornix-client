import React from 'react'

import './styles/scoreboard.css'

const Scoreboard = props => {
  const timeInSeconds = props.time / 1000

  const minutes = Math.floor(timeInSeconds / 60)
  const remainingSeconds = timeInSeconds % 60

  const minutesDisplay = String(minutes).padStart(2, '0')
  const secondsDisplay = String(remainingSeconds).padStart(2, '0')

  return (
    <div className="scoreboard">
      <h2 className="scoreboard__time">{ minutesDisplay }:{ secondsDisplay }</h2>
      <div className="scoreboard__score">Pontuação: 100</div>
    </div>
  )
}

export default Scoreboard
