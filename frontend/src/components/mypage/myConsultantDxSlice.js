import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
// 지난 진단 기록 불러와서 프로필에도 적용하기 (마지막 진단 하나만)

const consultantDiagnosis = [
	{consultantNickname: "히사시부리",
	consultantImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Joo_Won_in_August_2020.jpg",
	consultingDate: "2022-01-19",
	bestColorSet: ["#0000FF", "#FF0000", "#00FF00"], 
	worstColorSet: ["#C0C0C0", "#808080", "#00FF00"],
	resultImageUrl: "https://cdn.imweb.me/thumbnail/20211226/af5ae627d9c53.png",
	comment: "치당님은 웜톤입니다 ~~~ 베스트컬러는 비비드한게 잘어울리는~Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab architecto alias unde laudantium obcaecati numquam. Molestias iusto consequatur, officiis dolore ipsum enim minus similique iure veritatis tenetur repellat cumque neque!~~~~"},
	{consultantNickname: "asdf",
	consultantImageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Joo_Won_in_August_2020.jpg",
	consultingDate: "2022-01-19",
	bestColorSet: ["#0000FF", "#FF0000", "#00FF00"], 
	worstColorSet: ["#C0C0C0", "#808080", "#00FF00"],
	resultImageUrl: "https://cdn.imweb.me/thumbnail/20211226/af5ae627d9c53.png",
	comment: "치당님은 ㅏㅏ "},
]

const initialState = {
	// consultantDiagnosis:{
	// 	consultantNickname: '',
	// 	consultantImg: '',
	// 	consultingDate: '',
	// 	bestColorSet: [],
	// 	worstColorSet: [],
	// 	resultImg: '',
	// 	comment: '',
	// },
  data: consultantDiagnosis,   // []
	status: 'idle' // 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const myConsultantDxFetch = createAsyncThunk(
	'myConsultantDxSlice/myConsultantDxFetch',
	async ()=> {
		// return Axios.get('customers/2')
		return Axios.get('articles')
		.then(res => res.data )
		.catch(error=>false)

	}
)

const myConsultantDxSlice = createSlice({
	name: 'myConsultantDxSlice',
	initialState,
	extraReducers:(builder) => {
		builder.addCase(myConsultantDxFetch.pending, (state, action)=>{
			state.status = 'loading';
		})
		builder.addCase(myConsultantDxFetch.fulfilled, (state, {payload})=>{
			state.status = 'succeeded';
			state.data = payload;
		})
		builder.addCase(myConsultantDxFetch.rejected, (state, action)=>{
			state.status = 'failed';
		})
	},
	reducers: {
	}
})
export default myConsultantDxSlice