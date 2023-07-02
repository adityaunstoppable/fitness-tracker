import { createSlice } from "@reduxjs/toolkit";
let initialState = {selectedDate:"" }

const dateSlice = createSlice({
    name:"dateSlice",
    initialState,
    reducers:{
        setDateState(state , action){
            state.selectedDate = action.payload
        }
    }
})

export const {setDateState}  = dateSlice.actions
export default dateSlice.reducer