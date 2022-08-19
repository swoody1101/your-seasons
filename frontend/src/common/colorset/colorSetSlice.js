import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'api/Axios'
import { OK } from 'api/CustomConst'
import { colorSetData } from './colorSetData'

const initialState = {
  data: colorSetData,
  selectedColor: '',
  consultingComment: '',
  tone: '',
  bestColor: [],
  worstColor: [],
  status: 'idle',
  files: ''
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
    setFiles: (state, action) => {
      state.files = action.payload
    },
    changeComment: (state, action) => {
      // 1000자 최대
      if (state.consultingComment.length < 999) {
        state.consultingComment = action.payload
      } else {
        alert('1000자 이상 입력할 수 없습니다.')
        return
      }
    },
    selectTone: (state, action) => {
      state.tone = action.payload
    },
    changeSelectColor: (state, action) => {
      state.selectedColor = action.payload
    },
    resetColor: (state, action) => {
      state.selectedColor = ''
      state.bestColor = []
      state.worstColor = []
    },
    removeSelectColor: (state, action) => {
      state.selectedColor = ''
    },
    addBestColor: (state, action) => {
      if (state.bestColor.length < 10) {
        if (state.bestColor.includes(action.payload)) {
          alert('이미 존재하는 컬러입니다.')
          return
        } else {
          state.bestColor.push(action.payload);
        }
      } else {
        alert('최대 10개의 컬러를 추가할 수 있습니다.')
        return
      }
    },
    removeBestColor: (state, action) => {
      state.bestColor = state.bestColor.filter((color) => color !== action.payload)
    },
    addWorstColor: (state, action) => {
      if (state.worstColor.length < 10) {
        if (state.worstColor.includes(action.payload)) {
          alert('이미 존재하는 컬러입니다.')
          return
        } else {
          state.worstColor.push(action.payload);
        }
      } else {
        alert('최대 10개의 컬러를 추가할 수 있습니다.')
        return
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


export const {
  addBestColor, removeSelectColor, changeSelectColor,
  changeBestColor, removeBestColor, addWorstColor,
  removeWorstColor, sharedColorSet, changeComment,
  selectTone, setFiles, resetColor
} = ColorSetListSlice.actions;

export default ColorSetListSlice.reducer
