import React, { Component } from 'react'

import Answer from './Answer'
import Scoreboard from './Scoreboard'

import './App.css'
import './reset.css'

class App extends Component {
  state = {
    selectedAnswer: null,
    time: 0
  }

  selectAnswer = (option) => {
    if (option !== this.state.selectedAnswer) {
      this.setState({ selectedAnswer: option })
    } else {
      this.setState({ selectedAnswer: null })
    }
  }

  submitAnswer = () => {
    console.log('you choose', this.state.selectedAnswer)
  }

  render() {
    return (
      <div className="quiz">
        <div className="quiz__main">
          <Scoreboard />
          <blockquote className="quiz__quote">
            <p className="quiz__commentary">
              Empresa se diz maior do Brasil, com sócios postando fotos diarias com grandes investidores mas dentro de casa é tudo precário, metade do efetivo são estágiários de engenharia que carregam o core da empresa. Só cresce quem é amigo dos chefes. Agora tem um escritório bacana em São Paulo onde o pessoal da panelinha pode ficar longe dos meros mortais.
            </p>
          </blockquote>
        </div>

        <div className="quiz__answers">
          <Answer
            selectAnswer={this.selectAnswer}
            selectedAnswer={this.state.selectedAnswer}
            identifier={'A'}
            company={'Codeminer 42'}
          />

          <Answer
            selectAnswer={this.selectAnswer}
            selectedAnswer={this.state.selectedAnswer}
            identifier={'B'}
            company={'Neon'}
          />

          <Answer
            selectAnswer={this.selectAnswer}
            selectedAnswer={this.state.selectedAnswer}
            identifier={'C'}
            company={'ThoughWorks'}
          />

          <Answer
            selectAnswer={this.selectAnswer}
            selectedAnswer={this.state.selectedAnswer}
            identifier={'D'}
            company={'Nubank'}
          />
        </div>
      </div>
    );
  }
}

export default App;
