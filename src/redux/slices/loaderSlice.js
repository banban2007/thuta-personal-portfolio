import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isfinished: false,
    },
    reducers : {
        setFinished: (state) => { state.isfinished = true}
    }
})

export const { setFinished } = loaderSlice.actions
export default loaderSlice.reducer

