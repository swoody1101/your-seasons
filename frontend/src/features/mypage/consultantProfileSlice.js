import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/Axios";


const initialState = {
  profile: {
    // 닉네임, 사진은 로그인슬라이스에서 받아올 수 있음
    "contact": "",
    "introducton": "",
    "cost": "",
    "licenseName": "자격증",
    "reservations": []
  },
  status: 'idle' // 'idle' (휴) | 'loading' | 'succeeded' | 'failed'
}

export const consultantProfileFecth = createAsyncThunk(
  'consultantprofileslice/consultantprofilefecth',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await Axios.get('consultants/1')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

const consultantProfileSlice = createSlice({
  name: 'consultantprofileslice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(consultantProfileFecth.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(consultantProfileFecth.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.profile = payload;
    })
    builder.addCase(consultantProfileFecth.rejected, (state, action) => {
      state.status = 'failed';
    })
  },
})
export default consultantProfileSlice.reducer