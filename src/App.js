import React, { Component } from 'react'

import Quiz from './Quiz'

import * as api from './api'
import { encryptAnswer } from './helpers/crypto'

import {
  readingTime,
  second
} from './helpers/time'

import './styles/app.css'
import './styles/reset.css'

const defaultPoints = 100

class App extends Component {
  state = {
    selectedAnswer: null,
    startTime: 0,
    time: 0,
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

  calculatePoints = (
    points,
    combo,
    time = this.state.time,
    startTime = this.state.startTime
  ) => {
    const speedRate = time / startTime

    const speedBonus = defaultPoints * speedRate
    const comboBonus = (combo + 1) * defaultPoints

    return Math.floor(points + comboBonus + speedBonus)
  }

  selectAnswer = (option) => {
    const { answers } = this.state
    const currentQuestion = this.state.quiz[this.state.currentQuestionId]

    this.pause()

    this.setState({ selectedAnswer: option })

    if (encryptAnswer(option) === currentQuestion.answer) {
      this.setState({
        combo: this.state.combo + 1,
        points: this.calculatePoints(this.state.points, this.state.combo),
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
    api.getQuiz()
      .then(quiz => {
        const estimatedReadingTime =
          readingTime(quiz[0].comment) + (10 * second)

        this.setState({
          started: true,
          quiz,
          startTime: estimatedReadingTime,
          time: estimatedReadingTime
        })

        this.intervalId = setInterval(this.tick, second)
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
    const nextQuestion = this.state.quiz[this.state.currentQuestionId + 1]
    const estimatedReadingTime = readingTime(nextQuestion.comment) + (10 * second)

    clearInterval(this.intervalId)

    this.setState({
      startTime: estimatedReadingTime,
      time: estimatedReadingTime,
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
      if (time > second) {
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
          startTime={this.state.startTime}
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
