import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'api/Axios'

const initialState = {
  session: undefined,
  customer: undefined,
  isSetClear: false,
  mySessionName: 's-s-s',
  selfConsultingId: 0,
  state: 'idle'
}

export const selfConsultingClose = createAsyncThunk(
  'self/selfConsultingClose',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.post(`self-consultings`, payload)
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
  extraReducers: (builder) => {
  }
})

export const { settingModalOn, settingModalOff, setSession, setCustomer } = selfSlice.actions;

export default selfSlice.reducer