import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebarShow: null,
    showCanvastogglebar:null
  }

  export const sidebarShowget = createAsyncThunk("auth/sidebarshowget", async (user, thunkApi) => {
      return user;
  
  });
  export const sidebarShowtoggle = createAsyncThunk("auth/sidebarshow", async (user, thunkApi) => {
        return user;
    
    });
  export const sideBarSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        state.sidebarShow = true;
        state.isLoading = false;
        state.isError = false;
        state.isSucess = false;
        state.message = "";
        
      },
    },
    extraReducers: (builder) => {
      builder
     
        .addCase(sidebarShowget.fulfilled, (state, action) => {
          state.sidebarShow = action.payload;
        })
     
      
        .addCase(sidebarShowtoggle.fulfilled, (state, action) => {
          state.showCanvastogglebar = action.payload;
        })
    
    },
  });

export const { reset } =sideBarSlice.actions;
export default sideBarSlice.reducer;