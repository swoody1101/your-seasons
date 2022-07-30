import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import Axios from '../../api/Axios'
import {OK} from '../../api/CustomConst'
const colorset = [
	{
		spring_bright: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		spring_true: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		spring_light: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
	},
	{
		summer_light: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		summer_true: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		summer_soft: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
	},
		{autumn_soft: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		autumn_true: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		autumn_dark: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],},
		{winter_bright: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		winter_true: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],
		winter_dark: [
			'#FDF0B1',
			'#F9C5C7',
			'#B8D66A',
			'#F85C49',
			'#F44C2C',
			
			'#F17E8B',
			'#EE3A50',
			'#F16F8F',
			'#53C8E5',
			'#CB1F5F',
			
			'#0052C6',
			'#F4A518',
			'#3B8E45',
			'#8063CD',
			'#A8DDE1',
			
			'#C4B8B9',
			'#368BEA',
			'#FF9E1C',
			'#D36CAE',
			'#FEE9CF',
		],}
]

const initialState = {
	data: colorset,
	selectedColor: '',
	bestColor: [],
	worstColor: [],
	status: 'idle'
}


// get
export const ColorSetListFetch = createAsyncThunk(
	'/colorsets',
	async () => {
		return Axios.get('colorsets')
		.then(res => {
			if(res.status===OK){
				return res.data
			}else{
				alert('컬러셋 목록을 불러올 수 없습니다.')
				window.history.go(-1)
			}
		})
	}
)




const ColorSetListSlice = createSlice({
	name: 'colorsetList',
	initialState,
	extraReducers: (builder) => {
		builder.addCase(ColorSetListFetch.pending, (state, action)=>{
			state.status = 'loading';
		})
		builder.addCase(ColorSetListFetch.fulfilled, (state, {payload})=>{
			state.status = 'succeeded';
			state.data = payload;
		})
		builder.addCase(ColorSetListFetch.rejected, (state, action)=>{
			state.status = 'failed';
		})
	},
	reducers:{
		// 색상팔레트에서 한번 더 클릭하면 선택 색상 없어짐
		changeSelectColor: (state, action) => {
			state.selectedColor = action.payload
		},
		removeSelectColor: (state, action) => {
			state.selectedColor = ''
		},
		addBestColor: (state, action) => {
			if(state.bestColor.includes(action.payload)){
				return alert('이미 존재하는 컬러입니다.')
			}else{
				state.bestColor.push(action.payload);
			}
		},
		removeBestColor: (state, action) => {
			state.bestColor = state.bestColor.filter((color) => color !== action.payload)
		},		
		addWorstColor: (state, action) => {
			if(state.worstColor.includes(action.payload)){
				return alert('이미 존재하는 컬러입니다.')
			}else{
				state.worstColor.push(action.payload);
			}
		},
		removeWorstColor: (state, action) => {
			state.worstColor = state.worstColor.filter((color) => color !== action.payload)
		},
	}
})


export const { addBestColor, removeSelectColor, changeSelectColor, changeBestColor, removeBestColor, addWorstColor, removeWorstColor } = ColorSetListSlice.actions;



export default ColorSetListSlice.reducer