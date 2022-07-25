import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import {NO_CONTENT, CREATED, OK} from '../../api/CustomConst'


const myReview = [
	{
		reviewId: '1',
		consultantNickname: "치당",
		consultantImageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbpoUrCurs17HjSW-4RYSYJCo2zYRR1JIuogGzwzTpEz3YeImQ",
		star: 4,
		comment: "오늘 컨설턴트님이 진단해주신 컬러가 너무 좋았어요~!",
		reviewDate:' 2022-07-20'
	},
	{
		reviewId: '2',
		consultantNickname: "치당",
		consultantImageUrl: "https://w.namu.la/s/48c7bd939908e9465b5ac99febd4f6bcd39f2cf2f39bcee0a312b31b56d07315582137e3f966a7d2a7424be61064c64c9712c9b9a93a55adcbc5cd1b1b183722fb169d59c0dcdd0f7d6a5ef05be46e5b58fb3fba5bf08ba1923999002dcc4a2376a50f9a6b0a4ba01bc643f90f06db45",
		star: 4,
		comment: "오늘 컨설턴트님이 진단해주신 컬러가 너무 좋았어요~!",
		reviewDate: '2022-07-20'
	}
]

const initialState = {
	// myReview:{
	// 	reviewId: '',
	// 	consultantNickname: '',
	// 	consultantImageUrl: '',
	// 	star: '',
	// 	comment: '',
	// 	reviewDate: '',
	// },
  data: myReview,  // []
	status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

// get
export const myReviewFetch = createAsyncThunk(
	'myReviewSlice/myReviewFetch',
	async ()=> {
		return Axios.get('customers/3')
		.then(res => res.data )
		.catch(error=>false)
	}
)

// post
export const createReviewFetch = createAsyncThunk(
	'myReviewSlice/createReviewFetch',
	async (review) => {
		return Axios.post('customers/'+`${review.reviewId}`, review)
		.then(res => {
			if(res.status === CREATED){
				return true
			}else{
				return false
			}
		})
		.catch(error=>false)
	}
) 

// delete
export const deleteReviewFetch = createAsyncThunk(
	'myReviewSlice/deleteReviewFetch',
	async (review) => {
		return Axios.delete('customers/'+`${review.reviewId}`, review)
		.then(res=>{
			if (res.status===NO_CONTENT){
				alert('글이 정상적으로 삭제되었습니다.')
				return true
			}else{
				return false
			}
		})
		.catch(error=>false)
	}
) 

// put
export const updateReviewFetch = createAsyncThunk(
	'myReviewSlice/updateReviewFetch',
	async (review) => {
		return Axios.put('customers/'+ `${review.reviewId}`, review)
		.then(res=>res.data)
		.catch(error=>false)
	}
)


export const myReviewSlice = createSlice({
	name: 'myReviewSlice',
	initialState,
	extraReducers:(builder) => {
		builder.addCase(myReviewFetch.pending, (state, action)=>{
			state.status = 'Loading';
		})
		builder.addCase(myReviewFetch.fulfilled, (state, {payload})=>{
			state.status = 'succeeded';
			state.data = payload;
		})
		builder.addCase(myReviewFetch.rejected, (state, action)=>{
			state.status = 'failed';
		})
	}
})

export default myReviewSlice