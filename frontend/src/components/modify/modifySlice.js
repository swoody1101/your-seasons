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
    introduction: '안녕하세요?',
    cost: '10000'
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
      let response;
      if (payload.role === CUSTOMER) {
        response = await Axios.patch('customers', payload);
      } else if (payload.role === CONSULTANT) {
        response = await Axios.patch('consultants', payload);
      }
      console.log(payload)
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const modifyConsultant = createAsyncThunk(
  'modify/modifyConsultant',
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
)

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