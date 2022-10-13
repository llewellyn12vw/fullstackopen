/* eslint-disable camelcase */
const mongoose = require('mongoose')
const supertest = require('supertest')
const help = require('./blog_testHelper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = help.initBlogs
        .map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some notes saved', () => {
    test('all notes returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all notes are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(help.initBlogs.length)
    })
})

describe('additions', () => {
    test('a valid note can be added', async () => {
        const newBlog = {
            title: 'like liky',
            author: 'alty',
            url: 'ps',
            likes: 55,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const new_blogs = await help.blogsInDb()
        expect(new_blogs).toHaveLength(help.initBlogs.length + 1)
        // expect(new_blogs).toContainEqual(newBlog)
    })
})
describe('test for missing props', () => {
    test('test if likes are not present', async () => {
        const newBlog = {
            title: 'like liky',
            author: 'alty',
            url: 'ps',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogs = await help.blogsInDb()
        expect(blogs).toHaveLength(help.initBlogs.length)
    })
    test('test if title or url are not present', async () => {
        const newBlog = {

            author: 'alty',
            likes: 6,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogs = await help.blogsInDb()
        expect(blogs).toHaveLength(help.initBlogs.length)
    })
})
describe('remove and update', () => {
    test('deletion of note', async () => {
        const blogsInDb = await help.blogsInDb()
        const blog_id = blogsInDb[0].id

        await api
            .delete(`/api/blogs/${blog_id}`)
            .expect(204)

        const blogs = await help.blogsInDb()
        expect(blogs).toHaveLength(help.initBlogs.length - 1)
    })
})
afterAll(() => {
    mongoose.connection.close()
})
