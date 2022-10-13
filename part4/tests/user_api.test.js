/* eslint-disable camelcase */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const help = require('./blog_testHelper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await help.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await help.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('retrieving users from db', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await help.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtEnd.length)
    })
})
describe('check valid users', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })
    test('is username present', async () => {
        const userBegin = await help.usersInDb()
        newUser = {
            password: 'pop',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('please enter all credentials')
        const userEnd = await help.usersInDb()
        expect(userEnd).toEqual(userBegin)
    })

    test('is username unique', async () => {
        newUser = {
            username: 'root',
            password: 'pop',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')
    })
    test('is username and password correct length', async () => {
        newUser = {
            username: 'ro',
            password: 'pp',
        }
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username and passworn must be atleast 3 chars long')
    })
    
})

afterAll(() => {
    mongoose.connection.close()
})
