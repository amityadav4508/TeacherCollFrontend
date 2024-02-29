import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { manageAdminApi,manageSingleIDApi } from "../authApi";

const initialState = {
  admin:"null",
  singleID:"null",
  deletesubadmin:"null",
  status: "idle",
  signErr: null,
  emailData: null,
  manageAdminloading: "",
  successMessage: null,
};

export const manageAdminAsync = createAsyncThunk("adminData/managedata", async (data) => {
    const response = await manageAdminApi(data);

    return response.data;
  });

  export const manageSingleIDApiAsync = createAsyncThunk("adminData/singleSubAdmin", async (id,thunkapi) => {
    const response = await manageSingleIDApi(id);

    return response;
  });


export const manageAdminSlice = createSlice({
    name: "adminData",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder
        .addCase(manageAdminAsync.pending, (state) => {
          state.manageAdminloading = true;
        })
        .addCase(manageAdminAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.manageAdminloading = false;
          state.admin = action.payload;
        })
        .addCase(manageAdminAsync.rejected, (state, action) => {
          state.status = "idle";
          state.manageAdminloading = false;
          state.error1 = "invalid credential";
        })

        // Single ID
        .addCase(manageSingleIDApiAsync.pending, (state) => {
          state.manageAdminloading = true;
        })
        .addCase(manageSingleIDApiAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.manageAdminloading = false;
          state.singleID = action.payload;
        })
        .addCase(manageSingleIDApiAsync.rejected, (state, action) => {
          state.status = "idle";
          state.manageAdminloading = false;
          state.error1 = "invalid credential";
        })



  },
});


export default manageAdminSlice.reducer;
