import { useState, useEffect , useRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import login from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [password,setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [Message, setMessage] = useState(null)


  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs( blogs )
  //   )
  // }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      const getB = blogService.getAll().then(blogs => setBlogs(blogs))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      const getBlogs = await blogService.getAll()
      setBlogs(getBlogs)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    // event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    setBlogs(null)
    setUser(null)
    setUsername('')
    setPassword('')

  }
  const createBlog = async (blog) => {
    blogFormRef.current.toggleVisibility()
    try{
      await blogService.postBlog(blog)
      const getBlogs = await blogService.getAll()
      setBlogs(getBlogs)
      setMessage(`${blog.title} has been added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)


    }catch (exception) {
      setErrorMessage('Please enter all fields')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = async (blog) => {
    try{
      const newBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.updateLike(blog.id,{ ...blog, likes: blog.likes + 1 })
      const getBlogs = await blogService.getAll()
      setBlogs(getBlogs)
      setMessage(`${blog.title} has been liked`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)


    }catch (exception) {
      setErrorMessage('sorry')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const removeB = async (id) => {
    try{
      await blogService.deleteB(id)
      const getBlogs = await blogService.getAll()
      setBlogs(getBlogs)
      setMessage('blog has been deleted')
      setTimeout(() => {
        setMessage(null)
      }, 5000)


    }catch (exception) {
      setErrorMessage('sorry')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

  }


  const loginForm = () => (
    <form id = 'loginform' onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id = "username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id ="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogFormRef = useRef()

  //   <h2>blogs</h2>
  //     {blogs.map(blog =>
  //       <Blog key={blog.id} blog={blog} />
  //     )}
  //     </div>
  // )
  const display = (blogs) => {
    const newBlogs = blogs.sort((a,b) => b.likes - a.likes )
    return newBlogs
  }
  console.log('blogs',blogs)
  return (
    <div>
      <Notification message={errorMessage} error ={true}/>
      <Notification message={Message} error ={false}/>
      {user === null ?
        loginForm() :
        <div>

          <p>{user.name} logged-in<button id = 'logout' onClick={() => handleLogout()}>logout</button></p>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
          <h2>blogs</h2>

          {display(blogs).map(blog => <Blog key={blog.id} blog={blog} addLike = {addLike} deleteB = {removeB}/>
          )}
        </div>
      }

    </div>
  )
}

export default App
