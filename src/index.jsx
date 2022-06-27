import React from 'react'
import ReactDOM from 'react-dom'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import App from './App'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </LocalizationProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
