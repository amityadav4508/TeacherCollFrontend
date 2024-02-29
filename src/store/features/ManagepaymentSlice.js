import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ManagePaymentApi,singlePaymentOrder } from '../authApi'

const initialState = {
  getPayment: 'null',
  getPaymentInfo:'null',
  status: 'idle',
  signErr: null,
  emailData: null,
  loading: '',
  success: false,
}

export const managePaymentAsync = createAsyncThunk('paymentList/paymentData', async (data) => {
  const response = await ManagePaymentApi(data)
  return response.data
})

export const PaymentInfoAsync = createAsyncThunk('paymentList/paymentinfo', async (data) => {
  const response = await singlePaymentOrder(data)
  return response
})

export const managePaymentSlice = createSlice({
  name: 'paymentList',
  initialState,
  reducers: {
    reset: initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(managePaymentAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(managePaymentAsync.fulfilled, (state, action) => {
        state.status = '200'
        state.loading = false
        state.getPayment = action.payload
      })
      .addCase(managePaymentAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.loading = false
        state.error1 = 'invalid credential'
      })
      // Paymentinfo
      .addCase(PaymentInfoAsync.pending, (state) => {
        state.loading = true
      })
      .addCase(PaymentInfoAsync.fulfilled, (state, action) => {
        state.status = '200'
        state.loading = false
        state.getPaymentInfo = action.payload
      })
      .addCase(PaymentInfoAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.loading = false
        state.error1 = 'invalid credential'
      })
  },
})

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default managePaymentSlice.reducer
