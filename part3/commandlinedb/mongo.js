const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'please provide the password as an argument: node mongo.js <password>',
  )
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb+srv://gianicola:${password}@cluster0.fosua.mongodb.net/persons?retryWrites=true&w=majority`

mongoose
  .connect(url)
  .then(() => console.log('successful connection'))
  .catch((err) => console.error(err))

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const People = mongoose.model('People', peopleSchema)

const addPerson = () => {
  const newPerson = new People({
    name,
    number,
  })

  newPerson
    .save()
    .then((res) => {
      console.log(
        `added ${newPerson.name} number ${newPerson.number} to phonebook`,
      )
      mongoose.connection.close()
    })
    .catch((err) => console.error(err))
}

const findPersons = () => {
  People.find({})
    .then((res) => {
      console.log('phonebook:')
      res.forEach((person) => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
    .catch((err) => console.error(err))
}

if (process.argv.length === 3) {
  findPersons()
} else if (process.argv.length > 3) {
  addPerson()
}
