import React from 'react'
import Button from './Button'

const Number = ({ name, number, id, handleDeletePerson }) => {
  return (
    <>
      <li>
        {name} {number}
        <Button text="delete" handleClick={() => handleDeletePerson(id)} />
      </li>
    </>
  )
}

export default Number
