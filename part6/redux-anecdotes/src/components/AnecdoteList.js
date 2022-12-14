import { useSelector, useDispatch } from 'react-redux'
// import { addVote } from '../reducers/anecdoteReducer'
import { vote } from '../reducers/anecdoteReducer'


const AnecList = () => {

    const filter = useSelector(state => state.filter)
    // const a = useSelector(state => state.anecdotes[0])
    // console.log('a',typeof a)
    const anecdotes = useSelector(state => state.filter.length > 0 ? state.anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())) : state.anecdotes) 
    const dispatch = useDispatch()
    const voter = (id) => {
      // console.log('vote', id)
      const anex = anecdotes.find(a => a.id === id)
      const newAnex = {
        ...anex,
        votes: anex.votes + 1
      }
      dispatch(vote(id,newAnex))
    }
    return (
        <div>
        {anecdotes.map(anecdote =>
          
          <div key={anecdote.id}>
            <div>

              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => voter(anecdote.id)}>vote</button>
            </div>
          </div> 
        )}
        </div>
    )
}

export default AnecList