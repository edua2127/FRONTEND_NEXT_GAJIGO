import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../index'

export interface ReduxIdState {
  idEvent: string
  idLecture: string
  idRoom: string
}

const initialState: ReduxIdState = {
  idEvent: '',
  idLecture: '',
  idRoom: '',
}
//teste
export const reduxIdSlice = createSlice({
  name: 'reduxId',
  initialState,
  reducers: {
    editaIdEvent: (state, action: PayloadAction<string>) => {
      state.idEvent = action.payload
    },
    editaIdLecture: (state, action: PayloadAction<string>) => {
      state.idLecture = action.payload
    },
    editaIdRoom: (state, action: PayloadAction<string>) => {
      state.idRoom = action.payload
    }, 
  },
})
export const selectIdEvent = (state: RootState) => state.reduxId.idEvent
export const selectIdLecture = (state: RootState) => state.reduxId.idLecture
export const selectIdRoom = (state: RootState) => state.reduxId.idRoom
export const { editaIdEvent, editaIdLecture, editaIdRoom } = reduxIdSlice.actions
export default reduxIdSlice.reducer
