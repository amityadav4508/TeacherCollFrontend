import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  chatUserListApi,
  postMessageListApi,
  getFindUserApi,
  postFirstMessageApi,
  getPDFbyIDApi,
  getRewardsApi,
} from '../authApi'

const initialState = {
  chatList: 'null',
  pdf: null,
  rewards: null,
  messageList: null,
  findUsers: null,
  postMessage: null,
  loading: false,
  status: 'idle',
  error: null,
  success: false,
}

export const chatUserList = createAsyncThunk('teacherlist/teacherData', async (data) => {
  const response = await chatUserListApi(data)

  return response.data
})

export const postMessageListAsync = createAsyncThunk('Messagelist/messageData', async (data) => {
  const response = await postMessageListApi(data)

  return response.data
})
export const getFindUserAsync = createAsyncThunk('Userlist/UserData', async (data) => {
  const response = await getFindUserApi(data)

  return response.data
})
export const postFirstMessageAsync = createAsyncThunk('firstlist/firstData', async (data) => {
  const response = await postFirstMessageApi(data)

  return response.data
})
export const getPDFByIDAsync = createAsyncThunk('pdflist/pdfData', async (data) => {
  const response = await getPDFbyIDApi(data)
  return response.data
})
export const getRewardsAsync = createAsyncThunk('rewardslist/rewardsData', async (data) => {
  const response = await getRewardsApi(data)
  return response.data
})

export const chatSlice = createSlice({
  name: 'chatList',
  initialState,
  reducers: {
    reset: initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatUserList.pending, (state) => {
        state.loading = true
      })
      .addCase(chatUserList.fulfilled, (state, action) => {
        state.status = 'idle'
        state.loading = false
        state.chatList = action.payload
      })
      .addCase(chatUserList.rejected, (state, action) => {
        state.status = 'idle'
        state.loading = false
        state.error = 'invalid request'
      })
      // Message List
      .addCase(postMessageListAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(postMessageListAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.messageList = action.payload
      })
      .addCase(postMessageListAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.error = 'invalid request'
      })
      // Find User
      .addCase(getFindUserAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(getFindUserAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.findUsers = action.payload
      })
      .addCase(getFindUserAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.error = 'invalid request'
      })
       // Post Message
       .addCase(postFirstMessageAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(postFirstMessageAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.postMessage = action.payload
      })
      .addCase(postFirstMessageAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.error = 'invalid request'
      })
       // PDF
       .addCase(getPDFByIDAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(getPDFByIDAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.pdf = action.payload
      })
      .addCase(getPDFByIDAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.error = 'invalid request'
      })
       // Rewards
       .addCase(getRewardsAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(getRewardsAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.rewards = action.payload
      })
      .addCase(getRewardsAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.error = 'invalid request'
      })
  },
})

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default chatSlice.reducer
