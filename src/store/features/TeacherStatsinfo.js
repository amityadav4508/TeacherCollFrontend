import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {  getTeacherStats } from '../authApi'

const initialState = {
  teacherStats: 'null',
  status: null,
  signErr: null,
  emailData: null,
  orderloading: '',
  successMessage: null,
  successMsg: null,
  errorMsg: null,
  assignments: null,
  orderList: null,
}

export const getTeacherStatsAsync = createAsyncThunk('TeacherStats/statsData', async () => {
  const response = await getTeacherStats()
  return response
})

export const TeacherStatsSlice = createSlice({
  name: 'TeacherStats',
  initialState,
  reducers: {
    reset: initialState,
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherStatsAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(getTeacherStatsAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.teacherStats = action.payload
      })
      .addCase(getTeacherStatsAsync.rejected, (state, action) => {
        
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
     
  },
})

export default TeacherStatsSlice.reducer
export const {  clearAllState} = TeacherStatsSlice.actions
