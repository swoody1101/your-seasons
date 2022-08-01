import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../api/Axios'
import { CREATED, OK, CUSTOMER, CONSULTANT } from '../../api/CustomConst'

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
      let response

      if (userInfo.role === CUSTOMER) {
        response = await Axios.post('customers', userInfo);
      } else if (userInfo.role === CONSULTANT) {
        response = await Axios.post('consultants', userInfo);
      }
      return response.status;
    } catch (err) {
      let errRes = 400;
      if (err.status < 500) {
        errRes = 400;
      } else if (err.status < 600) {
        errRes = 500;
      }
      return errRes;
    }
  }
)

export const emailCheck = createAsyncThunk(
  'member/emailcheck',
  async (email, { rejectWithValue }) => {
    try {
      console.log("비동기 요청 이메일 중복확인") // 비동기 위치표시
      const response = await Axios.get(`members/validation/1?email=${email}`);
      if (response.status === OK) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
);

export const nicknameCheck = createAsyncThunk(
  'member/nicknamecheck',
  async (nickname, { rejectWithValue }) => {
    try {
      console.log("비동기 요청 닉네임 중복확인") // 비동기 위치표시
      const response = await Axios.get(`members/validation/2?nickname=${nickname}`);
      if (response.status === OK) {
        return true;
      }
    } catch (err) {
      return false;
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