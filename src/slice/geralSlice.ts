import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

interface geralInicialState {
  id: number
  username: string
  password: string
}

export const initialState: geralInicialState = {
  id: 0,
  username: '',
  password: '',
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
    },
    editaId: (state, action) => {
      state.id = action.payload
    },
  },
})

export const { editaUsername, editaPassword, editaId } = geralSlice.actions

export const selectUsername = (state: RootState) => state.geral.username
export const selectPassword = (state: RootState) => state.geral.password
export const selectIdUser = (state: RootState) => state.geral.id
export default geralSlice.reducer
