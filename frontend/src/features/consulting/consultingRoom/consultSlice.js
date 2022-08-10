import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  isSetClear: false,
  consultantSessionName: 'asd-asd-asd'
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
export const { settingModalOn, settingModalOff } = consultSlice.actions;

export default consultSlice.reducer