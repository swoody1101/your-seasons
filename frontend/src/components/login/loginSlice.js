import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken, deleteToken } from '../../api/JWToken'
import Axios from '../../api/Axios';

const initialState = {
  logonUser: {
    nickname: '',
    role: '',
    imageUrl: '',
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
      //const { token } = response.headers.get("Authorization"); // 헤더로 받을 때
      const token = response.data['X-Auth-Token'];
      saveToken(token);
      return response;
    } catch (err) {
      // 에러 자체를 반환해서 jsx에서 처리하는 방법
      return rejectWithValue(err.response);
    }
  }
);
export const logoutUser = createAsyncThunk(
  'members/logout',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await Axios.get('members/logout');
      deleteToken();
      return response;
    } catch (err) {
      // 에러 자체를 반환해서 jsx에서 처리하는 방법
      return rejectWithValue(err.response);
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.logonUser = {
        nickname: '',
        role: '',
        imageUrl: '',
      }
    }
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
    [logoutUser.fulfilled]: (state) => {
      state.logonUser = {
        nickname: '',
        role: '',
        imageUrl: ''
      }
      state.isAuthenticated = false;
    },
  }
});

export const { resetUser } = loginSlice.actions;
export default loginSlice.reducer