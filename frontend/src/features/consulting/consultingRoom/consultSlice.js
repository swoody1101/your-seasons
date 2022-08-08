import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  isSetClear: true,
  consultantSessionName: ''
}

export const getConsultantSessionName = createAsyncThunk(
  'consult/getConsultantSessionName',
  async ({ consultantNickname }) => {
    return Axios
      .get(`consultants/asd?nickname=${consultantNickname}`)
      .then(() => {

      })
      .catch(() => { })
  }
)

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