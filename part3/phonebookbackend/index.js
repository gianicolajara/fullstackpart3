const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const People = require('./models/People')
require('dotenv').config()
require('./db.js')

const app = express()

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(
  morgan(
    ':method :url :status :total-time[digits] :res[content-length] :response-time ms :body',
  ),
)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to my api rest' })
})

app.get('/api/persons/', (req, res, next) => {
  const nameQuery = req.query.name
  if (nameQuery) {
    People.findOne({ name: nameQuery })
      .then((person) => res.status(200).json(person))
      .catch((err) => next(err))
  } else {
    People.find({})
      .then((person) => res.status(200).json(person))
      .catch((err) => next(err))
  }
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  People.findById(id)
    .then((person) => {
      if (person) {
        res.status(200).json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  People.findByIdAndDelete(id)
    .then((resServer) => {
      if (resServer) {
        return res.status(204).end()
      } else {
        return res.status(404).end()
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  let name = body.name
  let number = body.number

  const newPeople = new People({
    name,
    number,
  })

  newPeople
    .save()
    .then((savedPeople) => savedPeople.toJSON())
    .then((savedAndFormattedPeople) =>
      res
        .status(201)
        .json({ message: 'new person added', person: savedAndFormattedPeople }),
    )
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const id = req.params.id
  let name = body.name
  let number = body.number

  name = body.name
  number = body.number

  const peopleToUpdate = {
    name,
    number,
  }

  People.findByIdAndUpdate(
    id,
    { $set: peopleToUpdate },
    { new: true, runValidators: true, context: 'query' },
  )
    .then((person) => res.status(200).json(person))
    .catch((err) => next(err))
})

app.get('/info', async (req, res) => {
  const time = new Date(Date.now())

  const numberOfDocuments = await People.find({}).estimatedDocumentCount()

  res.status(200).send(`
  <div>
      <p>Phonebook has info for ${numberOfDocuments} people</p>
      <time datetime="${time}">${time}</time>
    </div>`)
})

const unknownEndPoint = (req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.log('error name', error.name)

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
