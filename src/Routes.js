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
          render={() => (
            props.started ? (
              <Quiz />
            ) : (
              <Redirect to="/" />
            )
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
