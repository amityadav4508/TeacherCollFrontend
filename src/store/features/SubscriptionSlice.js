import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSubscriptionApi,postSubscriptionApi,editSubscriptionApi,singleSubscriptionID } from "../authApi";

const initialState = {
    getSubscriptionList:"null",
    postSubscriptionList:"null",
    editSubscriptionList:"null",
    subscriptionId:"null",
    status: "idle",
    signErr: null,
    emailData: null,
    subscriptionloading: "",
    successMessage: null,
    EditSubstatus:"idle"
  };

export const getSubscriptionAsync = createAsyncThunk("subscriptionTable/subscriptionData", async () => {
    const response = await getSubscriptionApi();
    return response.data;
  });

  export const postSubscriptionAsync = createAsyncThunk("subscriptionTable/postSubscriptionData", async (data) => {
    const response = await postSubscriptionApi(data);
    return response?.data;
  });

  export const editSubscriptionAsync = createAsyncThunk("subscriptionTable/editSubscriptionData", async (data) => {
    const response = await editSubscriptionApi(data);
    return response;
  });

  export const singleSubscriptionAsync = createAsyncThunk("subscriptionTable/singleSubscription", async (id,thunkapi) => {
    const response = await singleSubscriptionID(id);

    return response;
  });

  export const SubscriptionListSlice = createSlice({
    name: "subscriptionTable",
    initialState,
    reducers: {
      reset: initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getSubscriptionAsync.pending, (state) => {
          state.subscriptionloading = true;
        })
        .addCase(getSubscriptionAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.subscriptionloading = false;
          state.getSubscriptionList = action.payload;
        })
        .addCase(getSubscriptionAsync.rejected, (state, action) => {
          state.status = "idle";
          state.subscriptionloading = false;
          state.error1 = "invalid credential";
        })

        // PostSubscription
        .addCase(postSubscriptionAsync.pending, (state) => {
          state.subscriptionloading = true;
        })
        .addCase(postSubscriptionAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.subscriptionloading = false;
          state.postSubscriptionList = action.payload;
        })
        .addCase(postSubscriptionAsync.rejected, (state, action) => {
          state.status = "idle";
          state.subscriptionloading = false;
          state.error1 = "invalid credential";
        })

          // EditSubscription
          .addCase(editSubscriptionAsync.pending, (state) => {
            state.subscriptionloading = true;
          })
          .addCase(editSubscriptionAsync.fulfilled, (state, action) => {
            state.EditSubstatus = "200";
            state.subscriptionloading = false;
            state.editSubscriptionList = action.payload;
          })
          .addCase(editSubscriptionAsync.rejected, (state, action) => {
            state.status = "idle";
            state.subscriptionloading = false;
            state.error1 = "invalid credential";
          })

          //singleID
          .addCase(singleSubscriptionAsync.pending, (state) => {
            state.subscriptionloading = true;
          })
          .addCase(singleSubscriptionAsync.fulfilled, (state, action) => {
            state.status = "idle";
            state.subscriptionloading = false;
            state.subscriptionId = action.payload;
          })
          .addCase(singleSubscriptionAsync.rejected, (state, action) => {
            state.status = "idle";
            state.subscriptionloading = false;
            state.error1 = "invalid credential";
          })


  },
});



// export const selectAuthForgetPassword = (state) => state.auth;

// export const tableDatas = (state) => state.auth.user1;



export default SubscriptionListSlice.reducer;