import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { sosEmaiApi, getCarrerApi, getCarrerByIDApi ,getWalletApi, CopyrightApi} from '../authApi'

const initialState = {
  successMessage: null,
  getCarrer: null,
  getCarrerByID: null,
  orderList: null,
  sosStatus: null,
  sosloading: null,
  sosStats: null,
  wallet:null,
  copyright:null
}

export const sosEmailSliceAsync = createAsyncThunk('TeacherStats/statsData', async () => {
  const response = await sosEmaiApi()
  return response
})

export const getCarrerAsync = createAsyncThunk('CarrerStats/carrerData', async (data) => {
  const response = await getCarrerApi(data)
  return response.data
})

export const getCarrerByIDAsync = createAsyncThunk('CarrerStatsByID/carrerIDData', async (data) => {
  const response = await getCarrerByIDApi(data)
  return response.data
})

export const getWalletAsync = createAsyncThunk('WalletMoney/TransactionData', async (data) => {
  const response = await getWalletApi(data)
  return response.data
})
export const copyrightAsync = createAsyncThunk('WalletMoney/copyright', async (data) => {
  const response = await CopyrightApi(data)
  return response.data
})

export const sosEmailSlice = createSlice({
  name: 'SosEmailSlice',
  initialState,
  reducers: {
    reset: initialState,
    clearAllState: (state) => {
      state.status = null
      state.successMsg = null
      state.errorMsg = null
      state.getCarrer=null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sosEmailSliceAsync.pending, (state) => {
        state.sosloading = true
      })
      .addCase(sosEmailSliceAsync.fulfilled, (state, action) => {
        state.status = 200
        state.sosloading = false
        state.sosStats = action.payload
      })
      .addCase(sosEmailSliceAsync.rejected, (state, action) => {
        state.status = 500
        state.sosloading = false
        state.error1 = 'invalid credential'
      })
      // Carrer
      .addCase(getCarrerAsync.pending, (state) => {
        state.sosloading = true
      })
      .addCase(getCarrerAsync.fulfilled, (state, action) => {
        state.status = 200
        state.sosloading = false
        state.getCarrer = action.payload
      })
      .addCase(getCarrerAsync.rejected, (state, action) => {
        state.status = 500
        state.sosloading = false
        state.error1 = 'invalid credential'
      })
      // Carrer By ID
      .addCase(getCarrerByIDAsync.pending, (state) => {
        state.sosloading = true
      })
      .addCase(getCarrerByIDAsync.fulfilled, (state, action) => {
        state.status = 200
        state.sosloading = false
        state.getCarrerByID = action.payload
      })
      .addCase(getCarrerByIDAsync.rejected, (state, action) => {
        state.status = 500
        state.sosloading = false
        state.error1 = 'invalid credential'
      })
       // Wallet
       .addCase(getWalletAsync.pending, (state) => {
        state.sosloading = true
      })
      .addCase(getWalletAsync.fulfilled, (state, action) => {
        state.status = 200
        state.sosloading = false
        state.wallet = action.payload
      })
      .addCase(getWalletAsync.rejected, (state, action) => {
        state.status = 500
        state.sosloading = false
        state.error1 = 'invalid credential'
      })
      // copyright
        .addCase(copyrightAsync.pending, (state) => {
        state.sosloading = true
      })
      .addCase(copyrightAsync.fulfilled, (state, action) => {
        state.status = 200
        state.sosloading = false
        state.copyright = action.payload
      })
      .addCase(copyrightAsync.rejected, (state, action) => {
        state.status = 500
        state.sosloading = false
        state.error1 = 'invalid credential'
      })
  },
})

export default sosEmailSlice.reducer
export const { clearAllState } = sosEmailSlice.actions
