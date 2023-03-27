import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.js'
import { AlertProvider } from './context/AlertContext'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider>
      <App />
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
reportWebVitals(console.log)
