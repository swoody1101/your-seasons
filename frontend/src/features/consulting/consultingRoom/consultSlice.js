import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  isSetClear: false,
  consultantSessionName: 'asdf-asdf-asdf'
}

export const openConsulting = createAsyncThunk(
  'consult/openConsulting',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload)
      const response = await Axios.post(`consultings/1`, payload)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getConsultantSessionName = createAsyncThunk(
  'consult/getConsultantSessionName',
  async (consultantNickname, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`consultants/asdf?nickname=${consultantNickname}`)
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const consultSlice = createSlice({
  name: 'consult',
  initialState,
  reducers: {
    settingModalOn: (state) => {
      state.isSetClear = true;
    },
    settingModalOff: (state) => {
      state.isSetClear = false;
    }
  },
  extraReducers: {
    [getConsultantSessionName.fulfilled]: (state, { payload }) => {
      console.log("컨설턴트 세션 id", payload)
      state.consultantSessionName = payload.data
      console.log(state.consultantSessionName)
    },
  }
})
export const { settingModalOn, settingModalOff } = consultSlice.actions;

export default consultSlice.reducer