import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/Axios";
import { OK } from '../../api/CustomConst'

// state
const initialState = {
  // customer state
  myConsultantDxData: [],
  selfDxData: [],
  myReviewsData: [],
  myResData: [],

  // consultant state
  reservations: [], //컨설턴트의 컨설팅 예약 목록
  reviews: [],   // 사용자가 컨설턴트에게 써준 후기 데이터들 모두 저장

  //server status
  status: 'idle' // 'idle' (휴) | 'loading' | 'succeeded' | 'failed'
}

// actions ==============================
// customer ==============================
// 내 진단기록 FETCH (get)
export const myConsultantDxFetch = createAsyncThunk(
  'mypage/myConsultantDxFetch',
  async () => {
    return Axios.get('customers/2')
      .then(res => {
        if (res.status === OK) {
          return res.data
        } else {
          return false
        }
      })
      .catch(error => {
        return false
      })
  }
)

export const selfDxFetch = createAsyncThunk(
  'mypage/selfDxFetch',
  async () => {
    return Axios.get('customers/5')
      .then(res => {
        if (res.status === OK) {
          return res.data
        } else {
          return false
        }
      })
      .catch(error => {
        return false
      })
  }
)

// 내 예약 FETCH (get, delete)
// get
export const myResFetch = createAsyncThunk(
  'mypage/myResFetch',
  async () => {
    return Axios.get('customers/1')
      .then(res => {
        if (res.status === OK) {
          return res.data
        } else {
          return false
        }
      })
      .catch(error => false)
  }
)

// delete
export const deleteResFetch = createAsyncThunk(
  'mypage/deleteResFetch',
  async (reservationId) => {
    return Axios.delete(`reservations/${reservationId}`)
      .then(res => {
        if (res.status === OK) {
          alert('예약이 취소되었습니다.')
          return true
        } else {
          return false
        }
      })
      .catch(error => false)
  }
)


// 리뷰 FETCH (get, post, put, delete)
// get (커스터머가 작성한 리뷰)
export const myReviewFetch = createAsyncThunk(
  'mypage/myReviewFetch',
  async () => {
    return Axios.get('customers/3')
      .then(res => {
        if (res.status === OK) {
          return res.data
        } else {
          return false
        }
      })
      .catch(error => {
        return false
      })
  }
)

// post
export const createReviewFetch = createAsyncThunk(
  'mypage/createReviewFetch',
  async (review) => {
    return Axios.post(`reviews/${review.consultingId}`, review)
      .then(res => {
        if (res.status === OK) {
          alert('후기가 정상적으로 작성되었습니다.')
          return true
        } else {
          alert('후기가 작성되지 않았습니다.')
          return false
        }
      })
      .catch(error => {
        alert('후기가 작성되지 않았습니다.')
        return false
      })
  }
)
// delete
export const deleteReviewFetch = createAsyncThunk(
  'mypage/deleteReviewFetch',
  async (reviewId) => {
    return Axios.delete(`reviews/${reviewId}`)
      .then(res => {
        if (res.status === OK) {
          alert('후기가 정상적으로 삭제되었습니다.')
          return true
        } else {
          alert('후기가 삭제되지 않았습니다.')
          return false
        }
      })
      .catch(error => {
        alert('후기가 삭제되지 않았습니다.')
        return false
      })
  }
)
// patch
export const updateReviewFetch = createAsyncThunk(
  'mypage/updateReviewFetch',
  async (review) => {
    return Axios.patch(`reviews/${review.reviewId}`, review)
      .then(res => {
        if (res.status === OK) {
          alert('후기가 정상적으로 수정되었습니다.')
          return res.data
        } else {
          alert('후기가 수정되지 않았습니다.')
          return false
        }
      })
      .catch(error => {
        alert('후기가 수정되지 않았습니다.')
        return false
      })
  }
)

// consultant ==============================
export const consultantProfileFecth = createAsyncThunk(
  'mypage/consultantprofilefecth',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await Axios.get('consultants/1')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)
// consulting reservations ==============================
export const consultingResFetch = createAsyncThunk(
  'mypage/consultingResFetch',
  async () => {
    return Axios.get('consultants/1')
      .then(res => {
        if (res.status === OK) {
          return res.data.reservations
        } else {
          return false
        }
      })
      .catch(error => false)
  }
)
// consultant closed day =========================
// post
export const closeDay = createAsyncThunk(
  'mypage/closedDay',
  async (closeday) => {
    return Axios.post('consultants/closed-days', closeday)
      .then(res => {
        if (res.status === OK) {
          alert('휴무일로 지정 되었습니다.')
          return true
        } else {
          alert('휴무일 지정에 실패하였습니다.')
          return false
        }
      })
      .catch(error => {
        alert('휴무일 지정에 실패하였습니다.')
        return false
      })
  }
)
// delete
export const deleteClosedDay = createAsyncThunk(
  'mypage/deleteClosedDay',
  async (closedDayId) => {
    return Axios.delete(`consultants/closed-days/${closedDayId}`)
      .then(res => {
        if (res.status === OK) {
          alert('근무일로 지정되었습니다')
          return true
        } else {
          alert('근무일 지정이 실패하였습니다')
          return false
        }
      })
      .catch(error => {
        alert('근무일 지정이 실패하였습니다')
        return false
      })
  }
)
// consulting review ==============================
export const getCustomerReview = createAsyncThunk(
  'mypage/getCustomerReview',
  async (arg, { rejectWithValue }) => {
    try {
      const response = await Axios.get('consultants/2')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
)

// slice ==============================
const mypageSlice = createSlice({
  name: 'mypage',
  initialState,
  extraReducers: (builder) => {
    // customer extra reducers ==============================
    // 컨설팅 진단기록 슬라이스
    builder.addCase(myConsultantDxFetch.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(myConsultantDxFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.myConsultantDxData = payload;
    })
    builder.addCase(myConsultantDxFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
    // 자가진단 기록 슬라이스
    builder.addCase(selfDxFetch.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(selfDxFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.selfDxData = payload;
    })
    builder.addCase(selfDxFetch.rejected, (state, action) => {
      state.status = 'failed';
    })

    // 내 예약 슬라이스
    builder.addCase(myResFetch.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(myResFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.myResData = payload;
    })
    builder.addCase(myResFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
    // 내 리뷰 슬라이스
    builder.addCase(myReviewFetch.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(myReviewFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.myReviewsData = payload;
    })
    builder.addCase(myReviewFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
    // consultant extra reducers ==============================
    builder.addCase(consultantProfileFecth.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(consultantProfileFecth.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.profile = payload;
    })
    builder.addCase(consultantProfileFecth.rejected, (state, action) => {
      state.status = 'failed';
    })
    builder.addCase(consultingResFetch.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(consultingResFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.reservations = payload;
    })
    builder.addCase(consultingResFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
    // consulting review extra reducers ==============================
    builder.addCase(getCustomerReview.pending, (state, action) => {
      state.status = 'Loading';
    })
    builder.addCase(getCustomerReview.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.reviews = payload;
    })
    builder.addCase(getCustomerReview.rejected, (state, action) => {
      state.status = 'failed';
    })

  },
})

export default mypageSlice.reducer;
