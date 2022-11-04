import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [blog,setBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(blog)
    setBlog({ ...blog, title:'',author:'',url:'' })
  }

  return(
    <div>
      <form onSubmit ={addBlog}>
        <div>
            title
          <input
            type="text"
            value={blog.title}
            name="title"
            placeholder='title'
            onChange={({ target }) => setBlog({ ...blog, title: target.value })}
          />
        </div>
        <div>
            author
          <input
            type="text"
            value={blog.author}
            name="author"
            placeholder='author'
            onChange={({ target }) => setBlog({ ...blog, author: target.value })}
          />
        </div>
        <div>
            url
          <input
            type="text"
            value={blog.url}
            name="url"
            placeholder='url'
            onChange={({ target }) => setBlog({ ...blog, url: target.value })}
          />
        </div>
        <button type = "submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm