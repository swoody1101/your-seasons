import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import {NO_CONTENT, CREATED, OK} from '../../api/CustomConst'
				

const myReview = [
	{
		reviewId: '1',
		nickname: "우영우",
		imageUrl: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbpoUrCurs17HjSW-4RYSYJCo2zYRR1JIuogGzwzTpEz3YeImQ",
		star: 4,
		comment: "리뷰아이디 1 치당 !",
		reviewDate:' 2022-07-20'
	},
	{
		reviewId: '2',
		nickname: "동그라미",
		imageUrl: "https://w.namu.la/s/48c7bd939908e9465b5ac99febd4f6bcd39f2cf2f39bcee0a312b31b56d07315582137e3f966a7d2a7424be61064c64c9712c9b9a93a55adcbc5cd1b1b183722fb169d59c0dcdd0f7d6a5ef05be46e5b58fb3fba5bf08ba1923999002dcc4a2376a50f9a6b0a4ba01bc643f90f06db45",
		star: 5,
		comment: "리뷰아이디 2 오늘 컨설턴트님이 진단해주신 컬러가 너무 좋았어요~!",
		reviewDate: '2022-07-20'
	}
]



const initialState = {
	myReview:{
		reviewId: '',
		nickname: '',
		imageUrl: '',
		star: '',
		comment: '',
		reviewDate: '',
	},
  data: myReview,  // []
	status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

const back=()=>{
	window.history.go(0)
}
// get
export const myReviewFetch = createAsyncThunk(
	'myReviewSlice/myReviewFetch',
	async ()=> {
		return Axios.get('customers/3')
		.then(res => {
			if(res.status===OK){
					return res.data
			}else{
				alert('후기를 불러올 수 없습니다.')
				back()
				return false
			}
		} )
		.catch(error=>{
			alert('후기를 불러올 수 없습니다.')
			back()
			return false})
	}
)

// post
export const createReviewFetch = createAsyncThunk(
	'myReviewSlice/createReviewFetch',
	async (review) => {
		return Axios.post('review/'+`${review.consultantId}`, review)
		.then(res => {
			if(res.status === CREATED){
				alert('후기가 정상적으로 작성되었습니다.')
				back()
				return true
			}else{
				alert('후기가 작성되지 않았습니다.')
				back()
				return false
			}
		})
		.catch(error=>{
			alert('후기가 작성되지 않았습니다.')
			back()
			return false})
	}
) 

// delete
export const deleteReviewFetch = createAsyncThunk(
	'myReviewSlice/deleteReviewFetch',
	async (reviewId) => {
		return Axios.delete('customers/'+`${reviewId}`)
		.then(res=>{
			if (res.status===NO_CONTENT){
				alert('후기가 정상적으로 삭제되었습니다.')
				back()
				return true
			}else{
				alert('후기가 삭제되지 않았습니다.')
				back()
				return false
			}
		})
		.catch(error=>{
			alert('후기가 삭제되지 않았습니다.')
			back()
			return false})
	}
) 

// put
//PATCH /reviews/{reviewId}  (star, comment)
export const updateReviewFetch = createAsyncThunk(
	'myReviewSlice/updateReviewFetch',
	async (review) => {
		return Axios.put('review/'+ `${review.reviewId}`, review)
		.then(res=>{
			if(res.status===OK){
				alert('후기가 정상적으로 작성되었습니다.')
				back()
				return res.data
			}else{
				alert('후기가 수정되지 않았습니다.')
				back()
				return false
			}
		})
		.catch(error=>{
			alert('후기가 수정되지 않았습니다.')
			back()
			return false})
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

export default myReviewSlice.reducer