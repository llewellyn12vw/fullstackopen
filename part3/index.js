const express = require('express')

const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const generateId = () => {
  const id = Math.random() * 1000000000
  return id
}
const a = (req) => req.id

morgan.token('user-type', (req, res) => JSON.stringify(req.body))
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())

app.get('/api/people', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})
app.get('/info', (request, response) => {
  Person.count({}).then((count) => {
    const obj = (`<p>Phonebook has info for ${count} people </p>
    <p>${new Date()}</p>`)
    response.send(obj)
  })
  // console.log(count)
  // const obj = (`<p>Phonebook has info for ${count} people </p>
  // <p>${new Date()}</p>`)
})

app.get('/api/people/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})
app.delete('/api/people/:id', (req, response, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/people/:id', (request, response, next) => {
  const { body } = request

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedP) => {
      response.json(updatedP)
    })
    .catch((error) => next(error))
})

app.post('/api/people', (req, response, next) => {
  const { body } = req

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then((saveP) => {
    response.json(saveP)
  })
    .catch((error) => next(error))
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).send(error)
  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
