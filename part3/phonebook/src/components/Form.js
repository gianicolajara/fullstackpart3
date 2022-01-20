import React from 'react'
import personsServices from '../services/persons.services'
import Button from './Button'
import Titleh2 from './Titleh2'

const Form = ({
  setNewName,
  newName,
  setNewNumber,
  newNumber,
  handleCreaterPerson,
  handleUpdatePerson,
  setErrorMsg,
  setSuccessMsg,
}) => {
  const handleChangeInputName = (e) => {
    setNewName(e.target.value)
  }

  const handleChangeInputNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (newName.trim().length === 0 || newNumber.trim().length === 0) {
      setErrorMsg('name or number is invalid')
      setTimeout(() => setErrorMsg(null), 5000)
      return
    }

    personsServices
      .getPersonByName(newName)
      .then((res) => {
        updateOrCreatePerson(res)
      })
      .catch((err) => {
        setSuccessMsg(err.message)
        setTimeout(() => setSuccessMsg(null), 5000)
      })
  }

  const updateOrCreatePerson = (res) => {
    if (res) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`,
      )
      if (!confirm) return
      handleUpdatePerson(res.id)
    } else {
      handleCreaterPerson()
    }
  }

  return (
    <>
      <Titleh2 text="add a new" />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            onChange={handleChangeInputName}
            value={newName}
            required
          />
          <br />
          <label htmlFor="number">Number: </label>
          <input
            id="number"
            onChange={handleChangeInputNumber}
            value={newNumber}
            required
          />
        </div>
        <div>
          <Button type="submit" text="add" />
        </div>
      </form>
    </>
  )
}

export default Form
