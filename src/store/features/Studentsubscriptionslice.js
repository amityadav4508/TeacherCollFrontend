import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getActiveStudentSubsciptionPlans, getContentListApi, getStudentContentApi, getStudentSubsciptionPlans,studentmanageSearchApi, studentmanageSingleSearchApi } from '../authApi'

const initialState = {
  status: 'idle',
  ContentlistStats: null,
  SubscriptionDataloading: '',
  error1: null,
  successMessage: null,
  getSubscriptionData: null,
  studentPlan:null
 
}

export const getSubscriptionDataAsync = createAsyncThunk('studentplans/StudentPaymentData', async (data) => {
  const response = await getStudentSubsciptionPlans(data)
  return response.data
})
export const getActiveSubscriptionDataAsync = createAsyncThunk('studentplansActive/StudentPaymentDataActive', async (data) => {
  const response = await getActiveStudentSubsciptionPlans(data)
  return response.data
})
export const getStudentManageSearchAsync = createAsyncThunk('searchActive/StudentActive', async (data) => {
  const Token=JSON.parse(localStorage.getItem('teacherAuth'))
  const response = await Token ? studentmanageSingleSearchApi(data): studentmanageSearchApi(data)
  return response
})
//getStudentContentAsync

export const getStudentContentAsync = createAsyncThunk('searchActive/studentContent', async (data) => {
  const response = await getStudentContentApi(data)
  return response
})

export const getContentListAsync = createAsyncThunk('ContentStats/ContentData', async (data) => {
  const response = await getContentListApi(data)
  return response.data
})

export const studentSubscriptionSlice = createSlice({
  name: 'StudentsubscriptionList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionDataAsync.pending, (state) => {
        state.SubscriptionDataloading = true
      })
      .addCase(getSubscriptionDataAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.SubscriptionDataloading = false
        state.getSubscriptionData = action.payload
      })
      .addCase(getSubscriptionDataAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.SubscriptionDataloading = false
        state.error1 = 'invalid credential'
      }) 
      .addCase(getActiveSubscriptionDataAsync.pending, (state) => {
        state.SubscriptionDataloading = true
      })
      .addCase(getActiveSubscriptionDataAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.SubscriptionDataloading = false
        state.getSubscriptionData = action.payload
      })
      .addCase(getActiveSubscriptionDataAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.SubscriptionDataloading = false
        state.error1 = 'invalid credential'
      })     
      // student plan preview
      .addCase(getStudentManageSearchAsync.pending, (state) => {
        state.SubscriptionDataloading = true
      })
      .addCase(getStudentManageSearchAsync.fulfilled, (state, action) => {
        state.status = 200
        state.SubscriptionDataloading = false
        state.studentPlan = action.payload
      })
      .addCase(getStudentManageSearchAsync.rejected, (state, action) => {
        state.status = 500
        state.SubscriptionDataloading = false
        state.error1 = 'invalid credential'
      })  
      .addCase(getStudentContentAsync.pending, (state) => {
        state.SubscriptionDataloading = true
      })
      .addCase(getStudentContentAsync.fulfilled, (state, action) => {
        state.status = 200
        state.SubscriptionDataloading = false
        state.studentContent = action.payload
      })
      .addCase(getStudentContentAsync.rejected, (state, action) => {
        state.status = 500
        state.SubscriptionDataloading = false
        state.error1 = 'invalid credential'
      })  
       // Content List
       .addCase(getContentListAsync.pending, (state) => {
        state.orderloading = true
      })
      .addCase(getContentListAsync.fulfilled, (state, action) => {
        state.status = 200
        state.orderloading = false
        state.ContentlistStats = action.payload
      })
      .addCase(getContentListAsync.rejected, (state, action) => {
        
        state.status = 500
        state.orderloading = false
        state.error1 = 'invalid credential'
      })
  },
})


export default studentSubscriptionSlice.reducer
