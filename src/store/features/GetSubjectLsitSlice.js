import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubjectListApi } from "../authApi";


const initialState = {
    subjectData: null,
    subjectLoading:null,
    isSucess: null,
    error:null,
    message:null
  }

  export const getSubjectList = createAsyncThunk("auth/SubjectList", async (data, thunkApi) => {
    const response = await getSubjectListApi(data);
      return response;
  
  });
  export const getSubjectListSlice = createSlice({
    name: "Subject",
    initialState,
    
    extraReducers: (builder) => {
      builder
        .addCase(getSubjectList.pending, (state) => {
          state.subjectLoading = true;
        })
        .addCase(getSubjectList.fulfilled, (state, action) => {
          state.subjectLoading = false;
          state.isSucess = true;
          state.subjectData = action.payload;
        })
        .addCase(getSubjectList.rejected, (state, action) => {
          state.subjectLoading = false;
          state.error = true;
          state.message = action.payload;
        });
    },
  });

export default getSubjectListSlice.reducer;