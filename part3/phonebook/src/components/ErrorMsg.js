import React from 'react'

const ErrorMsg = ({ text }) => {
  const stylesError = {
    fontSize: '1.5rem',
    color: 'red',
    border: '1px solid red',
    padding: '1rem',
  }

  if (text === null) return null

  return <div style={stylesError}>{text}</div>
}

export default ErrorMsg
