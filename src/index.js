import React from 'react';
import ReactDOM from 'react-dom';
import './assets/tailwind.css';
import App from './App';
import store from './redux/store'
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import axios from 'axios'
import { Provider as AlertProvider } from 'react-alert'

import alert from './domain/alertMessage'

axios.defaults.baseURL = process.env.REACT_APP_API_URL

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={alert.template} {...alert.options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
