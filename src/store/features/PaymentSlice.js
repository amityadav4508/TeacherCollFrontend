import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GetPaymentApi, getCurrencyApi, manageCurrencyApi, manageEditPaymentApi, paymentMessageApi } from '../authApi'

const initialState = {
  status: 'idle',
  paymentloading: '',
  error1: null,
  successMessage: null,
  paymentData: null,
  getPaymentData: null,
  editPaymentData: null,
  currencyResponse:null,
  currencydata:null,
  paymentMessageRes:null
}

export const getPaymentAsync = createAsyncThunk('paymentList/AdminPaymentData', async (data) => {
  const response = await GetPaymentApi(data)
  return response.data
})
export const manageEditPaymentAsync = createAsyncThunk('editPaymentList/EditPaymentData',async (data) => {
    const response = await manageEditPaymentApi(data)
    return response
  },
)
export const manageCurrency = createAsyncThunk('editPaymentList/ChangeCurrency',async (data) => {
  const response = await manageCurrencyApi(data)
  return response.data
},
)

export const getCurrency = createAsyncThunk('editPaymentList/getCurrency',async (data) => {
  const response = await getCurrencyApi(data)
  return response.data
},
)
//paymentMessage

export const paymentMessage = createAsyncThunk('Payment/paymentMessage',async (data) => {
  const response = await paymentMessageApi(data)
  return response.data
},
)

export const adminPaymentSlice = createSlice({
  name: 'adminList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentAsync.pending, (state) => {
        state.paymentloading = true
      })
      .addCase(getPaymentAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.getPaymentData = action.payload
      })
      .addCase(getPaymentAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(manageEditPaymentAsync.pending, (state) => {
        state.paymentloading = true
      })
      .addCase(manageEditPaymentAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.editPaymentData = action.payload
      })
      .addCase(manageEditPaymentAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(manageCurrency.pending, (state) => {
        state.paymentloading = true
      })
      .addCase(manageCurrency.fulfilled, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.currencyResponse = action.payload
      })
      .addCase(manageCurrency.rejected, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getCurrency.pending, (state) => {
        state.paymentloading = true
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.currencydata = action.payload
      })
      .addCase(getCurrency.rejected, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.error1 = 'invalid credential'
      })
      .addCase(paymentMessage.pending, (state) => {
        state.paymentloading = true
      })
      .addCase(paymentMessage.fulfilled, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.paymentMessageRes = action.payload
      })
      .addCase(paymentMessage.rejected, (state, action) => {
        state.status = 'idle'
        state.paymentloading = false
        state.error1 = 'invalid credential'
      })
  },
})


export default adminPaymentSlice.reducer
