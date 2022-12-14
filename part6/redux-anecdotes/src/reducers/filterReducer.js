import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
         addFilter(state,action){
                state = action.payload
                return state
        },
        
    }
})

export const { addFilter } = filterSlice.actions
export default filterSlice.reducer