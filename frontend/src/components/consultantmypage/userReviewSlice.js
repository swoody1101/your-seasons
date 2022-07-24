import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/Axios";


const initialState = {
  reviews: [],   // 내 후기 데이터들 모두 저장
  status: 'idle' // 'idle' (휴) | 'loading' | 'succeeded' | 'failed'
}

export const userReviewFetch = createAsyncThunk(
  'userreviewslice/userreviewfetch',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await Axios.get('consultants/2')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

const userReviewSlice = createSlice({
  name: 'userReviewSlice',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(userReviewFetch.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(userReviewFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.reviews = payload;
    })
    builder.addCase(userReviewFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
  },
})
export default userReviewSlice.reducer