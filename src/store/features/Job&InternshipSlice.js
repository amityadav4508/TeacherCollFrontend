import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getJobApi, getJobstatsIdApi,getHeaderCarrerApi,postApplyCarrerApi,getArticleByIDApi,getSingleIDJobApi, postJobApi, postJobEditApi,postJobInternshipStatusApi } from '../authApi'

const initialState = {
  getJobStats: null,
  getSingleIdJobs:null,
  applyForCarrer:null,
  getHeaderCarrer:null,
  postJobs:null,
  JobsInternshipStatus:null,
  status: null,
  signErr: null,
  jobLoading: '',
  successMsg: null,
  errorMsg: null,
  getJobStatsByid:null,
  postJobsEdit:null,
  articleById:null,
  careerLoading:null,
  applyCarrerErr:null,
  applyCarrerstatus:null
 
}

export const getJobsStatsAsync = createAsyncThunk('JobStats/JobData', async (data) => {
  const response = await getJobApi(data)
  return response.data
})
export const getJobsStatsByIdAsync = createAsyncThunk('JobStatsById/JobData', async (data) => {
  const response = await getJobstatsIdApi(data)
  return response.data
})
export const getSingleJobsStatsAsync = createAsyncThunk('SingleJobStats/SingleJobData', async () => {
    const response = await getSingleIDJobApi()
    return response.data
  })
  export const postJobsStatsAsync = createAsyncThunk('PostJobStats/PostJobData', async (data) => {
    const response = await postJobApi(data)
    return response.data
  })
  //postJobsStatsEditAsync
  export const postJobsStatsEditAsync = createAsyncThunk('PostJobsStatsEditAsync/PostJobData', async (data) => {
    const response = await postJobEditApi(data)

    return response.data
  })
  export const postJobsInternshipStatusAsync = createAsyncThunk('PostJobsStatsInternshipStatus/PostInternshipStatusData', async (data) => {
    const response = await postJobInternshipStatusApi(data)
    return response.data
  })
  export const postApplyForCarrerAsync = createAsyncThunk('PostcarrerStatus/PostcarrerData', async (data) => {
    const response = await postApplyCarrerApi(data)
    return response.data
  })
  export const getHeaderCarrerAsync = createAsyncThunk('PostHeadercarrerStatus/PostHeadercarrerData', async (data) => {
    const response = await getHeaderCarrerApi(data)
    return response.data
  })
  export const getArticleByIDAsync = createAsyncThunk('HeaderArticleStatus/HeaderArticleData', async (data) => {
    const response = await getArticleByIDApi(data)
    return response.data
  })

export const JobStatsSlice = createSlice({
  name: 'JobStats',
  initialState,
  reducers: {
    reset: initialState,
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
      state.applyCarrerstatus=null
      state.applyCarrerErr=null
      state.postJobs=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobsStatsAsync.pending, (state) => {
        state.jobLoading = true
      })
      .addCase(getJobsStatsAsync.fulfilled, (state, action) => {
        state.status = 200
        state.jobLoading = false
        state.getJobStatsByid = action.payload
        state.getJobStats=action.payload
      })
      .addCase(getJobsStatsAsync.rejected, (state, action) => {
        
        state.status = 500
        state.jobLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getJobsStatsByIdAsync.pending, (state) => {
        state.jobLoading = true
      })
      .addCase(getJobsStatsByIdAsync.fulfilled, (state, action) => {
        state.status = 200
        state.jobLoading = false
        state.getJobStatsByid = action.payload
    
      })
      .addCase(getJobsStatsByIdAsync.rejected, (state, action) => {
        
        state.status = 500
        state.jobLoading = false
        state.error1 = 'invalid credential'
      })
      
      // GetSinglejob
      .addCase(getSingleJobsStatsAsync.pending, (state) => {
        state.jobLoading = true
      })
      .addCase(getSingleJobsStatsAsync.fulfilled, (state, action) => {
        state.status = 200
        state.jobLoading = false
        state.getSingleIdJobs = action.payload
      })
      .addCase(getSingleJobsStatsAsync.rejected, (state, action) => {
        state.status = 500
        state.jobLoading = false
        state.error1 = 'invalid credential'
      })
      // post Jobs
      .addCase(postJobsStatsAsync.pending, (state) => {
        state.jobLoading = true
      })
      .addCase(postJobsStatsAsync.fulfilled, (state, action) => {
        state.status = 200
        state.jobLoading = false
        state.postJobs = action.payload
      })
      .addCase(postJobsStatsAsync.rejected, (state, action) => {
        state.status = 500
        state.jobLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(postJobsStatsEditAsync.pending, (state) => {
        state.jobLoading = true
      })
      .addCase(postJobsStatsEditAsync.fulfilled, (state, action) => {
        state.status = 200
        state.jobLoading = false
        state.postJobsEdit = action.payload
      })
      .addCase(postJobsStatsEditAsync.rejected, (state, action) => {
        state.status = 500
        state.jobLoading = false
        state.error1 = 'invalid credential'
      })
      //Post JOb status
      .addCase(postJobsInternshipStatusAsync.pending, (state) => {
        state.jobLoading = true
      })
      .addCase(postJobsInternshipStatusAsync.fulfilled, (state, action) => {
        state.status = 200
        state.jobLoading = false
        state.JobsInternshipStatus = action.payload
      })
      .addCase(postJobsInternshipStatusAsync.rejected, (state, action) => {
        state.status = 500
        state.jobLoading = false
        state.error1 = 'invalid credential'
      })
       //Post Carrer Api
       .addCase(postApplyForCarrerAsync.pending, (state) => {
        state.jobLoading = true
      })
      .addCase(postApplyForCarrerAsync.fulfilled, (state, action) => {
        state.applyCarrerstatus = 200
        state.jobLoading = false
      })
      .addCase(postApplyForCarrerAsync.rejected, (state, action) => {
        state.applyCarrerstatus = 500
        state.jobLoading = false
        state.applyCarrerErr = 'Something went wrong'
      })
       //Post Header Article Api
       .addCase(getHeaderCarrerAsync.pending, (state) => {
        state.careerLoading = true
      })
      .addCase(getHeaderCarrerAsync.fulfilled, (state, action) => {
        state.status = 200
        state.careerLoading = false
        state.getHeaderCarrer = action.payload
      })
      .addCase(getHeaderCarrerAsync.rejected, (state, action) => {
        state.status = 500
        state.careerLoading = false
        state.error1 = 'invalid credential'
      })
      //  ArticleByID Api
       .addCase(getArticleByIDAsync.pending, (state) => {
        state.careerLoading = true
      })
      .addCase(getArticleByIDAsync.fulfilled, (state, action) => {
        state.status = 200
        state.careerLoading = false
        state.articleById = action.payload
      })
      .addCase(getArticleByIDAsync.rejected, (state, action) => {
        state.status = 500
        state.careerLoading = false
        state.error1 = 'invalid credential'
      })
  },
})

export default JobStatsSlice.reducer
export const {clearAllState} = JobStatsSlice.actions
