const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const peopleSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    minLength: 3,
    unique: true,
  },
  number: {
    type: String,
    require: true,
    trim: true,
    minLength: 8,
  },
})

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

peopleSchema.plugin(uniqueValidator)

module.exports = mongoose.model('People', peopleSchema)
