import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {deleteManageSubjectApi, EditManageSubjectApi} from "../authApi";

const initialState = {
  edit:"null",
  delete:"null",
  status: null,
  signErr: null,
  emailData: null,
  editLoading: "",
  successMessage: null,
  successMsg: null,
  errorMsg: null,
  singleSubject:null
};

  export const EditManageSubjectAsync = createAsyncThunk("subjectTable/postSubjectList", async (data) => {
    const response = await EditManageSubjectApi(data);
    return response;
  }); 

  export const deleteManageSubjectAsync = createAsyncThunk("subjectTable/deleteSubjectList", async (id) => {
    const response = await deleteManageSubjectApi(id);
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
      // Edit Subject
      .addCase(EditManageSubjectAsync.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(EditManageSubjectAsync.fulfilled, (state, action) => {
        state.status = 200;
        state.editLoading = false;
        state.edit = action.payload;
      })
      .addCase(EditManageSubjectAsync.rejected, (state, action) => {
        state.status = 500;
        state.editLoading = false;
        state.error1 = "invalid credential";
      })
      //delete
      .addCase(deleteManageSubjectAsync.pending, (state) => {
        state.editLoading = true;
      })
      .addCase(deleteManageSubjectAsync.fulfilled, (state, action) => {
        state.status = 200;
        state.editLoading = false;
        state.delete = action.payload;
      })
      .addCase(deleteManageSubjectAsync.rejected, (state, action) => {
        state.status = 500;
        state.editLoading = false;
        state.errorMsg = action.error.message
      
      })
  },
});

export default manageSubjectSlice.reducer;
