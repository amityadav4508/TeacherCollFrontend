import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changePassUserApi } from "../authApi";


const initialState = {
  status: null,
  loading: false,
  successMsg: null,
  errorMsg: null,
};

export const changePassUserAsync = createAsyncThunk("user/changePassUser", async (data) => {
    const response = await changePassUserApi(data);
    return response;
});

export const teacherSettingsSlice = createSlice({
    name: "TeacherSettings",
    initialState,
    reducers: {
        clearAllState: (state) => {
            state.status = null;
            state.loading = false;
            state.successMsg = null;
            state.errorMsg = null;
        },
    },
    extraReducers: (builder) => {
      builder
        .addCase(changePassUserAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(changePassUserAsync.fulfilled, (state, action) => {
            state.status = 200;
            state.loading = false;
            state.successMsg = action.payload.data.message;
        })
        .addCase(changePassUserAsync.rejected, (state, action) => {
            state.status = 500;
            state.loading = false;
            state.errorMsg = (action.error.message) ? action.error.message : "invalid Request";
        })

  },
});

export default teacherSettingsSlice.reducer;
export const { clearAllState } = teacherSettingsSlice.actions