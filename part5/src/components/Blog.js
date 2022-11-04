
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog,addLike,deleteB }) => {
  const [visible,setVisible] = useState(false)

  const Visible = () => {
    setVisible(!visible)
  }
  return(
    <div  id ='blog' >
      <div >
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button id = 'show' onClick={Visible}>
          {visible ? 'hide':'show'}
        </button>
      </div>
      <div>
        {visible && (
          <div>
            <div>{blog.url}</div>
            <div>{blog.likes}<button id = 'like' onClick={() => addLike(blog)}>like</button></div>
            <button onClick={() => deleteB(blog.id)}>delete</button>
          </div>
        )}
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteB: PropTypes.func.isRequired
}



export default Blog