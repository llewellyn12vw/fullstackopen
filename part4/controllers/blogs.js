const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const { body } = request

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    })

    const saveBlog = await blog.save()
    user.blogs = user.blogs.concat(saveBlog._id)
    await user.save()
    response.status(201).json(saveBlog)

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const { user } = request.user
    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
    return response.status(401).json({ error: 'token missing or invalid' })
})

module.exports = blogRouter
