import React from 'react'

import AppContext from './AppContext'
import Unicorn from './Unicorn'

import './styles/home.css'

const Home = props => {
  const start = (context) => () => {
    return context.fetchQuiz()
      .then(quiz => {
        setTimeout(() => {
          context.start(quiz)
          props.history.push(`/${quiz.id}/quiz`)
        }, 2000)
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
          )
        }}
      </AppContext.Consumer>
    </div>
  )
}

export default Home
