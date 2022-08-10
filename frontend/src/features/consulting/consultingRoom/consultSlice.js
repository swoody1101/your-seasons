import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  customer: undefined,
  isSetClear: false,
  consultantSessionName: 's-s-s',
  videobalance: {
    hue: 0.0,
    saturation: 1.0,
    brightness: 0.0
  },
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
    setCustomer: (state, { payload }) => {
      state.customer = payload
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
export const { settingModalOn, settingModalOff, setCustomer } = consultSlice.actions;

export default consultSlice.reducer