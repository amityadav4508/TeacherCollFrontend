import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postBlockApi } from '../authApi'

const initialState = {
  block: 'null',
  status: 'idle',
  signErr: null,
  emailData: null,
  loading: '',
  success: false,
}

export const postBlockAsync = createAsyncThunk('blockPageContent/BlockData', async (data) => {
  const response = await postBlockApi(data)
  return response
})

export const blockPageSlice = createSlice({
  name: 'BlockData',
  initialState,
  reducers: {
    reset: initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBlockAsync.pending, (state) => {
        state.mainContentloading = true
      })
      .addCase(postBlockAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.mainContentloading = false
        state.block = action.payload
      })
      .addCase(postBlockAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.mainContentloading = false
        state.error1 = 'invalid credential'
      })
  },
})

export default blockPageSlice.reducer
