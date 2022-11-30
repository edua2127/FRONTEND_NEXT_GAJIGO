import { configureStore } from '@reduxjs/toolkit'
import geralSlice from '../slice/geralSlice'

export const store = configureStore({
  reducer: {
    geral: geralSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
