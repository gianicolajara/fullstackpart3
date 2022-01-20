import React from 'react'

const Button = ({ text, handleClick, type }) => {
  return (
    <button onClick={handleClick} type={type}>
      {text}
    </button>
  )
}

export default Button
