import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.get(baseUrl,config)
  return request.data
}
const postBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl,blog,config)
  return request.data
}

const updateLike = async (id,blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.put(`${baseUrl}/${id}`,blog,config)
  return request.data
}

const deleteB = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(config)
  const request = await axios.delete(`${baseUrl}/${id}`,config)
  return request.data
}

export default { getAll, setToken, postBlog , updateLike , deleteB }