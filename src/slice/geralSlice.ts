import { createSlice } from '@reduxjs/toolkit'

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

export default geralSlice.reducer
