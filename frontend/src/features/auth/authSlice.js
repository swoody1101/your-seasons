import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { saveToken, deleteToken } from '../../api/JWToken'
import { OK, CUSTOMER, CONSULTANT } from '../../api/CustomConst'
import Axios from '../../api/Axios';

// state
const initialState = {
  // signup info state
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
  data: '',

  // login state
  logonUser: {
    nickname: '',
    role: '',
    imageUrl: '/images/default/avatar01.png',
  },
  isLoading: false,
  isAuthenticated: false, // todo 로그인 가드

  // common info state -> 사용자 기본정보
  common: {
    name: '',
    nickname: '',
    birth: '',
    contact: '',
    email: '',
    imageUrl: '',
    introduction: '',
    cost: '',
    consultingFile: '',
    licenseName: '',
    licenseNumber: ''
  },
  isModal: false, // sample modal

  // server status
  status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

// actions
// signup actions
export const signUpMember = createAsyncThunk(
  'auth/signup',
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
  'auth/emailcheck',
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
  'auth/nicknamecheck',
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

// login actions
export const loginUser = createAsyncThunk(
  'auth/login',
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

// userSlice actions
export const loadMember = createAsyncThunk(
  'auth/loadmember',
  async (role, { rejectWithValue }) => {
    try {
      let response
      if (role === CUSTOMER) {
        response = await Axios.get('customers/4');
      } else if (role === CONSULTANT) {
        response = await Axios.get('consultants/3');
      }
      return response.data
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const modifyMember = createAsyncThunk(
  'auth/modifymember',
  async (payload, { rejectWithValue }) => {
    try {
      console.log("수정 정보", payload)
      let response;
      if (payload.role === CUSTOMER) {
        const modi = {
          nickname: payload.nickname,
          contact: payload.contact,
          imageUrl: payload.imageUrl
        } // 고객 수정정보
        console.log('수정 요청 정보', modi)
        response = await Axios.patch('customers', modi);
      } else if (payload.role === CONSULTANT) {
        const modi = {
          nickname: payload.nickname,
          contact: payload.contact,
          imageUrl: payload.imageUrl,
          introduction: payload.introduction,
          cost: payload.cost
        } // 컨설턴트 수정정보
        console.log('수정 요청 정보', modi)
        response = await Axios.patch('consultants', modi);
      }
      console.log('수정 후 응답', response)
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const modifyPass = createAsyncThunk(
  'auth/modifypass',
  async (payload, { rejectWithValue }) => {
    try {
      let response;
      const data = {
        beforePassword: payload.beforePassword,
        afterPassword: payload.afterPassword
      }
      if (payload.role === CUSTOMER) {
        response = await Axios.patch('customers/password', data);
      } else if (payload.role === CONSULTANT) {
        response = await Axios.patch('consultants/password', data);
      }
      console.log(response)
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signout',
  async (role, { rejectWithValue }) => {
    try {
      let response;
      if (role === CUSTOMER) {
        response = await Axios.delete('customers');
      } else if (role === CONSULTANT) {
        response = await Axios.delete('consultants');
      }
      console.log(response)
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// createSlice

const authSlics = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login reducers
    logoutUser: () => {
      deleteToken();
    },
    resetUser: (state) => {
      state.logonUser = {
        nickname: '',
        role: '',
        imageUrl: '/images/default/avatar01.png',
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

    // modify reducers
    modalOn: (state) => {
      state.isModal = true;
    },
    modalOff: (state) => {
      state.isModal = false;
    }
  },
  extraReducers: {
    // signup extra reducers 통신 상태에 따른 실행 함수
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
    // login extra reducers 로그인 처리에 따른 실행 함수
    [loginUser.fulfilled]: (state, { payload }) => {
      state.logonUser = {
        nickname: payload.data.nickname,
        role: payload.data.role,
        imageUrl: payload.data.imageUrl
      }
      loadMember(payload.role)
      state.isAuthenticated = true;
    },
    [loginUser.rejected]: (state) => {
      state.isAuthenticated = false;
    },
    // modify extra reducers
    [loadMember.pending]: (state) => {
      state.status = 'loading';
    },
    [loadMember.fulfilled]: (state, { payload }) => {
      state.status = 'succeeded';
      state.common = payload
    },
    [loadMember.rejected]: (state) => {
      state.status = 'failed';
    },
  }
})


export const { logoutUser, resetUser, modifyLogonUser } = authSlics.actions;
export const { modalOn, modalOff } = authSlics.actions;

export default authSlics.reducer