import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { imgAxios } from 'api/Axios'

const initialState = {

}

export const registAvatar = createAsyncThunk(
  'avatar/registAvatar',
  async (formData, { rejectWithValur }) => {
    try {
      const response = await imgAxios.post('', formData)
      return response.data
    } catch (err) {
      return rejectWithValur(err)
    }
  }
)

const avatarSlice = createSlice({
  name: 'avatar',
  initialState,
  extraReducers: {
    [registAvatar.fulfilled]: (state, { payload }) => {
    },
    [registAvatar.rejected]: (state) => {
    },
  }
})

export default avatarSlice.reducer;

