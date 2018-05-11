import React from 'react'

import './Scoreboard.css'

const Scoreboard = props => {
  return (
    <div className="scoreboard">
      <h2 className="scoreboard__time">00:00</h2>
      <div className="scoreboard__score">Pontuação: 100</div>
    </div>
  )
}

export default Scoreboard
