
import AddAnecdote  from './components/NewAnec'
import AnecList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import anecService from './services/anecs'
import { setAnex } from './reducers/anecdoteReducer'
import { initializeAnex } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnex())
  }, [dispatch])


  return (
    <div>
      <Notification/>
      <h2>Anecdotes</h2>
      <Filter/>
      <AnecList/>
      <AddAnecdote />
    </div>
  )
}

export default App