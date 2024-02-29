import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  buyNowContentApi, checkSubscriptionApi, getContentApi, searchContentApi, solutionAsyncApi } from "../authApi";

const initialState = {
    status: "idle",
    signErr: null,
    emailData: null,
    mainContentloading: false,
    successMessage: null,
    assignments:null,
    contentList:null,
    searchedList:null,
    content_buy:'',
    subscription_status:null,
    solutiondata:null
  };

export const getMainPageContentAsync = createAsyncThunk("mainPageContent/ContentData", async (data) => {
    const response = await getContentApi(data);
    return response;
  });


  export const searchMainPageContentAsync = createAsyncThunk("searchMainPageContent/ContentData", async (data) => {
    const response = await searchContentApi(data);
    return response;
  });
  
  //buyNowContentAsync
  export const buyNowContentAsync = createAsyncThunk("searchMainPageContent/buyContent", async (data) => {
    const response = await buyNowContentApi(data);
    return response;
  });

  // check subscription
  export const checkSubscriptionAsync = createAsyncThunk("searchMainPageContent/checkSubscription", async (data) => {
    const response = await checkSubscriptionApi(data);
    return response;
  });

  export const solutionAsync = createAsyncThunk("searchMainPageContent/solution", async (data) => {
    const response = await solutionAsyncApi(data);
    return response.data;
  });

  export const mainPageContentSlice = createSlice({
    name: "ContentData",
    initialState,
    reducers: {
      reset: initialState,

      clearAllState:(state)=>{
        state.content_buy=''
        state.solutiondata=null
       },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getMainPageContentAsync.pending, (state) => {
          state.mainContentloading = true;
        })
        .addCase(getMainPageContentAsync.fulfilled, (state, action) => {
          state.status = 200;
          state.mainContentloading = false;
          state.contentList = action.payload;
        })
        .addCase(getMainPageContentAsync.rejected, (state, action) => {
          state.status = "idle";
          state.mainContentloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(searchMainPageContentAsync.pending, (state) => {
          state.mainContentloading = true;
        })
        .addCase(searchMainPageContentAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.mainContentloading = false;
          state.searchedList = action.payload;
        })
        .addCase(searchMainPageContentAsync.rejected, (state, action) => {
          state.status = "idle";
          state.mainContentloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(buyNowContentAsync.pending, (state) => {
          state.mainContentloading = true;
        })
        .addCase(buyNowContentAsync.fulfilled, (state, action) => {
          state.status = 200;
          state.mainContentloading = false;
          state.content_buy = action.payload;
        })
        .addCase(buyNowContentAsync.rejected, (state, action) => {
          state.status = "idle";
          state.mainContentloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(checkSubscriptionAsync.pending, (state) => {
          state.mainContentloading = true;
        })
        .addCase(checkSubscriptionAsync.fulfilled, (state, action) => {
          state.status = 200;
          state.mainContentloading = false;
          state.subscription_status = action.payload;
        })
        .addCase(checkSubscriptionAsync.rejected, (state, action) => {
          state.status = "idle";
          state.mainContentloading = false;
          state.error1 = "invalid credential";
        })
        .addCase(solutionAsync.pending, (state) => {
          state.mainContentloading = true;
        })
        .addCase(solutionAsync.fulfilled, (state, action) => {
          state.status = 200;
          state.mainContentloading = false;
          state.solutiondata = action.payload;
        })
        .addCase(solutionAsync.rejected, (state, action) => {
          state.status = "idle";
          state.mainContentloading = false;
          state.error1 = "invalid credential";
        })
       
  },
});







export default  mainPageContentSlice.reducer;
export const { clearAllState } = mainPageContentSlice.actions