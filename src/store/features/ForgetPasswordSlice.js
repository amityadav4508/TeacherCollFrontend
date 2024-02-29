import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { forgetPassAdminApi, forgetPassUserApi, resetUserPassApi, rsesetAdminPassApi, changePassUserApi, resetPassTokenApi, verifyResetPassApi } from "../authApi";


const initialState = {
  list:"null",
  status: null,
  signErr: null,
  emailData: null,
  forgetPassloading:false,
  successMessage: null,
  successMsg: null,
  errorMsg: null,
  resetToken:null,
  verifyresetToken:null
};


  export const forgetPassAdminAsync = createAsyncThunk("adminList/forgetData", async (data) => {
    const response = await forgetPassAdminApi(data);
    return response;
  });
  export const forgetPassUserAsync = createAsyncThunk("adminList/forgetUserData", async (data) => {
    const response = await forgetPassUserApi(data);
    return response;
  });
  export const resetAdminPassAsync = createAsyncThunk("adminList/resetData", async (data) => {
    const response = await rsesetAdminPassApi(data);
    return response;
  });
  export const resetUserPassAsync = createAsyncThunk("adminList/resetUserData", async (data) => {
    const response = await resetUserPassApi(data);
    return response;
  });

  export const verifyResetPassAsync = createAsyncThunk("adminList/verifyresetUserData", async (data) => {

    const response = await verifyResetPassApi(data);
    return response;
  });

  export const changePassUserAsync = createAsyncThunk("user/changePassUser", async (data) => {
    const response = await changePassUserApi(data);
    return response;
  });
  // reset pass token
  export const resetPassTokenAsync = createAsyncThunk("user/resetPassToken", async (data) => {
    const response = await resetPassTokenApi(data);
    return response;
  });
  


export const changePassAdminSlice = createSlice({
    name: "adminList",
    initialState,
    reducers: {
      
  },
    extraReducers: (builder) => {
      builder
        
        // forgot

        .addCase(forgetPassAdminAsync.pending, (state) => {
          state.forgetPassloading = true;
        })
        .addCase(forgetPassAdminAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.forgetPassloading = false;
          state.successMessage = action.payload;
        })
        .addCase(forgetPassAdminAsync.rejected, (state, action) => {
          state.status = "idle";
          state.forgetPassloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(resetAdminPassAsync.pending, (state) => {
          state.forgetPassloading = true;
        })
        .addCase(resetAdminPassAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.forgetPassloading = false;
          state.successMessage = action.payload;
        })
        .addCase(resetAdminPassAsync.rejected, (state, action) => {
          state.status = "idle";
          state.forgetPassloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(forgetPassUserAsync.pending, (state) => {
          state.forgetPassloading = true;
        })
        .addCase(forgetPassUserAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.forgetPassloading = false;
          state.successMessage = action.payload;
        })
        .addCase(forgetPassUserAsync.rejected, (state, action) => {
          state.status = "idle";
          state.forgetPassloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(resetUserPassAsync.pending, (state) => {
          state.forgetPassloading = true;
        })
        .addCase(resetUserPassAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.forgetPassloading = false;
          state.successMessage = action.payload;
        })
        .addCase(resetUserPassAsync.rejected, (state, action) => {
          state.status = "idle";
          state.forgetPassloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(changePassUserAsync.pending, (state) => {
          state.forgetPassloading = true;
        })
        .addCase(changePassUserAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.forgetPassloading = false;
          state.successMessage = action.payload;
        })
        .addCase(changePassUserAsync.rejected, (state, action) => {
          state.status = "idle";
          state.forgetPassloading = false;
          state.error1 = "invalid credential";
        })
       // reset pass token
        .addCase(resetPassTokenAsync.pending, (state) => {
          state.forgetPassloading = true;
        })
        .addCase(resetPassTokenAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.forgetPassloading = false;
          state.resetToken = action.payload;
        })
        .addCase(resetPassTokenAsync.rejected, (state, action) => {
          state.status = "404";
          state.forgetPassloading = false;
          state.error1 = "invalid credential";
        })
        // verify reset token
        .addCase(verifyResetPassAsync.pending, (state) => {
          state.forgetPassloading = true;
        })
        .addCase(verifyResetPassAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.forgetPassloading = false;
        })
        .addCase(verifyResetPassAsync.rejected, (state, action) => {
          state.verifyresetToken = action.error;
          state.status = "404";
          state.forgetPassloading = false;
          state.error1 = "invalid credential";
        })


  },
});

// export const selectAuthForgetPassword = (state) => state.auth;

export default changePassAdminSlice.reducer;

