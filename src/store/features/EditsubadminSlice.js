import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { changePassAdminApi, editAdminProfile } from '../authApi'

const initialState = {
  status: null,
  editSubAdminloading: false,
  editSubAdmin: null,
  success: null,
  changePassloading: false,
  changePassSuccessMsg: null,
  changePassErrorMsg: null
}

export const editSubAdminAsync = createAsyncThunk('/editSubAdmin', async (data) => {
  const response = await editAdminProfile(data)
  return response
})

export const changePassAdminAsync = createAsyncThunk("adminList/AdminShowData", async (data) => {
  const response = await changePassAdminApi(data);
  return response;
});

export const editSubAdminSlice = createSlice({
  name: 'editSubAdmin',
  initialState,
  reducers: {
    clearAllState: (state) => {
      state.status = null;
      state.changePassloading = false;
      state.changePassSuccessMsg = null;
      state.changePassErrorMsg = null;
  },
  },
  extraReducers: (builder) => {
    builder
    .addCase(editSubAdminAsync.pending, (state) => {
        state.editSubAdminloading = true;
      })
      .addCase(editSubAdminAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.editSubAdminloading = false;
        state.editSubAdmin = action.payload;
      })
      .addCase(editSubAdminAsync.rejected, (state, action) => {
        state.status = "idle";
        state.editSubAdminloading = false;
        state.error1 = "invalid credential";
      })
      //
      .addCase(changePassAdminAsync.pending, (state) => {
        state.changePassloading = true;
      })
      .addCase(changePassAdminAsync.fulfilled, (state, action) => {
        state.status = 200;
        state.changePassloading = false;
        state.changePassSuccessMsg = action.payload.data.message;
      })
      .addCase(changePassAdminAsync.rejected, (state, action) => {
        state.status = 500;
        state.changePassloading = false;
        state.changePassErrorMsg =  (action.error.message) ? action.error.message : "invalid Request"
      })
  },
})

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default editSubAdminSlice.reducer
export const {clearAllState} = editSubAdminSlice.actions;