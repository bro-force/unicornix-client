import React from 'react'
import { withRouter } from 'react-router-dom'

import Trophy from './icons/Trophy'
import Star from './icons/Star'
import Twitter from './icons/Twitter'
import Restart from './icons/Restart'
import Podium from './icons/Podium'
import Github from './icons/Github'

import AppContext from './AppContext'

import './styles/result.css'


class Result extends React.Component {
  twitterUrl = (answers, points) => {
    const successes = this.countSuccesses(answers)

    const message = encodeURI(`
      Fiz o quiz da planilha 'Como é trabalhar em Startup' e consegui ${points} pontos
      e ${successes} acertos! http://quemquerserumunicornix.netlify.com
    `)

    return `https://twitter.com/intent/tweet?text=${message}`
  }

  countStars = answers => {
    const successes =
      answers.filter(answer => answer.isCorrect).length

    if (successes === 10) return 5
    if (successes >= 8) return 4
    if (successes >= 5) return 3
    if (successes >= 3) return 2
    if (successes > 0) return 1

    return 0
  }

  countSuccesses = answers => {
    const successes =
      answers.filter(answer => answer.isCorrect).length

    return successes
  }

  renderStars = stars => {
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

  onReset = (resetQuiz) => () => {
    resetQuiz(this.props.history.push('/'))
  }

  goToRanking = resetQuiz => () => {
    resetQuiz(this.props.history.push('/ranking'))
  }

  render () {
    return (
      <AppContext.Consumer>
        { ({
          points,
          answers,
          maxCombo,
          resetQuiz
        }) => (
          <div className="result">
            <h1 className="result__title">Resultado</h1>
            <div className="result__trophy-wrapper">
              <div className="result__stars">
                { this.renderStars(this.countStars(answers)) }
              </div>
              <Trophy className="result__trophy" />
            </div>

            <div className="result__data">
              <div className="result__data-set">
                <h2 className="result__data-item">{ this.countSuccesses(answers) }/10</h2>
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
              <div className="result__option-item scale-0">
                <button
                  onClick={this.onReset(resetQuiz)}
                  className="result__restart"
                >
                  <Restart className="result__restart-icon" />
                </button>
              </div>

              <div className="result__option-item scale-0">
                <button
                  className="result__restart"
                  onClick={this.goToRanking(resetQuiz)}
                >
                  <Podium className="result__restart-icon" />
                </button>
              </div>

              <div className="result__option-item scale-0">
                <a
                  href="https://github.com/bro-force"
                  target="blank"
                >
                  <button
                    className="result__restart"
                  >
                    <Github className="result__restart-icon" />
                  </button>
                </a>
              </div>

              <div className="result__option-item scale-0">
                <a
                  className="result__twitter"
                  href={this.twitterUrl(answers, points)}
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
}

export default withRouter(Result)
