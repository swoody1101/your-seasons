import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken, deleteToken } from '../../api/JWToken'
import Axios from '../../api/Axios';

const initialState = {
  logonUser: {
    nickname: '',
    role: '',
    imageUrl: '/images/default/avatar01.png',
  },
  isLoading: false,
  isAuthenticated: false,
}

export const loginUser = createAsyncThunk(
  'members/login',
  async (userInfo, { rejectWithValue }) => {
    try {
      // start
      const response = await Axios.post('members/login', userInfo);
      console.log(response.headers["x-auth-token"])
      const token = response.headers["x-auth-token"]; // 헤더로 받을 때      
      saveToken(token);
      return response;
    } catch (err) {
      // 에러 자체를 반환해서 jsx에서 처리하는 방법
      console.log(err.response.status)
      return err.response.status;
      // return rejectWithValue(err.response);
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logoutUser: () => {
      deleteToken();
    },
    resetUser: (state) => {
      state.logonUser = {
        nickname: '',
        role: '',
        imageUrl: '',
      }
    },
    modifyLogonUser: (state, { payload }) => {
      console.log(payload)
      state.logonUser = {
        nickname: payload.nickname,
        role: payload.role,
        imageUrl: payload.imageUrl
      }
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.logonUser = {
        nickname: payload.data.nickname,
        role: payload.data.role,
        imageUrl: payload.data.imageUrl
      }
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state) => {
      state.isAuthenticated = false;
    },
  }
});

export const { logoutUser, resetUser, modifyLogonUser } = loginSlice.actions;
export default loginSlice.reducer