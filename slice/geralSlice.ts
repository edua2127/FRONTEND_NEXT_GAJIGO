
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


interface geralInicialState {
    username: string,
    password: string
}

export const initialState: geralInicialState =  {
    username: '',
    password: ''
}

export const geralSlice = createSlice({
    name: 'geral',
    initialState,
    reducers: {
        editaUsername: (state, action) => {
            state.username = action.payload
        },
        editaPassword: (state, action) => {
            state.password = action.payload
        }
    }
})

export const { editaUsername, editaPassword } = geralSlice.actions

export const selectUsername = (state: RootState) => state.geral.username
export const selectPassword = (state: RootState) => state.geral.password

export default geralSlice.reducer