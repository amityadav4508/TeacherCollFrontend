import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  addNewsLetterApi,
  deleteNewsLetterApi,
  editNewsLetterApi,
  getNewsLetterApi,
  getNewsLetterDetailApi,
} from '../authApi'

const initialState = {
  newsLoading: false,
  newsData: null,
  postNewsData: null,
  deleteNewsData: null,
  success: null,
  status: null,
  successMsg: null,
  errorMsg: null,
}

export const getNewsLetterAsync = createAsyncThunk('/getNewsLetter', async (data) => {
  const response = await getNewsLetterApi(data)
  return response.data
})

export const addNewsLetterAsync = createAsyncThunk('/addNewsLetter', async (data) => {
  const response = await addNewsLetterApi(data)
  return response
})
export const getNewsLetterDetailAsync = createAsyncThunk('/getNewsLetterDetail', async (data) => {
  const response = await getNewsLetterDetailApi(data)
  return response
})
//editNewsLetterApi
export const editNewsLetterAsync = createAsyncThunk('/editNewsLetterDetail', async (data) => {
  const response = await editNewsLetterApi(data)
  return response
})
// delete newsletter
export const deleteNewsLetterAsync = createAsyncThunk('/deleteNewsLetterDetail', async (id) => {
  const response = await deleteNewsLetterApi(id)
  return response
})

export const NewsLetterSlice = createSlice({
  name: 'newsLetter',
  initialState,
  reducers: {
    reset: initialState,
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
      state.postNewsData = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNewsLetterAsync.pending, (state) => {
        state.newsLoading = true
      })
      .addCase(getNewsLetterAsync.fulfilled, (state, action) => {
        state.success = true
        state.newsLoading = false
        state.newsData = action.payload
      })
      .addCase(getNewsLetterAsync.rejected, (state, action) => {
        state.success = false
        state.newsLoading = false
        state.verifyEmailMsg = 'Invalid Token'
      })
      .addCase(addNewsLetterAsync.pending, (state) => {
        
        state.newsLoading = true
      })
      .addCase(addNewsLetterAsync.fulfilled, (state, action) => {
        state.success = true
        state.newsLoading = false
        state.postNewsData = action.payload
      })
      .addCase(addNewsLetterAsync.rejected, (state, action) => {
        state.success = false
        state.newsLoading = false
        state.verifyEmailMsg = 'Invalid Token'
      })
      .addCase(getNewsLetterDetailAsync.pending, (state) => {
        state.newsLoading = true
      })
      .addCase(getNewsLetterDetailAsync.fulfilled, (state, action) => {
        state.success = true
        state.newsLoading = false
        state.newsData = action.payload
      })
      .addCase(getNewsLetterDetailAsync.rejected, (state, action) => {
        state.success = false
        state.newsLoading = false
        state.verifyEmailMsg = 'Invalid Token'
      })
      //editNewsLetterAsync
      .addCase(editNewsLetterAsync.pending, (state) => {
        state.newsLoading = true
      })
      .addCase(editNewsLetterAsync.fulfilled, (state, action) => {
        state.success = true
        state.newsLoading = false
        state.newsData = action.payload
      })
      .addCase(editNewsLetterAsync.rejected, (state, action) => {
        state.success = false
        state.newsLoading = false
        state.verifyEmailMsg = 'Invalid Token'
      })
      //delete newsletter
      .addCase(deleteNewsLetterAsync.pending, (state) => {
        state.newsLoading = true
      })
      .addCase(deleteNewsLetterAsync.fulfilled, (state, action) => {
        state.success = true
        state.newsLoading = false
        state.deleteNewsData = action.payload
      })
      .addCase(deleteNewsLetterAsync.rejected, (state, action) => {
        state.success = false
        state.newsLoading = false
        state.verifyEmailMsg = 'Invalid Token'
      })
  },
})

export default NewsLetterSlice.reducer
export const { clearAllState } = NewsLetterSlice.actions
