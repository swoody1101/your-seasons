import {createSlice } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit'

const authLogin = createSlice({
	name:'loginReducer',
	initialState: [],
	reducers:{
		login: (state, action) => {
			state.push({})
		},
		// logout: (state, action) => 
		// 	//  토큰 삭제
	}
})

const store = configureStore({ reducer:authLogin.reducer })

export const { login } = authLogin.actions


export default store;


// initialState:{
// 	token: localStorage.getItem('token') || '' ,
// 	authError: null,
// 	isLoggedIn: false,
// },