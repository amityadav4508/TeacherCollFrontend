import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { zoomListApi, zoomRequestStatusApi } from '../authApi'
import { toast } from 'react-toastify'

const initialState = {
  Zoomloading: false,
  getZoomList: null,
  success: null,
}

export const getZoomRequestList = createAsyncThunk('get/Zoom request List ', async (data) => {
  const response = await zoomListApi(data)
  return response.data
})
export const zoomRequestStatusAsync = createAsyncThunk(
  'Zoom /status Change',
  async (data, thunkApi) => {
    const response = await zoomRequestStatusApi(data)
    thunkApi.dispatch(getZoomRequestList())
    toast.success('Status updated successfully')
    return response.data
  },
)

export const zoomSlice = createSlice({
  name: 'verifyEmail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getZoomRequestList.pending, (state) => {
        state.Zoomloading = true
      })
      .addCase(getZoomRequestList.fulfilled, (state, action) => {
        state.success = false
        state.Zoomloading = false
        state.getZoomList = action.payload
      })
      .addCase(getZoomRequestList.rejected, (state, action) => {
        state.success = false
        state.Zoomloading = false
      })
      .addCase(zoomRequestStatusAsync.pending, (state) => {
        state.Zoomloading = true
      })
      .addCase(zoomRequestStatusAsync.fulfilled, (state, action) => {
        state.success = true
        state.Zoomloading = false
        state.getZoomList = action.payload
      })
      .addCase(zoomRequestStatusAsync.rejected, (state, action) => {
        state.success = false
        state.Zoomloading = false
      })
  },
})

export default zoomSlice.reducer
