import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CheckoutPaymentApi, planCheckoutApi } from '../authApi'

const initialState = {
  checkoutdetails: 'null',
  checkoutpayment: 'null',
  status: null,
  checkplanloading: '',
  successMsg: null,
  errorMsg: null,
  }

export const getCheckoutPlansAsync = createAsyncThunk('checkoutStats/checkoutPlan', async (data) => {
  const response = await planCheckoutApi(data)
  return response?.data
})
export const CheckoutPaymentAsync = createAsyncThunk('checkoutpayment/proceed-pay', async (data) => {
  const response = await CheckoutPaymentApi(data)
  return response?.data
})


export const CheckoutPlanSlice = createSlice({
  name: 'checkoutStats',
  initialState,
  reducers: {
    reset: initialState,
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckoutPlansAsync.pending, (state) => {
        state.checkplanloading = true
      })
      .addCase(getCheckoutPlansAsync.fulfilled, (state, action) => {
        state.status = 200
        state.checkplanloading = false
        state.checkoutdetails = action.payload
      })
      .addCase(getCheckoutPlansAsync.rejected, (state, action) => {
        state.status = 500
        state.checkplanloading = false
        state.errorMsg = action.error.message
      })

      // Proceed-pay
      .addCase(CheckoutPaymentAsync.pending, (state) => {
        state.checkplanloading = true
      })
      .addCase(CheckoutPaymentAsync.fulfilled, (state, action) => {
        state.status = 200
        state.checkplanloading = false
        state.checkoutpayment = action.payload
      })
      .addCase(CheckoutPaymentAsync.rejected, (state, action) => {
        state.status = 500
        state.checkplanloading = false
        state.errorMsg = action.error.message
      })
  },
})

export default CheckoutPlanSlice.reducer
export const { clearAllState } = CheckoutPlanSlice.actions
