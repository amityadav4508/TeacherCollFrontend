import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getNotifyApi, NotifyApi,TeacherNotificationApi } from '../authApi'

const initialState = {
  NotifyLoading: '',
  NotifyMsg: null,
  TeacherNotify : null,
  AdminNotification : null,
  success: null,
  status:null
}

export const NotifyAsync = createAsyncThunk('/notify', async (data) => {
  const response = await NotifyApi(data)
  return response
})

export const TeacherNotifyAsync = createAsyncThunk('/teachernotify', async (data) => {
  const response = await TeacherNotificationApi(data)
  return response.data
})

// export const adminNotifyAsync = createAsyncThunk('/adminnotify', async (data) => {
//   const response = await adminNotificationApi(data)
//   return response
// })

export const getNotifyAsync = createAsyncThunk('/getnotify', async (data) => {
  const response = await getNotifyApi(data)
  return response.data
})

export const NotifySlice = createSlice({
  name: 'Notify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(NotifyAsync.pending, (state) => {
        state.NotifyLoading = true
      })
      .addCase(NotifyAsync.fulfilled, (state, action) => {
        state.success = true
        state.NotifyLoading = false
        state.NotifyMsg = action.payload
      })
      .addCase(NotifyAsync.rejected, (state, action) => {
        state.success = false
        state.NotifyLoading = false
        state.NotifyMsg = 'Invalid Token'
      })

      // Teacher Notification
      .addCase(TeacherNotifyAsync.pending, (state) => {
        state.NotifyLoading = true
      })
      .addCase(TeacherNotifyAsync.fulfilled, (state, action) => {
        state.success = true
        state.NotifyLoading = false
        state.TeacherNotify = action.payload
      })
      .addCase(TeacherNotifyAsync.rejected, (state, action) => {
        if(action.error.message==401){
          state.userloading = false;
          state.error1="unauthorised"
          state.status = 401;
        }else{
          state.status = 500;
          state.userloading = false;
          state.error1 = "invalid credential";
        }
      })

      // Admin Notification
      // .addCase(adminNotifyAsync.pending, (state) => {
      //   state.NotifyLoading = true
      // })
      // .addCase(adminNotifyAsync.fulfilled, (state, action) => {
      //   state.success = true
      //   state.NotifyLoading = false
      //   state.AdminNotification = action.payload
      // })
      // .addCase(adminNotifyAsync.rejected, (state, action) => {
      //   if(action.error.message==401){
      //     state.userloading = false;
      //     state.error1="unauthorised"
      //     state.status = 401;
      //   }else{
      //     state.status = 500;
      //     state.userloading = false;
      //     state.error1 = "invalid credential";
      //   }
      // })
      // get Notification

      .addCase(getNotifyAsync.pending, (state) => {
        state.NotifyLoading = true
      })
      .addCase(getNotifyAsync.fulfilled, (state, action) => {
        state.success = true
        state.NotifyLoading = false
        state.NotifyMsg = action.payload
      })
      .addCase(getNotifyAsync.rejected, (state, action) => {
        state.success = false
        state.NotifyLoading = false
        state.NotifyMsg = 'Invalid Token'
      })
  },
})

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default NotifySlice.reducer
