import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios, { imgAxios } from 'api/Axios'

const initialState = {
  customer: undefined,
  isSetClear: false,
  consultantSessionName: 's-s-s',
  consultingID: 0,
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

export const postConsultingResult = createAsyncThunk(
  'consult/postConsultingResult',
  async (payload, { rejectWithValue }) => {
    try {
      console.log(payload.files[0], JSON.stringify(payload.consultingFinishRequest))
      let formData = new FormData()
      formData.append('file', payload.files[0])
      formData.append('consultingFinishRequest', JSON.stringify(payload.consultingFinishRequest))
      const response = await imgAxios.post(`consultings/1`, formData)
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
      state.consultingID = payload.consultingID
    },
    [getConsultantSessionName.rejected]: (state, { payload }) => {
      state.consultantSessionName = 's-s-s'
    }, // 임시
  }
})
export const { settingModalOn, settingModalOff, setCustomer } = consultSlice.actions;

export default consultSlice.reducer