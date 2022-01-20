import React from 'react'
import Title from './Title'

const FormFilterPersons = ({ textFilterPersons, setTextFilterPersons }) => {
  const handleChangeFilterPerson = (e) => {
    setTextFilterPersons(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <Title text="Phonebook" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="filter">filter shown with</label>
        <input
          id="fiter"
          type="text"
          value={textFilterPersons}
          onChange={handleChangeFilterPerson}
        />
      </form>
    </>
  )
}

export default FormFilterPersons
