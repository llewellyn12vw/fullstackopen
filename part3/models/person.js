const mongoose = require('mongoose')

const password = process.argv[2]
console.log(password)

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then((result) => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const num_chek = (val) => /\d{2,3}-\d{5,15}/.test(val)
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 8,
    validate: num_chek,
  },

})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
