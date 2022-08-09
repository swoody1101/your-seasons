import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import { OK } from '../../api/CustomConst'


const initialState = {
	// home -> top10 컨설턴트
	topTen: [],
	// 컨설턴트 목록
	popularConsultants: [],
	latestConsultants: [],
	highStarConsultants: [],
	highReviewConsultants: [],
	highCostConsultants: [],
	lowCostConsultants: [],

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
export const PopularListFetch = createAsyncThunk(
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


// export const TopTenListFetch = createAsyncThunk(
// 	'/consultants?order=star',
// 	async () => {
// 		return Axios.get('consultants/top10')
// 			.then(res => {
// 				if (res.status === OK) {
// 					return res.data
// 				} else {
// 					alert('컨설턴트 목록을 불러올 수 없습니다.')
// 					window.history.go(-1)
// 				}
// 			})
// 	}
// )
// export const TopTenListFetch = createAsyncThunk(
// 	'/consultants?order=latest',
// 	async () => {
// 		return Axios.get('consultants/top10')
// 			.then(res => {
// 				if (res.status === OK) {
// 					return res.data
// 				} else {
// 					alert('컨설턴트 목록을 불러올 수 없습니다.')
// 					window.history.go(-1)
// 				}
// 			})
// 	}
// )
// export const TopTenListFetch = createAsyncThunk(
// 	'/consultants?order=manyReviews',
// 	async () => {
// 		return Axios.get('consultants/top10')
// 			.then(res => {
// 				if (res.status === OK) {
// 					return res.data
// 				} else {
// 					alert('컨설턴트 목록을 불러올 수 없습니다.')
// 					window.history.go(-1)
// 				}
// 			})
// 	}
// )
// export const TopTenListFetch = createAsyncThunk(
// 	'/consultants?order=highCost',
// 	async () => {
// 		return Axios.get('consultants/top10')
// 			.then(res => {
// 				if (res.status === OK) {
// 					return res.data
// 				} else {
// 					alert('컨설턴트 목록을 불러올 수 없습니다.')
// 					window.history.go(-1)
// 				}
// 			})
// 	}
// )
// export const TopTenListFetch = createAsyncThunk(
// 	'/consultants?order=lowCost',
// 	async () => {
// 		return Axios.get('consultants/top10')
// 			.then(res => {
// 				if (res.status === OK) {
// 					return res.data
// 				} else {
// 					alert('컨설턴트 목록을 불러올 수 없습니다.')
// 					window.history.go(-1)
// 				}
// 			})
// 	}
// )

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
		builder.addCase(PopularListFetch.pending, (state, action) => {
			state.status = 'loading';
		})
		builder.addCase(PopularListFetch.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			// 추후 삭제예정
			state.popularConsultants = payload
			// 추후 주석해제, 현재 백엔드 코드 변경 반영안됨
			// if(payload.consultantrole==='popular') state.popularConsultants = payload;
			// else if(payload.consultantrole==='star') state.highStarConsultants = payload;
			// else if(payload.consultantrole==='latest') state.latestConsultants = payload;
			// else if(payload.consultantrole==='manyReviews') state.highReviewConsultants = payload;
			// else if(payload.consultantrole==='highCost') state.highCostConsultants = payload;
			// else if(payload.consultantrole==='lowCost') state.lowCostConsultants = payload;
		})
		builder.addCase(PopularListFetch.rejected, (state, action) => {
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
	}
})

export default ConsultantListSlice.reducer