import React, { Component } from 'react'

import Quiz from './Quiz'

import './styles/app.css'
import './styles/reset.css'

const second = 1000
const maxTime = 15 * second

const fakeData = [
  {
    comment: 'Empresa se diz maior do Brasil, com sócios postando fotos diarias com grandes investidores mas dentro de casa é tudo precário, metade do efetivo são estágiários de engenharia que carregam o core da empresa. Só cresce quem é amigo dos chefes. Agora tem um escritório bacana em São Paulo onde o pessoal da panelinha pode ficar longe dos meros mortais.',
    answer: 'NEON',
    alternatives: [ 'CODE', 'NUBANK', 'SAMBATECH', 'NEON' ]
  },
  {
    comment: 'Empresa que quer abraçar o mundo, mas não consegue definir um MVP. Lá é um lugar onde todo mundo é especialista, tem um diretor para cara 8 funcionários. Guerra de ego que impede o avanço. Sem zelo pelo funcionário, benefícios mal distribuídos, ou seja, não recomendo ao menos que você seja diretor.',
    answer: 'Yandeh',
    alternatives: [ 'Autoforce', 'Apple', 'Yandeh', 'GCTI' ]
  },
  {
    comment: 'Para mim o ambiente é excelente. A adrenalina de trabalhar em uma empresa que cresce 20% ao mês é bem empolgante. Aqui tudo é simples, espartano. Não tem ping-pong, video game, nem decoração descolada. Mas tem muita cerveja. É um ambiente que permite o aprendizado e o crescimento. Os problemas estão quase sempre relacionados sobre como crescer mais e conseguir mais clientes.',
    answer: 'Ramper',
    alternatives: [ 'Ramper', 'Google', 'Yandeh', 'Kitado' ]
  }
]

class App extends Component {
  state = {
    selectedAnswer: null,
    time: maxTime,
    quiz: fakeData,
    currentQuestionId: 0,
    answers: [],
    started: false,
    finished: false,
    paused: false
  }

  get hasNextQuestion () {
    return this.state.currentQuestionId < this.state.quiz.length - 1
  }

  selectAnswer = (option) => {
    const {
      currentQuestionId,
      answers
    } = this.state

    this.pause()

    this.setState({ selectedAnswer: option })

    setTimeout(() => {
      this.resume()

      if (this.hasNextQuestion) {
        this.setState({
          time: maxTime,
          currentQuestionId: currentQuestionId + 1,
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
    this.setState({
      time: maxTime,
      currentQuestionId: this.state.currentQuestionId + 1
    })
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

    if (this.state.started) {
      const currentQuestion = this.state.quiz[this.state.currentQuestionId]

      return (
        <Quiz
          time={this.state.time}
          selectedAnswer={this.state.selectedAnswer}
          selectAnswer={this.selectAnswer}
          questions={this.state.quiz}
          currentQuestion={currentQuestion}
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
