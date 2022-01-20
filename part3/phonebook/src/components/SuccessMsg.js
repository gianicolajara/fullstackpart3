import React from 'react'

const SuccessMsg = ({ text }) => {
  const stylesSuccess = {
    fontSize: '1.5rem',
    color: 'green',
    border: '1px solid green',
    padding: '1rem',
  }

  if (text === null) return null

  return <div style={stylesSuccess}>{text}</div>
}

export default SuccessMsg
