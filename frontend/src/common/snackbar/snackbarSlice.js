import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
  snackbarMessage: '',
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
  },
})
export const { setSnackBarOpen, setSnackbarMessage } = SnackBarSlice.actions;

export default SnackBarSlice.reducer