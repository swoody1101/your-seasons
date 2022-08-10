import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  publisherSet: undefined,
  isSetClear: false,
  consultantSessionName: 'asd-asd-asd',
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
      const response = await Axios.post(`consultings/join`, { nickname: consultantNickname })
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
    },
    setPublisherSetting: (state, { payload }) => {
      state.publisherSet = payload
    },
  },
  extraReducers: {
    [getConsultantSessionName.fulfilled]: (state, { payload }) => {
      state.consultantSessionName = payload.sessionId
    },
    [getConsultantSessionName.rejected]: (state, { payload }) => {
      state.consultantSessionName = ''
    },
  }
})
export const { settingModalOn, settingModalOff, setPublisherSetting } = consultSlice.actions;

export default consultSlice.reducer