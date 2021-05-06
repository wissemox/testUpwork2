import React from 'react'

const Alert = ({ color, message }) => {
    return (
        <div class={`flex justify-center ${color} text-white text-sm font-bold px-4 py-3`} role="alert">
            <p>{message}</p>
        </div>
    )
}

export default Alert