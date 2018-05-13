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

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          component={withRouter(Home)}
        />

        <Route
          exact
          path="/quiz"
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
                <Redirect to="/result" />
              )
            }
          }}
        />

        <Route
          exact
          path="/result"
          render={() => (
            props.finished
              ? <Result />
              : <Redirect to="/" />
          )}
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
