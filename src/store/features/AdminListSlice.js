import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminListApi } from "../authApi";

const initialState = {
  list:"null",
  status: "idle",
  signErr: null,
  emailData: null,
  adminloading: "",
  successMessage: null,
};

export const adminListAsync = createAsyncThunk("adminList/AdminShowData", async () => {
    const response = await adminListApi();
    return response;
  });


export const adminListSlice = createSlice({
    name: "adminList",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.forgetPassword = null;
        state.sendOtp = null;
        state.status = "idle";
  
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(adminListAsync.pending, (state) => {
          state.adminloading = true;
        })
        .addCase(adminListAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.adminloading = false;
          state.list = action.payload;
        })
        .addCase(adminListAsync.rejected, (state, action) => {
          state.status = "idle";
          state.adminloading = false;
          state.error1 = "invalid credential";
        })


  },
});

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default adminListSlice.reducer;
