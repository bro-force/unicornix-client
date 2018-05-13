import React from 'react'

import Trophy from './Trophy'
import Star from './Star'

import './styles/result.css'

const Result = props => {
  return (
    <div className="result">
      <div className="result__trophy-wrapper">
        <div className="result__stars">
          <Star className="result__star" />
          <Star className="result__star" />
          <Star className="result__star" />
          <Star className="result__star" />
          <Star className="result__star" />
        </div>
        <Trophy className="result__trophy" />
      </div>

      <div className="result__data">
        <h2 className="result__data-item">8/10</h2>
        <h3 className="result__data-label">Acertos</h3>
        <h2 className="result__data-item">1000</h2>
        <h3 className="result__data-label">Pontos</h3>
      </div>
    </div>
  )
}

export default Result
