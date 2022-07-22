//store.js

import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit'


const reservations = createSlice({
  name:'resReducer',    //3개 필수 
  initialState:[],
  reducers:{
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() })
    },
    remove: (state, action) =>
      state.filter(toDo => toDo.id !== action.payload)
    }
});


//todos의 reducer를 export해서 store의 reducer를 재설정한다.
/////////////위의 slice로 부터 reducer를 받는다.///////////////////////
const store = configureStore({ reducer:toDos.reducer })

// console.log(toDos.actions);
// action으로 제공
export const { add, remove } = toDos.actions

export default store;