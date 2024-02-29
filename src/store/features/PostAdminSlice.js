import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { manageAdminPostApi,editSubadminApi } from "../authApi";

const initialState = {
  postAdmin:null,
  editAdmin:null,
  status: "idle",
  signErr: null,
  emailData: null,
  addAdminloading: "",
  successMessage: null,
};
// editSubadminApi
export const postAdminAsync = createAsyncThunk("postadminData/postdata", async (data,thunkApi) => {
    const response = await manageAdminPostApi(data);
    return response;
  });

  export const editAdminAsync = createAsyncThunk("postadminData/editdata", async (data1,thunkApi) => {
    const response = await editSubadminApi(data1);
    return response;
  });


export const postAdminSlice = createSlice({
    name: "postadminData",
    initialState,
    reducers: {
      reset: initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(postAdminAsync.pending, (state) => {
          state.addAdminloading = true;
        })
        .addCase(postAdminAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.addAdminloading = false;
          state.postAdmin = action.payload;
        })
        .addCase(postAdminAsync.rejected, (state, action) => {
          state.status = "idle";
          state.addAdminloading = false;
          state.error1 = "invalid credential";
        })

        //Edit SubAdmin
        .addCase(editAdminAsync.pending, (state) => {
          state.addAdminloading = true;
        })
        .addCase(editAdminAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.addAdminloading = false;
          state.editAdmin = action.payload;
        })
        .addCase(editAdminAsync.rejected, (state, action) => {
          state.status = "idle";
          state.addAdminloading = false;
          state.error1 = "invalid credential";
        })


  },
});

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default postAdminSlice.reducer;
