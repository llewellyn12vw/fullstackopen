const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({

            error: 'please enter all credentials',
        })
    }
    const existing = await User.findOne({ username })

    if (existing) {
        return response.status(400).json({

            error: 'username must be unique',
        })
    }

    if (password.length < 3 || username.length < 4) {
        return response.status(400).json({

            error: 'username and passworn must be atleast 3 chars long',
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
    response.status(200).json(users)
})

module.exports = usersRouter
