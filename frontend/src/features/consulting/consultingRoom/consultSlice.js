import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  isSetClear: true
}

export const consultSlice = createSlice({
  name: 'consult',
  initialState,
  reducers: {
    settingModalOn: (state) => {
      state.isSetClear = true;
      console.log("setting on : ", state.isSetClear)
    },
    settingModalOff: (state) => {
      state.isSetClear = false;
      console.log("setting off : ", state.isSetClear)
    }
  },
  extraReducers: {
  }
})
export const { settingModalOn, settingModalOff } = consultSlice.actions;

export default consultSlice.reducer