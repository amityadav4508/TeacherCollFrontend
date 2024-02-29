import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bidAssignmentApi, getPreviousBidApi, postAcceptAssignmentApi } from '../authApi'

const initialState = {
  acceptAssignment: null,
  status: null,
  acceptAssignmentLoading: '',
  successMsg: null,
  errorMsg: null,
  bidMessage: null,
  addhoursAssignmentLoading:null,
  previousBid:null
}

export const postAcceptAssignmentAsync = createAsyncThunk(
  ' AcceptAssignmentStats/AcceptData',
  async (data) => {
    const response = await postAcceptAssignmentApi(data)
    return response
  },
)
export const bidAssignmentAsync = createAsyncThunk(
  ' AcceptAssignmentStats/bidAssignment ',
  async (data) => {
    const response = await bidAssignmentApi(data)
    return response
  },
)

//getPreviousBidAsync
export const getPreviousBidAsync = createAsyncThunk(
  ' getPreviousBidAsync/bidAssignment ',
  async (data) => {
    const response = await getPreviousBidApi(data)
    return response
  },
)

export const AcceptAssignmentSlice = createSlice({
  name: 'AcceptAssignmentStats',
  initialState,
  reducers: {
    reset: initialState,
    clearAllStateAccept: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
      state.acceptAssignment = null
      state.bidMessage=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAcceptAssignmentAsync.pending, (state) => {
        state.acceptAssignmentLoading = true
      })
      .addCase(postAcceptAssignmentAsync.fulfilled, (state, action) => {
        state.status = 200
        state.acceptAssignmentLoading = false
        state.acceptAssignment = action.payload
      })
      .addCase(postAcceptAssignmentAsync.rejected, (state, action) => {
        state.status = 500
        state.acceptAssignmentLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(bidAssignmentAsync.pending, (state) => {
        state.addhoursAssignmentLoading = true
      })
      .addCase(bidAssignmentAsync.fulfilled, (state, action) => {
        state.status = 200
        state.addhoursAssignmentLoading = false
        state.bidMessage = action.payload
      })
      .addCase(bidAssignmentAsync.rejected, (state, action) => {
        state.status = 500
        state.addhoursAssignmentLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getPreviousBidAsync.pending, (state) => {
        state.addhoursAssignmentLoading = true
      })
      .addCase(getPreviousBidAsync.fulfilled, (state, action) => {
        state.status = 200
        state.addhoursAssignmentLoading = false
        state.previousBid = action.payload
      })
      .addCase(getPreviousBidAsync.rejected, (state, action) => {
        state.status = 500
        state.addhoursAssignmentLoading = false
        state.error1 = 'invalid credential'
      })
  },
})

export default AcceptAssignmentSlice.reducer
export const { clearAllStateAccept } = AcceptAssignmentSlice.actions
