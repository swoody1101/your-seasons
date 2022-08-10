import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  publisherSet: undefined,
  isSetClear: false,
  consultantSessionName: 's-s-s',
}

export const openConsulting = createAsyncThunk(
  'consult/openConsulting',
  async (reservationId, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`consultings`, { reservationId: reservationId })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getConsultantSessionName = createAsyncThunk(
  'consult/getConsultantSessionName',
  async (reservationId, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`consultings/join`, { reservationId: reservationId })
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
      state.consultantSessionName = 's-s-s'
    }, // 임시
  }
})
export const { settingModalOn, settingModalOff, setPublisherSetting } = consultSlice.actions;

export default consultSlice.reducer