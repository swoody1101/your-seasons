import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import { OK } from '../../api/CustomConst'


const initialState = {
	// home -> top10 컨설턴트
	topTen: [],
	// 컨설턴트 목록 및 컨설턴트 검색
	conValue: 'popular',
	consultants: [],

	//컨설턴트 상세정보
	consultantDetail: {
		reservations: [],
		closedDays: []
	},
	// 컨설팅 후기 목록
	cosultingReview: [],
	status: 'idle',
}

// home -> top10 컨설턴트
export const TopTenListFetch = createAsyncThunk(
	'consultants/top10',
	async () => {
		return Axios.get('consultants/top10')
			.then(res => {
				if (res.status === OK) {
					return res.data
				} else {
					alert('컨설턴트 목록을 불러올 수 없습니다.')
					window.history.go(-1)
				}
			})
	}
)

// popularConsultants
export const ConsultantListFetch = createAsyncThunk(
	'/consultants?order=popular',
	async (value) => {
		return Axios.get(`consultants?order=${value}`)
			.then(res => {
				if (res.status === OK) {
					return res.data
				} else {
					alert('컨설턴트 목록을 불러올 수 없습니다.')
					window.history.go(-1)
				}
			})
	}
)

// 컨설턴트 검색
export const ConsultantSearchFetch = createAsyncThunk(
	'/consultants/search?keyword=졸리',
	async (payload) => {
		return Axios.get(`consultants/search?keyword=${payload}`)
			.then(res => {
				if (res.status === OK) {
					return res.data
				} else {
					alert('검색불가')
					window.history.go(-1)
				}
			})
	}
)


//컨설턴트 상세정보 get
export const ConsultantDetailFetch = createAsyncThunk(
	'consultants/ConsultantDetailFetch',
	async (consultantID) => {
		return Axios.get(`consultants/${consultantID}/1`)
			.then(res => {
				if (res.status === OK) {
					return res.data
				} else {
					alert('컨설턴트 상세정보를 불러올 수 없습니다.')
					window.history.go(-1)
				}
			})
	}
)


// 컨설팅 예약
export const createReservation = createAsyncThunk(
	'consultants/createReservation',
	async (payload, { rejectWithValue }) => {
		return Axios.post(`reservations/${payload.consultantId}`, payload.reservation)
			.then(res => {
				if (res.status === OK) {
					alert('예약이 완료되었습니다.')
					return true
				} else {
					alert('예약에 실패했습니다.')
					return false
				}
			})
			.catch(err => {
				alert('예약에 실패했습니다.')
				return rejectWithValue(err.response.data);
			})
	}
)

//컨설팅 리뷰
export const ConsultingReviewFetch = createAsyncThunk(
	'consultants/ConsultingReviewFetch',
	async (consultantID) => {
		return Axios.get(`consultants/${consultantID}/2`)
			.then(res => {
				if (res.status === OK) {
					return res.data
				} else {
					alert('컨설팅 후기 목록을 불러올 수 없습니다.')
					window.history.go(-1)
				}
			})
	}
)


const ConsultantListSlice = createSlice({
	name: 'consultantList',
	initialState,
	extraReducers: (builder) => {
		// Top 10 consultant 리스트 패치
		builder.addCase(TopTenListFetch.pending, (state, action) => {
			state.status = 'loading';
		})
		builder.addCase(TopTenListFetch.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			state.topTen = payload;
		})
		builder.addCase(TopTenListFetch.rejected, (state, action) => {
			state.status = 'failed';
		})
		// 컨설턴트 리스트 패치
		builder.addCase(ConsultantListFetch.pending, (state, action) => {
			state.status = 'loading';
		})
		builder.addCase(ConsultantListFetch.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			state.consultants = payload
		})
		builder.addCase(ConsultantListFetch.rejected, (state, action) => {
			state.status = 'failed';
		})
		// 컨설턴트 검색
		builder.addCase(ConsultantSearchFetch.pending, (state, action) => {
			state.status = 'loading';
		})
		builder.addCase(ConsultantSearchFetch.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			state.consultants = payload
		})
		builder.addCase(ConsultantSearchFetch.rejected, (state, action) => {
			state.status = 'failed';
		})
		// 컨설턴트 디테일 패치
		builder.addCase(ConsultantDetailFetch.pending, (state, action) => {
			state.status = 'loading';
		})
		builder.addCase(ConsultantDetailFetch.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			state.consultantDetail = payload;
		})
		builder.addCase(ConsultantDetailFetch.rejected, (state, action) => {
			state.status = 'failed';
		})
		// 컨설턴트 디테일 리뷰 패치
		builder.addCase(ConsultingReviewFetch.pending, (state, action) => {
			state.status = 'loading';
		})
		builder.addCase(ConsultingReviewFetch.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			state.cosultingReview = payload;
		})
		builder.addCase(ConsultingReviewFetch.rejected, (state, action) => {
			state.status = 'failed';
		})
	},
	reducers: {
		setConValue: (state, action) => {
			state.conValue = action.payload
		},
	}
})

export const { setConValue } = ConsultantListSlice.actions
export default ConsultantListSlice.reducer