import React from 'react'

import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

import Home from './Home'
import Quiz from './Quiz'
import Result from './Result'
import Ranking from './Ranking'

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={Home}
        />

        <Route
          exact
          path="/:quizId/quiz"
          render={() => {
            if (!props.started) {
              return (
                <Redirect to="/" />
              )
            } else if (props.started && !props.finished) {
              return (
                <Quiz />
              )
            } else {
              return (
                <Redirect to={`/${props.quiz.id}/result`} />
              )
            }
          }}
        />

        <Route
          exact
          path="/:quizId/result"
          render={() => (
            props.finished
              ? <Result />
              : <Redirect to="/" />
          )}
        />

        <Route
          exact
          path="/ranking"
          component={Ranking}
        />

        <Route
          path="*"
          exact
          render={() => <Redirect to="/" />}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
