import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../../app/apiService";

const user = JSON.parse(localStorage.getItem("userAuth"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isUserLoggedOut: false,
  isLoading: false,
  message: "",
};
export const logoutUser = createAsyncThunk("auth/logout", async ( thunkApi) => {
  try {
    return await apiService.logout();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.string();
    return thunkApi.rejectWithValue(message);
  }
});

export const logoutSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = false;
      state.isLoading = false;
      state.isError = false;
      state.isUserLoggedOut = false;
      state.message = "";
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUserLoggedOut = true;
        state.user = action.payload;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = logoutSlice.actions;
export default logoutSlice.reducer;