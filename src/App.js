import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Quiz from './Quiz'
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

import fakeData from './fakeData.json'

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

  fetchQuiz = () => {
    this.setState({
      loadingQuiz: true
    })

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(fakeData)
      }, 2000)
    })
  }

  start = (quiz) => {
    const estimatedReadingTime =
      readingTime(quiz[0].comment) + (10 * second)

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
    const nextQuestion = this.state.quiz[this.state.currentQuestionId + 1]
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
          fetchQuiz: this.fetchQuiz
        }}
      >
        <Router started={this.state.started} />
      </AppContext.Provider>
    )
  }
}

export default App
