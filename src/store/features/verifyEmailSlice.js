import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verifyEmailApi } from "../authApi";


const initialState = {
  verifyEmailloading: true,
  verifyEmailMsg: null,
  success: null,
  emailCheck:null
};

export const verifyEmailAsync = createAsyncThunk("/verifyEmail", async (data) => {
    const response = await verifyEmailApi(data);
    return response;
});

export const verifyEmailSlice = createSlice({
    name: "verifyEmail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(verifyEmailAsync.pending, (state) => {
            state.verifyEmailloading = true;
        })
        .addCase(verifyEmailAsync.fulfilled, (state, action) => {
            state.success = true;
            state.verifyEmailloading = false;
            state.emailCheck=action.payload
            state.verifyEmailMsg = 'Your Email has been Verified';
        })
        .addCase(verifyEmailAsync.rejected, (state, action) => {
            state.success = false;
            state.verifyEmailloading = false;
            state.verifyEmailMsg = "Invalid Token";
        })

  },
});

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default verifyEmailSlice.reducer;
