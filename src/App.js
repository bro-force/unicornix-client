import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Router from './Routes'
import AppContext from './AppContext.js'

import * as api from './api'
import { encryptAnswer } from './helpers/crypto'

import {
  lgBreakpoint,
  getDeviceWidth
} from './helpers/dimensions'

import {
  readingTime,
  second
} from './helpers/time'

import './styles/app.css'
import './styles/reset.css'

const defaultPoints = 100

const initialState = {
  selectedAnswer: null,
  startTime: 0,
  time: 0,
  quiz: {},
  loadingQuiz: false,
  currentQuestionId: 0,
  answers: [],
  started: false,
  finished: false,
  paused: false,
  combo: -1,
  maxCombo: 0,
  points: 0,
  previousPoints: 0
}

class App extends Component {
  state = initialState

  get hasNextQuestion () {
    return this.state.currentQuestionId < this.state.quiz.questions.length - 1
  }

  resetQuiz = (callback) => {
    this.setState(initialState, callback)
  }

  calculatePoints = (
    points,
    combo,
    time = this.state.time,
    startTime = this.state.startTime
  ) => {
    const newCombo = combo + 1 < 2 ? 0 : combo + 1
    const speedRate = time / startTime

    const speedBonus = defaultPoints * speedRate
    const comboBonus = newCombo * defaultPoints

    return Math.floor(points + comboBonus + speedBonus + defaultPoints)
  }

  selectAnswer = (option) => {
    const { answers } = this.state
    const currentQuestion = this.state.quiz.questions[this.state.currentQuestionId]
    const selectedAnswerEncrypted = encryptAnswer(option)
    const isCorrect = selectedAnswerEncrypted === currentQuestion.answer

    const questionStatus = {
      isCorrect,
      selectedAnswer: selectedAnswerEncrypted,
      answer: currentQuestion.answer
    }

    api.saveAnswer({
      quizId: this.state.quiz.id,
      questionIndex: this.state.currentQuestionId,
      selectedAnswer: option
    })

    this.pause()

    this.setState({ selectedAnswer: option })

    if (isCorrect) {
      const newCombo = this.state.combo + 1
      const maxCombo =
        this.state.maxCombo > newCombo
          ? this.state.maxCombo
          : newCombo

      this.setState({
        combo: this.state.combo + 1,
        points: this.calculatePoints(this.state.points, this.state.combo),
        previousPoints: this.state.points,
        maxCombo
      })
    } else {
      this.setState({ combo: -1 })
    }

    setTimeout(() => {
      this.resume()

      if (this.hasNextQuestion) {
        this.next()

        this.setState({
          answers: [ ...answers, questionStatus ],
          selectedAnswer: null
        })
      } else {
        this.setState({
          time: 0,
          finished: true,
          answers: [ ...answers, questionStatus ],
          selectedAnswer: null
        })
      }
    }, second)
  }

  fetchQuiz = () => {
    this.setState({
      loadingQuiz: true
    })

    return api.getQuiz()
  }

  start = (quiz) => {
    const estimatedReadingTime =
      readingTime(quiz.questions[0].comment) + (10 * second)

    this.setState({
      started: true,
      loadingQuiz: true,
      quiz,
      startTime: estimatedReadingTime,
      time: estimatedReadingTime,
    })

    this.intervalId = setInterval(this.tick, second)
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
    const nextQuestion = this.state.quiz.questions[this.state.currentQuestionId + 1]
    const estimatedReadingTime = readingTime(nextQuestion.comment) + (10 * second)
    const deviceWidth = getDeviceWidth()

    clearInterval(this.intervalId)

    this.setState({
      startTime: estimatedReadingTime,
      time: estimatedReadingTime,
      currentQuestionId: this.state.currentQuestionId + 1
    })

    setTimeout(() => {
      this.intervalId = setInterval(this.tick, second)
    }, 0.1 * second)

    if (deviceWidth < lgBreakpoint) {
      setTimeout(() => {
        this.scrollToTop()
      }, second)
    }
  }

  scrollToTop () {
    ReactDOM.findDOMNode(this).scrollIntoView()
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
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          start: this.start,
          selectAnswer: this.selectAnswer,
          fetchQuiz: this.fetchQuiz,
          resetQuiz: this.resetQuiz
        }}
      >
        <Router
          started={this.state.started}
          finished={this.state.finished}
          quiz={this.state.quiz}
        />
      </AppContext.Provider>
    )
  }
}

export default App
