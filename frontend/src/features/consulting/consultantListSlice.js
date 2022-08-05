import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import { OK } from '../../api/CustomConst'


const initialState = {
	//컨설턴트 상세정보
	consultantDetail: {},

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
	'consultants/consultantID',
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
	}
})

export default ConsultantListSlice.reducer