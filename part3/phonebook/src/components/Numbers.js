import React from 'react'
import Number from './Number'
import Titleh2 from './Titleh2'

const Numbers = ({ persons, handleDeletePerson }) => {
  return (
    <>
      <Titleh2 text="Numbers" />
      <ul>
        {persons.length > 0
          ? persons.map(({ name, number, id }) => (
              <Number
                name={name}
                number={number}
                id={id}
                handleDeletePerson={handleDeletePerson}
                key={id}
              />
            ))
          : 'You dont have numbers'}
      </ul>
    </>
  )
}

export default Numbers
