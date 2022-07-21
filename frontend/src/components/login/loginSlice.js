import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken } from '../../common/api/JWToken'
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

export const loginUser = createAsyncThunk(
  'user/login',
  async (userInfo, { rejectWithValue }) => {
    try {
			console.log(userInfo)
			// start
			const userInfo2 = {username:userInfo.email, password:userInfo.password}
      const response = await testAxios.post('v1/accounts/login/', userInfo2);
			const token = response.data.key;
      // const { data: { token } } = response;
			//end
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
    [loginUser.fulfilled]: (state) => {
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state) => {
      state.isAuthenticated = false;
    },
  }
});
export default authSlice.reducer