import React, { useEffect, useState } from 'react'
import ErrorMsg from './components/ErrorMsg'
import Form from './components/Form'
import FormFilterPersons from './components/FormFilterPersons'
import Numbers from './components/Numbers'
import SuccessMsg from './components/SuccessMsg'
import personsServices from './services/persons.services'

const initNewName = ''
const initNewNumber = ''
const initPersons = []
const initTextFilterPersons = ''
const initErrorMsg = null
const initSuccessMsg = null

const App = () => {
  const [persons, setPersons] = useState(initPersons)
  const [newName, setNewName] = useState(initNewName)
  const [newNumber, setNewNumber] = useState(initNewNumber)
  const [textFilterPersons, setTextFilterPersons] = useState(
    initTextFilterPersons,
  )
  const [errorMsg, setErrorMsg] = useState(initErrorMsg)
  const [successMsg, setSuccessMsg] = useState(initSuccessMsg)

  const handleDeletePerson = (id) => {
    console.log(id)
    const confirm = window.confirm(
      `Do you want to delete the person with the id ${id} ?`,
    )
    if (!confirm) return

    personsServices
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        setSuccessMsg(`${id} has been deleted`)
        setTimeout(() => setSuccessMsg(null), 5000)
      })
      .catch((err) => {
        setErrorMsg(
          err.response['data'].error ||
            `Person with id ${id} was already removed server`,
        )
        setTimeout(() => setErrorMsg(null), 5000)
      })
  }

  const handleUpdatePerson = (id) => {
    const personToUpdate = {
      name: newName,
      number: newNumber,
    }

    personsServices
      .updatePerson(id, personToUpdate)
      .then(() => {
        setPersons(
          persons.map((person) =>
            person.id === id ? { ...personToUpdate, id: id } : person,
          ),
        )
        setSuccessMsg(`${personToUpdate.name} has been updated`)
        setTimeout(() => setSuccessMsg(null), 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        setErrorMsg(
          err.response['data'].error ||
            `${personToUpdate.name} cannt be updated`,
        )
        setTimeout(() => setErrorMsg(null), 5000)
        return
      })
  }

  const handleCreaterPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personsServices
      .createPerson(newPerson)
      .then((res) => {
        setPersons(persons.concat(res.person))
        setSuccessMsg(`${res.person.name} has been created`)
        setTimeout(() => setSuccessMsg(null), 5000)
        setNewName('')
        setNewNumber('')
      })
      .catch((err) => {
        setErrorMsg(
          err.response['data'].error ||
            `${newPerson} had a problem when created`,
        )
        setTimeout(() => setErrorMsg(null), 5000)
      })
  }

  useEffect(() => {
    personsServices
      .getAllPerson()
      .then((res) => setPersons(res))
      .catch((err) => {
        setErrorMsg(err.response['data'].error || `problems bringing a person`)
        setTimeout(() => setErrorMsg(null), 5000)
      })
  }, [])

  const personsToShow = textFilterPersons
    ? persons.filter((item) =>
        item.name.toLowerCase().includes(textFilterPersons),
      )
    : persons

  return (
    <div>
      <SuccessMsg text={successMsg} />
      <ErrorMsg text={errorMsg} />
      <FormFilterPersons
        textFilterPersons={textFilterPersons}
        setTextFilterPersons={setTextFilterPersons}
        setFilterPersons={personsToShow}
        persons={persons}
      />
      <Form
        setNewName={setNewName}
        newName={newName}
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        handleCreaterPerson={handleCreaterPerson}
        handleUpdatePerson={handleUpdatePerson}
        setSuccessMsg={setSuccessMsg}
        setErrorMsg={setErrorMsg}
      />

      <Numbers
        persons={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  )
}

export default App
