import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'api/Axios'
import { OK } from 'api/CustomConst'
import {colorSetData} from './colorSetData'

const initialState = {
  data: colorSetData,
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
        if (res.status === OK) {
          return res.data
        } else {
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
    builder.addCase(ColorSetListFetch.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(ColorSetListFetch.fulfilled, (state, { payload }) => {
      state.status = 'succeeded';
      state.data = payload;
    })
    builder.addCase(ColorSetListFetch.rejected, (state, action) => {
      state.status = 'failed';
    })
  },
  reducers: {
    changeSelectColor: (state, action) => {
      state.selectedColor = action.payload
    },
    removeSelectColor: (state, action) => {
      state.selectedColor = ''
    },
    addBestColor: (state, action) => {
      if (state.bestColor.includes(action.payload)) {
        return alert('이미 존재하는 컬러입니다.')
      } else {
        state.bestColor.push(action.payload);
      }
    },
    removeBestColor: (state, action) => {
      state.bestColor = state.bestColor.filter((color) => color !== action.payload)
    },
    addWorstColor: (state, action) => {
      if (state.worstColor.includes(action.payload)) {
        return alert('이미 존재하는 컬러입니다.')
      } else {
        state.worstColor.push(action.payload);
      }
    },
    removeWorstColor: (state, action) => {
      state.worstColor = state.worstColor.filter((color) => color !== action.payload)
    },
    sharedColorSet: (state, { payload }) => {
      if (JSON.stringify(state.selectedColor) !== JSON.stringify(payload.newSelectedColor)) {
        state.selectedColor = payload.newSelectedColor
      }
      if (JSON.stringify(state.bestColor) !== JSON.stringify(payload.newBestColor)) {
        state.bestColor = payload.newBestColor
      }
      if (JSON.stringify(state.worstColor) !== JSON.stringify(payload.newWorstColor)) {
        state.worstColor = payload.newWorstColor
      } // todo 무한루프 방지해야함
    }
  }
})


export const { addBestColor, removeSelectColor, changeSelectColor,
  changeBestColor, removeBestColor, addWorstColor,
  removeWorstColor, sharedColorSet } = ColorSetListSlice.actions;

export default ColorSetListSlice.reducer
