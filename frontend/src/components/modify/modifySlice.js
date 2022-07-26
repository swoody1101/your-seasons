import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { CUSTOMER, CONSULTANT } from '../../api/CustomConst'
import Axios from '../../api/Axios'

const initialState = {
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
  status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const loadMember = createAsyncThunk(
  'modify/loadmember',
  async (role, { rejectWithValue }) => {
    try {
      let response
      if (role === CUSTOMER) {
        response = await Axios.get('customers');
      } else if (role === CONSULTANT) {
        response = await Axios.get('consultants');
      }
      console.log(response)
      console.log(response.data)
      return response.data
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const modifyMember = createAsyncThunk(
  'modify/modifymember',
  async (payload, { rejectWithValue }) => {
    try {
      console.log("수정 정보", payload)
      let response;
      if (payload.role === CUSTOMER) {
        const modi = {
          nickname: payload.nickname,
          contact: payload.contact
        } // 고객 수정정보
        response = await Axios.patch('customers', modi);
      } else if (payload.role === CONSULTANT) {
        const modi = {
          nickname: payload.nickname,
          contact: payload.contact,
          introduction: payload.introduction,
          cost: payload.cost
        } // 컨설턴트 수정정보
        response = await Axios.patch('consultants', modi);
      }
      console.log(response)
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const modifyPass = createAsyncThunk(
  'modify/modifypass',
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
  'modify/signout',
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


const modifySlice = createSlice({
  name: 'modify',
  initialState,
  extraReducers: {
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
export default modifySlice.reducer;