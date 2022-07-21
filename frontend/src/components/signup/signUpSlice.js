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
  }
}

export const signUpMember = createAsyncThunk(
  'member/signup',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await Axios.post('members/signup', userInfo);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {

  },
  extraReducers: {
    [signUpMember.pending]: (state) => {
      state.isLoading = 'pending';
    },
    [signUpMember.fulfilled]: (state) => {
      state.isLoading = 'succeeded';
    },
    [signUpMember.rejected]: (state) => {
      state.isLoading = 'failed';
    },
  }
});

export default signUpSlice.reducer;