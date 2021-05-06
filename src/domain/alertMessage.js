import React from 'react'
import ReactDOM from 'react-dom'
import { transitions, positions } from 'react-alert'

import Alert from '../shared/Alert'

var timer

const alertMessage = () => {
    const show = (color, message, duration = 4000) => {
        ReactDOM.render(<Alert color={color} message={message} />, document.getElementById('alert-container'))
        reset()
        start(duration)
    }

    const start = (duration) => {
        timer = setTimeout(() => 
            ReactDOM.render('', document.getElementById('alert-container')),  
            duration
        )
    }

    const reset = () => clearTimeout(timer)

    const template = ({ message }) => (
        <div className="text-sm px-2 py-2 border-0 rounded relative mb-4 bg-white mt-2 mr-2 border border-gray-500">
            <span className="text-xl inline-block ml-1.5 mr-3 align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="inline-block align-middle mr-8">
                <b>{message}</b> limit reached.<br/>
                Fetching data will reset to first page.
            </span>
        </div>
    )

    const options = {
      position: positions.TOP_RIGHT,
      timeout: 10000,
      transition: transitions.FADE
    }

    return { show, template, options }
}
  
export default alertMessage()
