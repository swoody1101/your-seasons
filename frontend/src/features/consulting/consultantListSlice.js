import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import { OK } from '../../api/CustomConst'


const initialState = {
	//컨설턴트 상세정보
	consultantDetail: {
		reservations: [],
		closedDays: []
	},
	// 컨설팅 후기 목록
	cosultingReview: [],
	// 컨설턴트 목록
	consultants: [],
	status: 'idle'
}


// 컨설턴트 목록 get
export const ConsultantListFetch = createAsyncThunk(
	'consultants',
	async () => {
		return Axios.get('consultants')
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

//컨설턴트 상세정보 get
export const ConsultantDetailFetch = createAsyncThunk(
	'consultants/ConsultantDetailFetch',
	async (consultantID) => {
		return Axios.get(`consultants/${consultantID}/1`)
			.then(res => {
				console.log(res.data)
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
		builder.addCase(ConsultantListFetch.pending, (state, action) => {
			state.status = 'loading';
		})
		builder.addCase(ConsultantListFetch.fulfilled, (state, { payload }) => {
			state.status = 'succeeded';
			state.consultants = payload;
		})
		builder.addCase(ConsultantListFetch.rejected, (state, action) => {
			state.status = 'failed';
		})
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