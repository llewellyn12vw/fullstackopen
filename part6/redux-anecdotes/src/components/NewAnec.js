import { useDispatch } from "react-redux";
import { addAnex } from "../reducers/anecdoteReducer";
import { addMessage,removeMessage } from '../reducers/notificationReducer';
import noteService from '../services/anecs'
import { createAnex } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AddAnecdote = (props) => {
    const dispatch = useDispatch()

    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnex(content))
        dispatch(setNotification(`added '${content}'`,5))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={add}>
                <div><input name= 'anecdote'/></div>
                <button type = 'submit'>create</button>
            </form>
        </div>
    )
}

export default AddAnecdote