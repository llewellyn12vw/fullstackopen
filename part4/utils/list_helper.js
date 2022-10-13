const lodash = require('lodash')

const dummy = (blogs) => 1
const totalLikes = (blogs) => blogs.reduce((sum, b) => sum + b.likes, 0)

const mostLikes = (blogs) => {
    const maxi = blogs.reduce((max, blog) => (max.likes > blog.likes ? max : blog))
    // eslint-disable-next-line camelcase
    const ret_obj = {
        title: maxi.title,
        author: maxi.author,
        likes: maxi.likes,
    }
    // eslint-disable-next-line camelcase
    return ret_obj
}

const mostBlogs = (blogs) => {
    const best = lodash.countBy(blogs, (blog) => blog.author)
    const most = Object.keys(best).reduce((max, auth) => (best[max] > best[auth] ? max : auth))
    return { author: most, blogs: best[most] }
}

// const topLikes = (blogs) => {
//     const likesCount = lodash(blogs)
//         .groupBy('author')
//         .map((objs, key) => ({
//             author: key,
//             likes: lodash.sumBy(objs, 'likes'),
//         }))

//     console.log(likesCount)
// }

module.exports = {
    dummy, totalLikes, mostLikes, mostBlogs,
}
