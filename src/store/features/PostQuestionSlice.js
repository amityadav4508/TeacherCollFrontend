import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { freeAsistanceApi, postQuestionApi, refferAFriendApi } from '../authApi'

const initialState = {
  status: null,
  postData: null,
  loading: false,
  successMsg: null,
  errorMsg: null,
  refferalData: null,
  referState: null,
  serviceCheck: null,
  getstartedcheck:null,
  triggerQuestion:null,
  freeAssist:null,
  Assistanceloading:null
}
//
export const postQuestionAsync = createAsyncThunk('user/changePassUser', async (data, thunkApi) => {
  const response = await postQuestionApi(data)
  return response
})
export const freeAsistanceAsync = createAsyncThunk('user/asist', async (data, thunkApi) => {
  const response = await freeAsistanceApi(data)
  return response
})

export const refferAFriendAsync = createAsyncThunk('user/refferal', async (data) => {
  const response = await refferAFriendApi(data)
  return response
})
export const addReferAsync = createAsyncThunk('user/referState', async (data) => {
  return data
})
export const serviceCheckAsync = createAsyncThunk('user/serviceCheck', async (data) => {
  return data
})
export const getStarted = createAsyncThunk('user/getStuck', async (data) => {
  return data
})
export const triggerPostQuestion = createAsyncThunk('user/TriggerPostQuestion', async (data) => {
  return data
})

export const postQuestionSlice = createSlice({
  name: 'TeacherSettings',
  initialState,
  reducers: {
    clearAllStateQuestion: (state) => {
      state.status = null
      state.loading = false
      state.successMsg = null
      state.errorMsg = null
      state.referState= null
      state.serviceCheck= null
      state.getstartedcheck=null
      state.triggerQuestion=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postQuestionAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(postQuestionAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.successMsg = action.payload.data.data
        state.postData = action.payload
      })
      .addCase(postQuestionAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.errorMsg = ''
      })
      .addCase(refferAFriendAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(refferAFriendAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.refferalData = action.payload
      })
      .addCase(refferAFriendAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.errorMsg = ''
      })
      .addCase(addReferAsync.fulfilled, (state, action) => {
        state.referState = action.payload
      })
      //serviceCheckAsync
      .addCase(serviceCheckAsync.fulfilled, (state, action) => {
        state.serviceCheck = action.payload
      })
      .addCase(getStarted.fulfilled, (state, action) => {
        state.getstartedcheck = action.payload
      })
      .addCase(triggerPostQuestion.fulfilled, (state, action) => {
        state.triggerQuestion = action.payload
      })
      
      .addCase(freeAsistanceAsync.pending, (state) => {
        state.Assistanceloading = true
      })
      .addCase(freeAsistanceAsync.fulfilled, (state, action) => {
        state.status = 200
        state.Assistanceloading = false
        state.freeAssist = action.payload
      })
      .addCase(freeAsistanceAsync.rejected, (state, action) => {
        state.status = 500
        state.Assistanceloading = false
        state.errorMsg = ''
      })
  },
})

export default postQuestionSlice.reducer
export const { clearAllStateQuestion } = postQuestionSlice.actions
