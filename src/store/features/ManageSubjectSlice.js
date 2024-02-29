import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { manageSubjectApi,manageSingleSubjectApi,PostManageSubjectApi } from "../authApi";

const initialState = {
  subjects:"null",
  singleSubject:"null",
  postSubject:"null",
  status: "idle",
  signErr: null,
  emailData: null,
  manageSubjectLoading: "",
  successMessage: null,
};

export const manageSubjectAsync = createAsyncThunk("subjectTable/subjectList", async () => {
    const response = await manageSubjectApi();
    return response.data;
  });
  export const manageSingleSubjectAsync = createAsyncThunk("subjectTable/singleSubjectList", async (id,thunkapi) => {
    const response = await manageSingleSubjectApi(id);
    return response;
  });
export const postManageSubjectAsync = createAsyncThunk("subjectTable/postSubjectList", async (data) => {
    const response = await PostManageSubjectApi(data);
    return response;
  }); 



export const manageSubjectSlice = createSlice({
    name: "subjectTable",
    initialState,
    reducers: {
        reset: initialState,
      },
    extraReducers: (builder) => {
      builder
        .addCase(manageSubjectAsync.pending, (state) => {
          state.manageSubjectLoading = true;
        })
        .addCase(manageSubjectAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.manageSubjectLoading = false;
          state.subjects = action.payload;
        })
        .addCase(manageSubjectAsync.rejected, (state, action) => {
          state.status = "idle";
          state.manageSubjectLoading = false;
          state.error1 = "invalid credential";
        })
        //Single Subject
        .addCase(manageSingleSubjectAsync.pending, (state) => {
          state.manageSubjectLoading = true;
        })
        .addCase(manageSingleSubjectAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.manageSubjectLoading = false;
          state.singleSubject = action.payload;
        })
        .addCase(manageSingleSubjectAsync.rejected, (state, action) => {
          state.status = "idle";
          state.manageSubjectLoading = false;
          state.error1 = "invalid credential";
        })
      // Post Subject
      .addCase(postManageSubjectAsync.pending, (state) => {
        state.manageSubjectLoading = true;
      })
      .addCase(postManageSubjectAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.manageSubjectLoading = false;
        state.postSubject = action.payload;
      })
      .addCase(postManageSubjectAsync.rejected, (state, action) => {
        state.status = "idle";
        state.manageSubjectLoading = false;
        state.error1 = "invalid credential";
      })
  },
});

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default manageSubjectSlice.reducer;
