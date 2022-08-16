import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  session: undefined,
  customer: undefined,
  isSetClear: false,
  mySessionName: 's-s-s',
}

export const selfConsulting = createAsyncThunk(
  'self/openConsulting',
  async (reservationId, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`consultings`, { reservationId: reservationId })
      return response.data
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const selfSlice = createSlice({
  name: 'self',
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
    setSession: (state, { payload }) => {
      state.session = payload
    },
  },
  extraReducers: {

  }
})

export const { settingModalOn, settingModalOff, setSession, setCustomer } = selfSlice.actions;

export default selfSlice.reducer