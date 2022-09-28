const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://llewellynvw12:${password}@cluster0.p2g0ete.mongodb.net/?retryWrites=true&w=majority`

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,

})

const Person = mongoose.model('Person', phoneSchema)

mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const note = new Person({
      name: 'Dan Abramov',
      number: '0406666',
    })

    return note.save()
  })
  .then(() => {
    console.log('note saved!')
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
