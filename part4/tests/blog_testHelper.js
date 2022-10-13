const Blog = require('../models/blog')
const User = require('../models/user')

/* eslint-disable camelcase */
const initBlogs = [
    {
        title: 'brave new world',
        author: 'aldous',
        url: 'pies',
        likes: 5,
    },
    {
        title: 'brave pies',
        author: 'dous',
        url: 'ssssss',
        likes: 10,
    },

]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map((u) => u.toJSON())
}

module.exports = {
    initBlogs,
    blogsInDb,
    usersInDb,
}
