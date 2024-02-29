import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  StudentOrderListApi,
  StudentAssignmentApi,
  postSosInfoApi,
  postbulkQuestionAnswerApi,
  getbulkQuestionAnswerApi,
  postQuestionAnswerApi,
  editQuestionAnswerApi,
  getQuestionAnswerByIdApi,
  deleteQAapi,
  getStudentAssignmentRatingApi,
} from '../authApi'

const initialState = {
  StudentorderStats: null,
  Studentassignments: null,
  getBulkQuestionAnswer: null,
  bulkQuestionAnswer: null,
  sosInfo: null,
  status: null,
  orderloading: '',
  successMsg: null,
  errorMsg: null,
  editQandA: '',
  singleEditQandA: null,
  deleteStatus:null
}

export const getStudentOrderListAsync = createAsyncThunk('OrderStats/orderData', async (data) => {
  const response = await StudentOrderListApi(data)
  return response.data
})

export const getStudentAssignmentListAsync = createAsyncThunk(
  'AssignmentStats/assignmentData',
  async (data) => {
    const response = await StudentAssignmentApi(data)
    return response.data
  },
)

export const postSosInfoAsync = createAsyncThunk('SosStats/SosData', async (data) => {
  const response = await postSosInfoApi(data)
  return response.data
})

export const postBulkQuestionAsync = createAsyncThunk('BulkQ/AStats/BulkData', async (data) => {
  const response = await postbulkQuestionAnswerApi(data)
  return response.data
})

export const postQuestionAnswerAsync = createAsyncThunk('postquestion/BulkData', async (data) => {
  const response = await postQuestionAnswerApi(data)
  return response.data
})


export const getStudentAssignmentRatingAsync = createAsyncThunk(
  'getStudentAssignmentRatingAsync/assignmentData',
  async (data) => {
    const response = await getStudentAssignmentRatingApi(data)
    return response.data
  },
)

export const getQuestionAnswerByIdAsync = createAsyncThunk(
  'editQuestionbyid/BulkData',
  async (data) => {
    const response = await getQuestionAnswerByIdApi(data ? data : '')
    return response.data
  },
)

//editQuestionAnswerAsync
export const editQuestionAnswerAsync = createAsyncThunk(
  'editQuestionanswer/BulkData',
  async (data) => {
    const response = await editQuestionAnswerApi(data)
    return response.data
  },
)

export const getBulkQuestionAsync = createAsyncThunk('getBulkQA/getBulkData', async (data) => {
  const response = await getbulkQuestionAnswerApi(data)
  return response.data
})

export const deleteQAasync = createAsyncThunk('delete/getBulkData', async (data) => {
  const response = await deleteQAapi(data)
  return response.data
})


export const OrderStatsSlice = createSlice({
  name: 'OrderStats',
  initialState,
  reducers: {
    reset: initialState,

    clearAllStates: (state) => {
      state.status = null
      state.errorMsg = null
      state.Studentassignments = null
      state.singleEditQandA = null
      state.editQandA=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentOrderListAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(getStudentOrderListAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.StudentorderStats = action.payload
      })
      .addCase(getStudentOrderListAsync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(deleteQAasync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(deleteQAasync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.deleteStatus = action.payload
      })
      .addCase(deleteQAasync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
    // Student assignment
    builder
      .addCase(getStudentAssignmentListAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(getStudentAssignmentListAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.Studentassignments = action.payload
      })
      .addCase(getStudentAssignmentListAsync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
    // SOS Info
    builder
      .addCase(postSosInfoAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(postSosInfoAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.sosInfo = action.payload
      })
      .addCase(postSosInfoAsync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
    // getBulk Question Answers
    builder
      .addCase(getBulkQuestionAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(getBulkQuestionAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.getBulkQuestionAnswer = action.payload
      })
      .addCase(getBulkQuestionAsync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
    // post bulk Question Answers
    builder
      .addCase(postBulkQuestionAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(postBulkQuestionAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.bulkQuestionAnswer = action.payload
      })
      .addCase(postBulkQuestionAsync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(editQuestionAnswerAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(editQuestionAnswerAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.editQandA = action.payload
      })
      .addCase(editQuestionAnswerAsync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getQuestionAnswerByIdAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(getQuestionAnswerByIdAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.singleEditQandA = action.payload
      })
      .addCase(getQuestionAnswerByIdAsync.rejected, (state, action) => {
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
  },
})

export default OrderStatsSlice.reducer
export const { clearAllStates } = OrderStatsSlice.actions
