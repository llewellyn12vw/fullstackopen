import axios from "axios";

const baseURL = 'http://localhost:3001/anecs'

const getAll =  async () => {

    const response = await axios.get(baseURL)
    return response.data
}

const addAnex = async (content) => {
    const object = {
        content: content,
        votes: 0
    }
    const response = await axios.post(baseURL, object)
    return response.data
}

const addVote = async (id, newObj) => {
    const response = await axios.put(`${baseURL}/${id}` , newObj)
    return response.data
} 

export default { getAll, addAnex , addVote}