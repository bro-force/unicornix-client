import React from 'react'

import AppContext from './AppContext'

const Home = props => {
  const start = (context) => () => {
    console.log(context)
    return context.start()
      .then(() => props.history.push('/quiz'))
  }

  return (
    <AppContext.Consumer>
      { context => (
        <button onClick={start(context)}>Start</button>
      )}
    </AppContext.Consumer>
  )
}

export default Home
