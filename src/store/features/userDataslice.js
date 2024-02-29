import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userSingleIdApi, userdataApi,userStudentFilterdataApi,userFilterdataApi, userProfileApi, adminProfileApi, userBlockApi } from "../authApi";

const initialState = {
  usersData:"null",
  filter:"null",
  singleId:"null",
  student:"null",
  status: "idle",
  signErr: null,
  emailData: null,
  userloading: false,
  successMessage: null,
  content:null,
  userProfile:null,
  userBlock:null
};

export const usersDataAsync = createAsyncThunk("tabledata/studentdata", async () => {
    const response = await userdataApi();
    return response;

  });

  //get super admin and sub admin profile
  export const userSingleIdAsync = createAsyncThunk("tabledata/userIdData", async (id) => {
    const response = await userSingleIdApi(id);
    return response;
  });
//get admin user profile
  export const adminProfileAsync = createAsyncThunk("tabledata/adminProfile", async (data) => {
    const response = await adminProfileApi(data);
    return response;
  });

  //user Profile
  export const userProfileAsync = createAsyncThunk("tabledata/userProfile", async (data) => {
    const response = await userProfileApi(data);
    return response;
  });


  export const usersFilterDataAsync = createAsyncThunk("tabledata/userFilterdata", async (data,thunkApi) => {
    const response = await userFilterdataApi(data);
    return response.data 

  });

  export const usersStudentFilterDataAsync = createAsyncThunk("tabledata/userStudentFilterdata", async (data,thunkApi) => {
    const response = await userStudentFilterdataApi(data);
    return response.data 

  });
  export const usersBlockAsync = createAsyncThunk("tabledata/blockuserdata", async (data,thunkApi) => {
    const response = await userBlockApi(data);
    return response 

  });


export const userdataSlice = createSlice({
    name: "tabledata",
    initialState,
    reducers: {
      clearAllState: (state) => {
        state.status = null;
        state.successMessage = null;
        state.error1 = null;
    },
    },
    extraReducers: (builder) => {
      builder
        .addCase(usersDataAsync.pending, (state) => {
          state.userloading = true;
        })
        .addCase(usersDataAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.usersData = action.payload;
        })
        .addCase(usersDataAsync.rejected, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.error1 = "invalid credential";
        })
        //Student filter management
        .addCase(usersStudentFilterDataAsync.pending, (state) => {
          state.userloading = true;
        })
        .addCase(usersStudentFilterDataAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.student = action.payload;
        })
        .addCase(usersStudentFilterDataAsync.rejected, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.error1 = "invalid credential";
        })

        //Filter management
        .addCase(usersFilterDataAsync.pending, (state) => {
          state.userloading = true;
        })
        .addCase(usersFilterDataAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.filter = action.payload;
        })
        .addCase(usersFilterDataAsync.rejected, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.error1 = "invalid credential";
        })

        // SingleId
        .addCase(userSingleIdAsync.pending, (state) => {
          state.userloading = true;
        })
        .addCase(userSingleIdAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.singleId = action.payload;
        })
        .addCase(userSingleIdAsync.rejected, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.error1 = "invalid credential";
        })
         //get admin user Profile
         .addCase(adminProfileAsync.pending, (state) => {
          state.userloading = true;
        })
        .addCase(adminProfileAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.userProfile = action.payload;
        })
        .addCase(adminProfileAsync.rejected, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.error1 = "invalid credential";
        })
        //user Profile
        .addCase(userProfileAsync.pending, (state) => {
          state.userloading = true;
        })
        .addCase(userProfileAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.userProfile = action.payload;
        })
        .addCase(userProfileAsync.rejected, (state, action) => {
          if(action.error.message==401){
            state.userloading = false;
            state.error1="unauthorised"
            state.status = action.error.message;
          }else{
            state.status = 500;
            state.userloading = false;
            state.error1 = "invalid credential";
          }
        })
        .addCase(usersBlockAsync.pending, (state) => {
          state.userloading = true;
        })
        .addCase(usersBlockAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.userBlock = action.payload;
        })
        .addCase(usersBlockAsync.rejected, (state, action) => {
          state.status = "idle";
          state.userloading = false;
          state.error1 = "invalid credential";
        })


  },
});

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default userdataSlice.reducer;
export const { clearAllState} = userdataSlice.actions