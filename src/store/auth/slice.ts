import Cookie from 'universal-cookie'
import { TokenResponse } from '@/types/auth.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  token: TokenResponse | null
}

const initialState: AuthState = {
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<TokenResponse>) => {
      state.token = action.payload
      const cookies = new Cookie()
      cookies.set('token', state.token.access_token)
    },

    logout: () => initialState,
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
