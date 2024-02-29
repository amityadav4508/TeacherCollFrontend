import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAssignmentbyIdApi, resubmitAssignmentbyIdApi, teacherManageAnswersApi, teacherManageOrderApi,getAnswerByIDApi } from '../authApi'

const initialState = {
  getTeacherManageAssignment: 'null',
  status: null,
  Assignmentloading: '',
  successMsg: null,
  error1: null,
  getAssignmentsbyId: null,
  answeredAssignment: 'null',
  resubmitAssignmentmessage:null,
  getAssignmentAnswerByID : null
}

export const getTeacherManageOrderAsync = createAsyncThunk(
  'TeacherassignmentStats/assignmentData',
  async (data) => {
    const response = await teacherManageOrderApi(data)
    return response.data
  },
)
export const getAssignmentbyIdAsync = createAsyncThunk(
  'getAssignmentbyId/assignmentData',
  async (data) => {
    const response = await getAssignmentbyIdApi(data)
    return response.data
  },
)

export const resubmitAssignmentbyIdAsync = createAsyncThunk(
  'resubmitAssignmentbyId/assignmentData',
  async (data) => {
    const response = await resubmitAssignmentbyIdApi(data)
    return response.data
  },
)

export const getAnsweredAssignmentAsync = createAsyncThunk('getansweredAssignment/answeredData',async (data) => {
    const response = await teacherManageAnswersApi(data)
    return response.data
  },
)

export const getAnswerbyIdAsync = createAsyncThunk(
  'answerbyId/answerData',
  async (data) => {
    const response = await getAnswerByIDApi(data)
    return response.data
  },
)

export const TeacherManageOrderSlice = createSlice({
  name: 'TeacherassignmentStats',
  initialState,
  reducers: {
    reset: initialState,
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.error1 = null
      state.getAssignmentsbyId = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeacherManageOrderAsync.pending, (state) => {
        state.Assignmentloading = true
      })
      .addCase(getTeacherManageOrderAsync.fulfilled, (state, action) => {
        state.status = 200
        state.Assignmentloading = false
        state.getTeacherManageAssignment = action.payload
      })
      .addCase(getTeacherManageOrderAsync.rejected, (state, action) => {
        state.status = 500
        state.Assignmentloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getAssignmentbyIdAsync.pending, (state) => {
        state.Assignmentloading = true
      })
      .addCase(getAssignmentbyIdAsync.fulfilled, (state, action) => {
        state.status = 200
        state.Assignmentloading = false
        state.successMsg = action.payload
        state.getAssignmentsbyId = action.payload
      })
      .addCase(getAssignmentbyIdAsync.rejected, (state, action) => {
        state.status = 500
        state.Assignmentloading = false
        state.error1 = action
      })

      //resubmitAssignmentbyIdAsync

      .addCase(resubmitAssignmentbyIdAsync.pending, (state) => {
        state.Assignmentloading = true
      })
      .addCase(resubmitAssignmentbyIdAsync.fulfilled, (state, action) => {
        state.status = 200
        state.Assignmentloading = false
        state.resubmitAssignmentmessage = action.payload
      })
      .addCase(resubmitAssignmentbyIdAsync.rejected, (state, action) => {
        state.status = 500
        state.Assignmentloading = false
        state.error1 = action
      })
      //Answered Assignment
      .addCase(getAnsweredAssignmentAsync.pending, (state) => {
        state.Assignmentloading = true
      })
      .addCase(getAnsweredAssignmentAsync.fulfilled, (state, action) => {
        state.status = 200
        state.Assignmentloading = false
        state.answeredAssignment = action.payload
      })
      .addCase(getAnsweredAssignmentAsync.rejected, (state, action) => {
        state.status = 500
        state.Assignmentloading = false
        state.error1 = action
      })

       //Answered by ID Assignment
       .addCase(getAnswerbyIdAsync.pending, (state) => {
        state.Assignmentloading = true
      })
      .addCase(getAnswerbyIdAsync.fulfilled, (state, action) => {
        state.status = 200
        state.Assignmentloading = false
        state.getAssignmentAnswerByID = action.payload
      })
      .addCase(getAnswerbyIdAsync.rejected, (state, action) => {
        state.status = 500
        state.Assignmentloading = false
        state.error1 = action
      })
  },
})

export default TeacherManageOrderSlice.reducer
export const { clearAllState } = TeacherManageOrderSlice.actions
