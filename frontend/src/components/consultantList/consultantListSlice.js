import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import {OK} from '../../api/CustomConst'
import tmpImg from '../../assets/images/ancun.png'

const consultants = [
	{
		consultantId: 1,
		nickname: "ansi",
		introduction: "안녕하세요, ansi입니다.안녕하세요, ansi입니다.안녕하세요, ansi입니다.안녕하세요, ansi입니다.안녕하세요, ansi입니다.안녕하세요, ansi입니다.안녕하세요, ansi입니다.",
		reviewCount: 5,
		starAverage: 5.0,
		cost: "30,000",
		imageUrl: {tmpImg},
	},
	
	{
		consultantId: 2,
		nickname: "이번",
		introduction: "안녕하세요, ssafy99입니다.",
		reviewCount: 9,
		starAverage: 3.8,
		cost: "50,000",
		imageUrl: {tmpImg},
	},
	{
		consultantId: 3,
		nickname: "별점3.0",
		introduction: "가격 10000",
		reviewCount: 5,
		starAverage: 3.0,
		cost: "10,000",
		imageUrl: {tmpImg},
	},
	{
		consultantId: 4,
		nickname: "cost 20000",
		introduction: "별점4.9",
		reviewCount: 9,
		starAverage: 4.9,
		cost: "49,000",
		imageUrl: {tmpImg},
	},
	{
		consultantId: 5,
		nickname: "ansi",
		introduction: "안녕하세요, ansi입니다.",
		reviewCount: 5,
		starAverage: 4.5,
		cost: "30,000",
		imageUrl: {tmpImg},
	},
	{
		consultantId: 6,
		nickname: "ssafy99",
		introduction: "안녕하세요, ssafy99입니다.",
		reviewCount: 9,
		starAverage: 3.8,
		cost: "50,000",
		imageUrl: {tmpImg},
	},
]

const initialState = {
	consultantsData: consultants,
	status: 'idle'
}


// get
export const ConsultantListFetch = createAsyncThunk(
	'/consultants',
	async () => {
		return Axios.get('consultants')
		.then(res => {
			if(res.status===OK){
				return res.data
			}else{
				alert('컨설턴트 목록을 불러올 수 없습니다.')
				window.history.go(-1)
			}
		})
	}
)


const ConsultantListSlice = createSlice({
	name: 'consultantList',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(ConsultantListFetch.pending, (state, action)=>{
			state.status = 'loading';
		})
		builder.addCase(ConsultantListFetch.fulfilled, (state, {payload})=>{
			state.status = 'succeeded';
			state.consultantsData = payload;
		})
		builder.addCase(ConsultantListFetch.rejected, (state, action)=>{
			state.status = 'failed';
		})
	}
})

export default ConsultantListSlice.reducer