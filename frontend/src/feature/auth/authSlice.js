import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../../common/api/JWToken';
import testAxios from '../../common/api/testAxios';

const initialState = {
  logonUser: {
    userId: '',
    nickname: '',
    email: '',
  },
  userInfo: {
    userId: '',
    password: '',
    nickname: '',
    email: ''
  },
  isLoading: false,
  isAuthenticated: false,
}


export const signupUser = createAsyncThunk(
  'user/signup',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await testAxios.post('/user/signup', userInfo.data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await testAxios.post('/user/login', userInfo.data);
      const { data: { token } } = response;
      console.log(token);
      saveToken(token);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginUser(state, action) {
      // axios로 정보 받아와서 비동기 처리 후에 로그온 처리하기
      state.logonUser = action.payload;
    },
  },
  extraReducers: {
    [signupUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signupUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [signupUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [loginUser.fulfilled]: (state) => {
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state) => {
      state.isAuthenticated = false;
    },
  }
});
// export const { loginUser } = authSlice.actions;
export default authSlice.reducer