import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/anecs'
import noteService from '../services/anecs'



const getId = () => (100000 * Math.random()).toFixed(0)



const anecSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload.id
      // console.log('pauyload', state)
      const changedAnec = action.payload
      return state.map(note =>
        note.id !== id ? note : changedAnec 
        // console.log(note)
      )     
    },
    addAnex(state,action){
      state.push(
        action.payload
      )
    },
    setAnex(state,action){

      return action.payload
    }    
  },
})

export const { createAnec, addVote, setAnex, addAnex } = anecSlice.actions

export const initializeAnex = () => {
  return async dispatch => {
    const anex = await noteService.getAll()
    dispatch(setAnex(anex))
  }
}

export const createAnex = (content) => {
  return async dispatch => {
    const anex = await noteService.addAnex(content)
    dispatch(addAnex(anex))
  }
}

export const vote = (id, obj) => {
  return async dispatch => {
    const anex = await noteService.addVote(id,obj)
    dispatch(addVote(anex))
  }
}


export default anecSlice.reducer

// export const addVote = (id) => {
//   return {
//     type : 'ADD_VOTE',
//     data: {id}
//   }
// }

// export const NewAnec = (content) => {
//   return {
//     type: 'ADD_ANEC',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export default reducer