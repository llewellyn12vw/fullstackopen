import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage(state,action){
                const content = action.payload
                return state = content
        },
        removeMessage(state, action){
            return state = null
        }
    }
})

export const { addMessage,removeMessage } = messageSlice.actions

export const setNotification = (message, t) => { 
    return dispatch => {
        dispatch(addMessage(`${message}`))
          setTimeout(() => {
            dispatch(removeMessage(''))
          }, t*1000)
        }
}


export default messageSlice.reducer