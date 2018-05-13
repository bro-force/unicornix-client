import React from 'react'

import Trophy from './Trophy'
import Star from './Star'
import Twitter from './Twitter'
import AppContext from './AppContext'

import './styles/result.css'

const twitterUrl = text => {
  const textEncoded = encodeURI(text)

  return `https://twitter.com/intent/tweet?text=${textEncoded}`
}

const countStars = answers => {
  const successes =
    answers.filter(answer => answer.isCorrect).length

  if (successes === 10) return 5
  if (successes > 8) return 4
  if (successes > 6) return 3
  if (successes > 4) return 2
  if (successes > 0) return 1

  return 0
}

const countSuccesses = answers => {
  const successes = 
    answers.filter(answer => answer.isCorrect).length

  return successes
}

const renderStars = stars => {
  let starsCount = stars

  return Array.from({ length: 5 }).map((_, index) => {
    let component = (
      <Star
        key={index}
        className="result__star"
        success={false}
      />
    )

    if (starsCount > 0) {
      component = (
        <Star
          key={index}
          className="result__star"
          success={true}
        />
      )

      starsCount = starsCount - 1
    }

    return component
  })
}

const Result = props => {
  return (
    <AppContext.Consumer>
      { ({
        points,
        answers,
        maxCombo
      }) => (
        <div className="result">
          <h1 className="result__title">Resultado</h1>
          <div className="result__trophy-wrapper">
            <div className="result__stars">
              { renderStars(countStars(answers)) }
            </div>
            <Trophy className="result__trophy" />
          </div>

          <div className="result__data">
            <div className="result__data-set">
              <h2 className="result__data-item">{ countSuccesses(answers) }/10</h2>
              <h3 className="result__data-label">Acertos</h3>
            </div>

            <div className="result__data-set">
              <h2 className="result__data-item">{ points }</h2>
              <h3 className="result__data-label">Pontos</h3>
            </div>

            <div className="result__data-set">
              <h2 className="result__data-item">{ maxCombo }</h2>
              <h3 className="result__data-label">Combo Máximo</h3>
            </div>
          </div>

          <div className="result__options">
            <div className="result__option-item">
            </div>

            <div className="result__option-item">
              <a
                className="result__twitter"
                href={twitterUrl('Só vamo')}
                target="blank"
              >
                <Twitter className="result__twitter-icon" />
              </a>
            </div>
          </div>
        </div>
      )}
    </AppContext.Consumer>
  )
}

export default Result
