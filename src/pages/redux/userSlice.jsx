import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:"user",
    initialState:{
        items:[]
    },
    reducers:{
        addUsers : (state,action)=>{
            state.items.push(action.payload)
        }
    }
})
export const {addUsers} =  userSlice.actions
export default userSlice.reducer