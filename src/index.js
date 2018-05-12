import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import dotenv from 'dotenv'

import './styles/index.css'

dotenv.config()

console.log(process.env)

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
