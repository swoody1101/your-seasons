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
    licenseId: '',
    licenseNumber: ''
  },
  data: { memberId: '', message: '' },
  status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const signUpMember = createAsyncThunk(
  'members/signup',
  async (userInfo, { rejectWithValue }) => {
    try {
      console.log("비동기 요청 회원가입") // 비동기 위치표시
      const response = await Axios.post('members/signup', userInfo);
      console.log(response) // 응답체크
      return response.data;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err);
    }
  }
)

export const emailCheck = createAsyncThunk(
  'member/emailcheck',
  async (email, { rejectWithValue }) => {
    try {
      console.log("비동기 요청 이메일 중복확인") // 비동기 위치표시
      const response = await Axios.get(`members/${email}/emailcheck`);
      console.log(response) // 응답체크
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err)
    }
  }
);

export const nicknameCheck = createAsyncThunk(
  'member/nicknamecheck',
  async (nickname, { rejectWithValue }) => {
    try {
      console.log("비동기 요청 이메일 중복확인") // 비동기 위치표시
      const response = await Axios.get(`members/${nickname}/nickcheck`);
      console.log(response) // 응답체크
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err)
    }
  }
);


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