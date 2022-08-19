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
  isLoading: false,
  isAuthenticated: false, // todo 로그인 가드

  // common info state -> 사용자 기본정보
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
      const response = await Axios.get(`members/validation/1?email=${email}`);
      if (response.status === OK) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
);

// 이메일 발송 코드
export const emailSendCheck = createAsyncThunk(
  'members/email/1?email=',
  async (email, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`members/email/1?email=${email}`);
      if (response.status === OK) {
        return true;
      }
    } catch (err) {
      return false;
    }
  }
);

// 이메일 발송 후 토큰 체크 
export const emailAuthCheck = createAsyncThunk(
  'members/email/2',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await Axios.post('members/email/2', payload)
      if (response.status === OK) {
        return true;
      }
    } catch (err) {
      return false
    }
  }
)


export const nicknameCheck = createAsyncThunk(
  'auth/nicknamecheck',
  async (nickname, { rejectWithValue }) => {
    try {
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
      const token = response.headers["authorization"]; // 헤더로 받을 때
      saveToken(token);
      return response;
    } catch (err) {
      // 에러 자체를 반환해서 jsx에서 처리하는 방법
      return rejectWithValue(err);
      // return rejectWithValue(err.response);
    }
  }
);

// 비밀번호 찾기
export const searchPasswordFetch = createAsyncThunk(
  'members/email/3?email=member@ssafy.com',
  async (email, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`members/email/3?email=${email}`);
      if (response.status === OK) {
        return true;
      }
    } catch (err) {
      return false
    }
  }
)


// userSlice actions
export const loadMember = createAsyncThunk(
  'auth/loadmember',
  async (role, { rejectWithValue }) => {
    try {
      if (role === CUSTOMER) {
        const response = await Axios.get('customers/4');
        response.data.role = role
        response.data.imageUrl = response.data.imageUrl ? response.data.imageUrl : '/images/default/avatar20.png'
        return { data: response.data }
      } else if (role === CONSULTANT) {
        const response = await Axios.get('consultants/3');
        response.data.role = role
        response.data.imageUrl = response.data.imageUrl ? response.data.imageUrl : '/images/default/avatar20.png'
        return { data: response.data }
      }
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const modifyMember = createAsyncThunk(
  'auth/modifymember',
  async (payload, { rejectWithValue }) => {
    try {
      let response;
      if (payload.role === CUSTOMER) {
        const modi = {
          nickname: payload.nickname,
          contact: payload.contact,
          imageUrl: payload.imageUrl
        } // 고객 수정정보
        response = await Axios.patch('customers', modi);
      } else if (payload.role === CONSULTANT) {
        const modi = {
          nickname: payload.nickname,
          contact: payload.contact,
          imageUrl: payload.imageUrl,
          introduction: payload.introduction,
          cost: payload.cost
        } // 컨설턴트 수정정보
        response = await Axios.patch('consultants', modi);
      }
      const token = response.headers["authorization"]; // 헤더로 받을 때   
      saveToken(token);
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
      return response;
    } catch (err) {
      alert('비밀번호를 잘못 입력하셨습니다.')
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
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// createSlice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login reducers
    logoutUser: (state) => {
      state.logonUser = {
        nickname: '',
        role: '',
        imageUrl: '/images/default/avatar01.png',
      }
      state.isAuthenticated = false;
      deleteToken();
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
        imageUrl: (payload.data.imageUrl ? payload.data.imageUrl : '/images/default/avatar01.png')
      }
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
      state.logonUser = payload.data
    },
    [loadMember.rejected]: (state) => {
      state.status = 'failed';
    },
  }
})


export const { logoutUser, modifyLogonUser } = authSlice.actions;
export const { modalOn, modalOff } = authSlice.actions;

export default authSlice.reducer