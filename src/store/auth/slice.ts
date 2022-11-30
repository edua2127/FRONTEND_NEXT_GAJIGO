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
    },

    logout: () => initialState,
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
