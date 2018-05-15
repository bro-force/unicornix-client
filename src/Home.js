import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import AppContext from './AppContext'
import Unicorn from './icons/Unicorn'
import LabeledInput from './LabeledInput'
import Podium from './icons/Podium'

import './styles/home.css'

const Home = props => {
  const start = (context) => () => {
    return context.fetchQuiz()
      .then(quiz => {
        setTimeout(() => {
          context.start(quiz)
          props.history.push(`/${quiz.id}/quiz`)
        }, 500)
      })
  }

  return (
    <div className="home">
      <div className="home__logo-wrapper">
        <Unicorn
          width="150px"
          height="150px"
        />
      </div>

      <div className="">
        <h1 className="home__title">Quem quer ser um Unicornix?</h1>
        <h3 className="home__subtitle">O Quiz da famigerada planilha "Como é trabalhar em Startup?"</h3>
      </div>

      <AppContext.Consumer>
        { context => {
          const classes = [
            'home__start',
            context.loadingQuiz && 'animate'
          ]
            .filter(className => !!className)
            .join(' ')

          return (
            <React.Fragment>
              <LabeledInput
                value={context.nickname}
                onChange={context.onNameChange}
              />

              <button
                onClick={start(context)}
                className={classes}
              >
                { !context.loadingQuiz && (
                  <span className="home__start-text">
                    Começar
                  </span>
                )}
              </button>
            </React.Fragment>
          )
        }}

      </AppContext.Consumer>

      <div className="result__options">
        <div className="result__option-item">
          <Link to="/ranking">
            <button
              className="result__restart"
            >
              <Podium className="result__restart-icon" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home)
