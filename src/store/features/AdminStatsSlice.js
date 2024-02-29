import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getAdminStats } from "../authApi";

const initialState = {
    adminStats:"null",
    status: "idle",
    signErr: null,
    emailData: null,
    orderloading: "",
    successMessage: null,
    assignments:null,
    orderList:null
  };

  export const getAdminStatsAsync = createAsyncThunk("AdminStatsinfo/adminstatsData", async () => {
      const response = await getAdminStats();
      return response.data;
    });

  export const AdminStatsSlice = createSlice({
    name: "AdminStatsinfo",
    initialState,
    reducers: {
      reset: initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAdminStatsAsync.pending, (state) => {
          state.orderloading = true;
        })
        .addCase(getAdminStatsAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.adminStats = action.payload;
        })
        .addCase(getAdminStatsAsync.rejected, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.error1 = "invalid credential";
        })
       
  },
});

export default AdminStatsSlice.reducer;