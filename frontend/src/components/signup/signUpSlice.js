import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../api/Axios'

const initialState = {
  userInfo: {
    email: '',
    password: '',
    nickname: '',
    name: '',
    birth: '',
    contact: '',
    role: '',
    licenseName: '',
    licenseNumber: ''
  },
  data: { memberId: '', message: '' },
  status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const signUpMember = createAsyncThunk(
  'member/signup',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await Axios.post('members/signup', userInfo);
      console.log("비동기 요청")
      console.log(userInfo)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  extraReducers: {
    [signUpMember.pending]: (state) => {
      state.status = 'loading';
    },
    [signUpMember.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.data = payload
    },
    [signUpMember.rejected]: (state) => {
      state.status = 'failed';
    },
  }
});

export default signUpSlice.reducer;