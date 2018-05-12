import React, { Component } from 'react'

import Quiz from './Quiz'
import * as api from './api'

import './styles/app.css'
import './styles/reset.css'

const second = 1000
const maxTime = 15 * second

class App extends Component {
  state = {
    selectedAnswer: null,
    time: maxTime,
    quiz: [],
    currentQuestionId: 0,
    answers: [],
    started: false,
    finished: false,
    paused: false,
    combo: 0,
    points: 0,
    previousPoints: 0
  }

  get hasNextQuestion () {
    return this.state.currentQuestionId < this.state.quiz.length - 1
  }

  selectAnswer = (option) => {
    const { answers } = this.state
    const currentQuestion = this.state.quiz[this.state.currentQuestionId]

    this.pause()

    this.setState({ selectedAnswer: option })

    if (option === currentQuestion.answer) {
      this.setState({
        combo: this.state.combo + 1,
        points: this.state.points + ((this.state.combo + 1) * 100),
        previousPoints: this.state.points
      })
    } else {
      this.setState({ combo: 0 })
    }

    setTimeout(() => {
      this.resume()

      if (this.hasNextQuestion) {
        this.next()

        this.setState({
          answers: [ ...answers, option ],
          selectedAnswer: null
        })
      } else {
        this.setState({
          time: 0,
          finished: true,
          answers: [ ...answers, option ],
          selectedAnswer: null
        })
      }
    }, second)
  }

  start = () => {
    this.setState({ started: true })
    this.intervalId = setInterval(this.tick, second)

    api.getQuiz()
      .then(quiz => {
        this.setState({ quiz })
      })
  }

  pause = () => {
    this.setState({ paused: true })
  }

  resume = () => {
    this.setState({ paused: false })
  }

  decrementTime = () => {
    this.setState({ time: this.state.time - second })
  }

  next = () => {
    clearInterval(this.intervalId)

    this.setState({
      time: maxTime,
      currentQuestionId: this.state.currentQuestionId + 1
    })

    setTimeout(() => {
      this.intervalId = setInterval(this.tick, second)
    }, 0.1 * second)
  }

  finish = () => {
    clearInterval(this.intervalId)

    this.setState({
      finished: true,
      time: 0
    })
  }

  tick = () => {
    const {
      time,
      paused
    } = this.state

    if (!paused) {
      if (time > 0) {
        this.decrementTime()
      } else if (this.hasNextQuestion) {
        this.next()
      } else {
        this.finish()
      }
    }

  }

  render() {
    if (this.state.finished) {
      return (
        <div className="finish">
          <h2>You rock!</h2>

          { this.state.answers.join(', ') }
        </div>
      )
    }

    if (this.state.started && this.state.quiz.length > 0) {
      const currentQuestion = this.state.quiz[this.state.currentQuestionId]

      return (
        <Quiz
          time={this.state.time}
          selectedAnswer={this.state.selectedAnswer}
          selectAnswer={this.selectAnswer}
          questions={this.state.quiz}
          currentQuestion={currentQuestion}
          points={this.state.points}
          previousPoints={this.state.previousPoints}
          combo={this.state.combo}
        />
      )
    }

    return (
      <div className="pre-quiz">
        <button onClick={this.start}>Start</button>
      </div>
    )
  }
}

export default App;
