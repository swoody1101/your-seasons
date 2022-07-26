import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import {NO_CONTENT, CREATED, OK} from '../../api/CustomConst'



const reservations = [
	{
		reservationDate: '20220119',  //(1) 날짜 지남
		reservationTime: '14:00:00',
		consultant: '우영우',
		consultantImg: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTbpoUrCurs17HjSW-4RYSYJCo2zYRR1JIuogGzwzTpEz3YeImQ',
		request: '이 사건은 재미있습니다. 제가 좋아하는 고래 퀴즈 같아요. 몸무게가 22톤인 암컷 향고래가 500kg에 달하는 대왕오징어를 먹고 6시간 뒤 1.3톤짜리 알을 낳았다면 이 암컷 향고래의 몸무게는 얼마일까요? 정답은 ‘고래는 알을 낳을 수 없다’입니다. 고래는 포유류라 알이 아닌 새끼를 낳으니까요. 무게에만 초점을 맞추면 문제를 풀 수 없습니다. 핵심을 봐야 돼요.고래는 알을 낳을 수 없다’입니다. 고래는 포유류라 알이 아닌 새끼를 낳으니까요. 255자@@',
		isActive: false,
	},		
	{
		reservationDate: '20220808', //(2)
		reservationTime: '07:30:00',
		consultant: '동그라미',
		consultantImg: 'https://w.namu.la/s/48c7bd939908e9465b5ac99febd4f6bcd39f2cf2f39bcee0a312b31b56d07315582137e3f966a7d2a7424be61064c64c9712c9b9a93a55adcbc5cd1b1b183722fb169d59c0dcdd0f7d6a5ef05be46e5b58fb3fba5bf08ba1923999002dcc4a2376a50f9a6b0a4ba01bc643f90f06db45' ,
		request: '',
		isActive: true,
	},

	{
	reservationDate: '20220831',  //(3) 가장 최근
	reservationTime: '09:00:00',
	consultant: '이준호',
	consultantImg: 'https://w.namu.la/s/63d8422592e52db967ab25884af70f125c9d04d2ef88b000e554f863dcde58b0bede0a11664b24cef74b672f5fc3614790025de62aac640cc79043a77f73f55f722ce34d2834c4d7408f31dc14a14682f92c5c3149da70cd56cccd5fe2175f59d9217532bcbd86b32138fe002a1d33cb' ,
	request: '이게 가장 최근 예약이에요. 저는 여름 쿨톤일까요 겨울 쿨톤일까요 Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto molestiae impedit ipsa. Nihil quia nemo, at fugit, laborum aliquam, dolores ducimus quod unde numquam eveniet aut? Dignissimos laboriosam repellendus adipisci!',
	isActive: true,
},
]

const initialState = {
		// reservationDate: '', 
		// reservationTime: '',
		// consultant: '',
		// consultantImg: '' ,
		// request: '',
		// isActive: true,
  data: reservations,  // []
	status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

// get
export const myResFetch = createAsyncThunk(
	'myResSlice/myResFetch',
	async ()=> {
		return Axios.get('customers/1')
		.then(res => res.data )
		.catch(error=>false)
	}
)

// post

// delete
export const deleteResFetch = createAsyncThunk(
	'myResSlice/deleteResFetch',
	async (reservation) => {
		return Axios.delete('customers/'+`${reservation.id}`, reservation)
		.then(res=>{
			if (res.status===NO_CONTENT){
				alert('예약이 취소되었습니다.')
				return true
			}else{
				return false
			}
		})
		.catch(error=>false)
	}
) 

// put
export const updateResFetch = createAsyncThunk(
	'myResSlice/updateResFetch',
	async (reservation) => {
		console.log(reservation)
		return Axios.put('customers/'+ `${reservation.id}`, reservation)
		.then(res=>res.data)
		.catch(error=>false)
	}
)


export const myResSlice = createSlice({
	name: 'myResSlice',
	initialState,
	extraReducers:(builder) => {
		builder.addCase(myResFetch.pending, (state, action)=>{
			state.status = 'Loading';
		})
		builder.addCase(myResFetch.fulfilled, (state, {payload})=>{
			state.status = 'succeeded';
			state.data = payload;
		})
		builder.addCase(myResFetch.rejected, (state, action)=>{
			state.status = 'failed';
		})
	}
})

export default myResSlice.reducer