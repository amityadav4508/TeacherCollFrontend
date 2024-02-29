import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAssignmentList,checkAssignmentApi, ManageAssignmentStatusApi, ManageOrderListApi } from "../authApi";

const initialState = {
    getAssignments:"null",
    adminList:null,
    checkAssignments:"null",
    status: null,
    signErr: null,
    emailData: null,
    orderloading: "",
    successMsg: null,
    errorMsg: null,
    successMessage: null,
    assignments:null,
    orderList:null
  };

export const getAssignmentlistAsync = createAsyncThunk("subscriptionTable/subscriptionData", async (data) => {
    const response = await getAssignmentList(data);
    return response;
  });

  export const getAdminAssignmentlistAsync = createAsyncThunk("adminsubscriptionTable/adminsubscriptionData", async (data) => {
      const response = await getAssignmentList(data);
      return response;
    });

  export const checkAssignmentAsync = createAsyncThunk("subscriptionTable/checkAssignment", async (data) => {
    const response = await checkAssignmentApi(data);
    return response;
  });
  export const assignmentStatusAsync = createAsyncThunk("AssignmentTable/assignmentStatus", async (data) => {
    const response = await ManageAssignmentStatusApi(data);
    return response;
  });
  export const orderListAsync = createAsyncThunk("OrderListTable/orderList", async (data) => {
    const response = await ManageOrderListApi(data);
 
    return response.data;
  });

  export const AssignmentListSlice = createSlice({
    name: "AssignmentTable",
    initialState,
    reducers: {
      reset: initialState,
      clearAllState: (state) => {
        state.status = null
        state.successMsg = null
        state.errorMsg = null
        state.assignments = null
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getAssignmentlistAsync.pending, (state) => {
          state.orderloading = true;
        })
        .addCase(getAssignmentlistAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.getAssignments = action.payload;
        })
        .addCase(getAssignmentlistAsync.rejected, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.error1 = "invalid credential";
        })
        // Admin
        .addCase(getAdminAssignmentlistAsync.pending, (state) => {
          state.orderloading = true;
        })
        .addCase(getAdminAssignmentlistAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.adminList = action.payload;
        })
        .addCase(getAdminAssignmentlistAsync.rejected, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.error1 = "invalid credential";
        })
        // Check Assignment
        .addCase(checkAssignmentAsync.pending, (state) => {
          state.orderloading = true;
        })
        .addCase(checkAssignmentAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.checkAssignments = action.payload;
        })
        .addCase(checkAssignmentAsync.rejected, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.error1 = "invalid credential";
        })
        //status assignment
        .addCase(assignmentStatusAsync.pending, (state) => {
          state.orderloading = true;
        })
        .addCase(assignmentStatusAsync.fulfilled, (state, action) => {
          state.status = 200;
          state.orderloading = false;
          state.assignments = action.payload;
        })
        .addCase(assignmentStatusAsync.rejected, (state, action) => {
          state.status = 500;
          state.orderloading = false;
          state.error1 = "invalid credential";
        })
        //order List
        .addCase(orderListAsync.pending, (state) => {
          state.orderloading = true;
        })
        .addCase(orderListAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.orderList = action.payload;
        })
        .addCase(orderListAsync.rejected, (state, action) => {
          state.status = "idle";
          state.orderloading = false;
          state.error1 = "invalid credential";
        })
  },
});







export default AssignmentListSlice.reducer;
export const {  clearAllState} = AssignmentListSlice.actions
