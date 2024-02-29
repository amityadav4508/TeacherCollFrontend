import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bidAssignTeacherApi, getAssignmentbyId, getBidAssignmentsApi, getBidAssignmentsIdApi, getUserAssignmentbyId, resubmitAssignmentByIdApi } from '../authApi'

const initialState = {
  getAssignmentID: 'null',
  status: 'idle',
  successMsg: null,
  errorMsg: null,
  signErr: null,
  emailData: null,
  orderReLoading: '',
  successMessage: null,
  assignments: null,
  orderList: null,
  resubmitMessage: '',
  getBidAssignmentsList:null,
  getAssignmentId:null,
  bidAssignTeacher:null,
  assignbidloading:null
}

export const getAssignmentbyIdAsync = createAsyncThunk(
  'AssignmentData/subscriptionData',
  async (id) => {
    const response = await getAssignmentbyId(id)
    return response
  },
)
//getUserAssignmentbyIdAsync
export const getUserAssignmentbyIdAsync = createAsyncThunk(
  'UserAssignmentData/subscriptionData',
  async (id) => {
    const response = await getUserAssignmentbyId(id)
    return response
  },
)
//api/v1/resubmit-assignment
export const resubmitAssignmentById = createAsyncThunk(
  'UserAssignmentData/resubmitAssignmentById',
  async (id) => {
    const response = await resubmitAssignmentByIdApi(id)
    return response
  },
)
export const getBidAssignmentsAsync = createAsyncThunk(
  'UserAssignmentData/getBidAssignmentsAsync',
  async (id) => {
    const response = await getBidAssignmentsApi(id)
    return response.data
  },
)
export const getBidAssignmentsIdAsync = createAsyncThunk(
  'UserAssignmentData/getBidAssignmentsIdAsync',
  async (id) => {
    const response = await getBidAssignmentsIdApi(id)
    return response
  },
)
export const bidAssignTeacherAsync = createAsyncThunk(
  'UserAssignmentData/getBidAssignmentsTeacherAsync',
  async (id) => {
    const response = await bidAssignTeacherApi(id)
    return response
  },
)

export const AssignmentListByIDSlice = createSlice({
  name: 'AssignmentTable',
  initialState,
  reducers: {
    reset: initialState,
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
      state.resubmitMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      // get AssignmentbyId
      .addCase(getAssignmentbyIdAsync.pending, (state) => {
        state.orderReLoading = true
      })
      .addCase(getAssignmentbyIdAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.getAssignmentID = action.payload
      })
      .addCase(getAssignmentbyIdAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getUserAssignmentbyIdAsync.pending, (state) => {
        state.orderReLoading = true
      })
      .addCase(getUserAssignmentbyIdAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.getAssignmentID = action.payload
      })
      .addCase(getUserAssignmentbyIdAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(resubmitAssignmentById.pending, (state) => {
        state.orderReLoading = true
      })
      .addCase(resubmitAssignmentById.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.resubmitMessage = action.payload
      })
      .addCase(resubmitAssignmentById.rejected, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getBidAssignmentsAsync.pending, (state) => {
        state.orderReLoading = true
      })
      .addCase(getBidAssignmentsAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.getBidAssignmentsList = action.payload
      })
      .addCase(getBidAssignmentsAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getBidAssignmentsIdAsync.pending, (state) => {
        state.orderReLoading = true
      })
      .addCase(getBidAssignmentsIdAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.getAssignmentId = action.payload
      })
      .addCase(getBidAssignmentsIdAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.orderReLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(bidAssignTeacherAsync.pending, (state) => {
        state.assignbidloading = true
      })
      .addCase(bidAssignTeacherAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.assignbidloading = false
        state.bidAssignTeacher = action.payload
      })
      .addCase(bidAssignTeacherAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.assignbidloading = false
        state.error1 = 'invalid credential'
      })
  },
})

export default AssignmentListByIDSlice.reducer
export const {  clearAllState} = AssignmentListByIDSlice.actions
