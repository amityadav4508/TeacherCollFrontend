import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  accountBillingApi,
  fbCheckApi,
  getAccountBillingApi,
  linkedinloginApi,
  loginApi,
  // registerApi,
  registerSocialApi,
  sellerLoginApi,
  sellerRegisterApi,
  teacherLoginApi,
  teacherRegisterApi,
  linkedinEmailApi
} from '../authApi'

const initialState = {
  user: null,
  UserRegister: null,
  status: null,
  signErr: null,
  emailData: null,
  loading: false,
  successMessage: null,
  successMsg: null,
  errorMsg: null,
  Teacher: null,
  TeacherProfilePending: false,
  TeacherRegisters: null,
  CheckType: null,
  billing: null,
  socialLogin: null,
  checkEmail: null,
  fbstatus: null,
  fbResponseData: null,
  sellerLogin:null,
  sellerRegister:null,
  emailLinkedin:null
}

export const loginAsync = createAsyncThunk('auth/login', async (data) => {
  const response = await loginApi(data)
  return response.data
})
export const teacherLoginAsync = createAsyncThunk('teacherAuth/login', async (data) => {
  const response = await teacherLoginApi(data)
  return response.data
})

export const teacherRegisterAsync = createAsyncThunk('teacherAuth/register', async (data) => {
  const response = await teacherRegisterApi(data)
  return response.data
})
export const billingAsync = createAsyncThunk('teacherAuth/billing', async (data) => {
  const response = await accountBillingApi(data)
  return response.data
})
export const getBillingAsync = createAsyncThunk('teacherAuth/getbilling', async (data) => {
  const response = await getAccountBillingApi(data)
  return response.data
})
//registerSocial
export const registerSocial = createAsyncThunk('teacherAuth/social', async (data) => {
  const response = await registerSocialApi(data)
  return response.data
})
export const fbCheckAsync = createAsyncThunk('fbCheck/social', async (data) => {
  const response = await fbCheckApi(data)
  return response.data
})

export const sellerLoginAsync = createAsyncThunk('seller/login', async (data) => {
  const response = await sellerLoginApi(data)
  return response.data
})

export const sellerRegisterAsync = createAsyncThunk('seller/register', async (data) => {
  const response = await sellerRegisterApi(data)
  return response.data
})
export const linkedinloginAsync = createAsyncThunk('seller/linkedinlogin', async (data) => {
  const response = await linkedinloginApi(data)
  return response.data
})
//linkedinemail get
export const linkedinEmail= createAsyncThunk('linkedin/email', async(data)=>{
  const response = await linkedinEmailApi(data)
  return response.data
}) 


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.forgetPassword = null
      state.sendOtp = null
      state.status = 'idle'
    },
    teacherProfileStatus: (state, action) => {
      state.TeacherProfilePending = action.payload
    },
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
      state.fbstatus = null
      state.sellerRegister=null
    },
    fbResponse: (state,action) => {
      state.fbResponseData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true
        state.status = 'idle'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = '200'
        state.loading = false
        state.user = action.payload
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.loading = false
        state.error1 = 'invalid credential'
      })

     
      .addCase(teacherLoginAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(teacherLoginAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false

        if (
          action.payload.data?.profile_status == 'pending' ||
          action.payload.data?.profile_status == 'rejected'
        ) {
          state.Teacher = action?.payload
          state.TeacherProfilePending = true
        } else {
          state.Teacher = action?.payload
        }
      })
      .addCase(teacherLoginAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.errorMsg = action.error.message
      })

      .addCase(teacherRegisterAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(teacherRegisterAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.successMsg = 'Please verify your account through email'
      })
      .addCase(teacherRegisterAsync.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.errorMsg = action.error.message ? action.error.message : 'invalid Request'
      })
      .addCase(billingAsync.pending, (state) => {
        state.loading = true
        state.status = 'idle'
      })
      .addCase(billingAsync.fulfilled, (state, action) => {
        state.status = '200'
        state.loading = false
        state.billing = action.payload
      })
      .addCase(billingAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.loading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getBillingAsync.pending, (state) => {
        state.loading = true
        state.status = 'idle'
      })
      .addCase(getBillingAsync.fulfilled, (state, action) => {
        state.status = '200'
        state.loading = false
        state.billing = action.payload
      })
      .addCase(getBillingAsync.rejected, (state, action) => {
        if (action.error.message == 401) {
          state.userloading = false
          state.error1 = 'unauthorised'
          state.status = 401
        } else {
          state.status = 500
          state.userloading = false
          state.error1 = 'invalid credential'
        }
      })
      .addCase(registerSocial.pending, (state) => {
        state.loading = true
        state.status = 'idle'
      })
      .addCase(registerSocial.fulfilled, (state, action) => {
        state.status = '200'
        state.loading = false
        state.socialLogin = action.payload
      })
      .addCase(registerSocial.rejected, (state, action) => {
        state.status = 500
        state.loading = false
        state.errorMsg = action.error.message
      })
      .addCase(fbCheckAsync.pending, (state) => {
        state.loading = true
        state.status = 'idle'
      })
      .addCase(fbCheckAsync.fulfilled, (state, action) => {
        state.fbstatus = 200
        state.loading = false
        state.checkEmail = action.payload
      })
      .addCase(fbCheckAsync.rejected, (state, action) => {
        state.loading = false
        state.fbstatus = 500
        // state.errorMsg = action.error.message
      })
      .addCase(sellerLoginAsync.pending, (state) => {
        state.loading = true
        state.status = 'idle'
      })
      .addCase(sellerLoginAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.sellerLogin = action.payload
      })
      .addCase(sellerLoginAsync.rejected, (state, action) => {
        state.loading = false
        state.status = 500
      })
      //sellerRegisterAsync
      .addCase(sellerRegisterAsync.pending, (state) => {
        state.loading = true
        state.status = 'idle'
      })
      .addCase(sellerRegisterAsync.fulfilled, (state, action) => {
        state.status = 200
        state.loading = false
        state.sellerRegister = action.payload
      })
      .addCase(sellerRegisterAsync.rejected, (state, action) => {
        state.loading = false
        state.status = 500
      })

      //linkedinemail get
      .addCase(linkedinEmail.pending, (state)=>{
        state.loading=true
        state.status='idle'
      })
      .addCase(linkedinEmail.fulfilled,(state, action)=>{
        state.status = 200
        state.loading = false
        state.emailLinkedin = action.payload
      })
      .addCase(linkedinEmail.rejected,(state)=>{
        state.loading = false
        state.status = 500
      })

  },
})

// export const selectAuthForgetPassword = (state) => state.auth;
export const userLogin = (state) => state.auth.user1

export default authSlice.reducer
export const { teacherProfileStatus, logout, clearAllState,fbResponse } = authSlice.actions
