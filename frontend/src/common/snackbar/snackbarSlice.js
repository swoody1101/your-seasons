import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  snackbarMessage: '',
  snackbarSeverity: 'info',
}

export const SnackBarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    setSnackBarOpen: (state, {payload}) => {
      state.open = payload
    },
    setSnackbarMessage: (state, {payload}) => {
      state.snackbarMessage = payload
    },
    setSnackBarSeverity: (state, {payload}) => {
      if (payload){
        state.snackbarSeverity = payload
      }else{
        state.snackbarSeverity = 'info'
      }
    }
  },
})
export const { setSnackBarOpen, setSnackbarMessage, setSnackBarSeverity } = SnackBarSlice.actions;

export default SnackBarSlice.reducer