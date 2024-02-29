import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  addBiilingInfoapi,
  addNewContentapi,
  getSellerBillingInfoapi,
  getSellerContentListapi,
  getSellerDeleteContentapi,
  getSellerDetailsapi,
  sellAndEarnApi,
  sellerProfileUpdateApi,
  sellerUpdateAmountApi,
  verifyOtpasyncApi,
} from '../authApi'

const initialState = {
  verifyEmailsellerloading: true,
  sellerloading: null,
  verifyEmailMsg: null,
  success: null,
  verifyOtpMsg: null,
  getSellerDetails: null,
  getSellerBilling: null,
  getSellerContentList: null,
  getSellerDeleteMsg: null,
  sellerProfileUpdate: null,
  sellerContentUpdate: null,
}

export const sellAndEarnasync = createAsyncThunk('SellContent/sellandearn', async (data) => {
  const response = await sellAndEarnApi(data)
  return response.data
})
export const verifyOtpasync = createAsyncThunk('SellContent/verifyotp', async (data) => {
  const response = await verifyOtpasyncApi(data)
  return response.data
})
export const addBiilingInfoasync = createAsyncThunk('SellContent/billinginfo', async (data) => {
  const response = await addBiilingInfoapi(data)
  return response.data
})
export const addNewContentasync = createAsyncThunk(
  'SellContent/addContent',
  async (data, thunkApi) => {
    const response = await addNewContentapi(data)

    return response.data
  },
)
//v1/seller/profile
export const getSellerDetailsasync = createAsyncThunk('SellContent/sellerDetail', async (data) => {
  const response = await getSellerDetailsapi(data)
  return response.data
})

export const getSellerBillingInfoasync = createAsyncThunk(
  'SellContent/sellerBillingDetail',
  async (data) => {
    const response = await getSellerBillingInfoapi(data)
    return response.data
  },
)
export const getSellerContentListasync = createAsyncThunk(
  'SellContent/sellerContentList',
  async (data) => {
    const response = await getSellerContentListapi(data)
    return response.data
  },
)
export const getSellerDeleteContentasync = createAsyncThunk(
  'SellContent/sellerContentDelete',
  async (data, thunkApi) => {
    const response = await getSellerDeleteContentapi(data)
    thunkApi.dispatch(getSellerContentListasync())
    return response.data
  },
)

export const sellerProfileUpdateAsync = createAsyncThunk(
  'SellContent/sellerProfileUpdate',
  async (data, thunkApi) => {
    const response = await sellerProfileUpdateApi(data)
    return response.data
  },
)
export const sellerUpdateAmountAsync = createAsyncThunk(
  'SellContent/sellerContentUpdate',
  async (data, thunkApi) => {
    const response = await sellerUpdateAmountApi(data)
    thunkApi.dispatch(getSellerContentListasync())
    return response.data
  },
)

export const sellAndEarnSlice = createSlice({
  name: 'verifyEmail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sellAndEarnasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(sellAndEarnasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.verifyEmailMsg = action.payload
      })
      .addCase(sellAndEarnasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(verifyOtpasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(verifyOtpasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.verifyOtpMsg = action.payload
      })
      .addCase(verifyOtpasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(addBiilingInfoasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(addBiilingInfoasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.billingDetails = action.payload
      })
      .addCase(addBiilingInfoasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(addNewContentasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(addNewContentasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.addContent = action.payload
      })
      .addCase(addNewContentasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(getSellerDetailsasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(getSellerDetailsasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.getSellerDetails = action.payload
      })
      .addCase(getSellerDetailsasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(getSellerBillingInfoasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(getSellerBillingInfoasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.getSellerBilling = action.payload
      })
      .addCase(getSellerBillingInfoasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(getSellerContentListasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(getSellerContentListasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.getSellerContentList = action.payload
      })
      .addCase(getSellerContentListasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(getSellerDeleteContentasync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(getSellerDeleteContentasync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.getSellerDeleteMsg = action.payload
      })
      .addCase(getSellerDeleteContentasync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(sellerProfileUpdateAsync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(sellerProfileUpdateAsync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.sellerProfileUpdate = action.payload
      })
      .addCase(sellerProfileUpdateAsync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
      .addCase(sellerUpdateAmountAsync.pending, (state) => {
        state.sellerloading = true
      })
      .addCase(sellerUpdateAmountAsync.fulfilled, (state, action) => {
        state.success = true
        state.sellerloading = false
        state.sellerContentUpdate = action.payload
      })
      .addCase(sellerUpdateAmountAsync.rejected, (state, action) => {
        state.success = false
        state.sellerloading = false
      })
  },
})

export default sellAndEarnSlice.reducer
