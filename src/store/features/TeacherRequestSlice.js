import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { teacherRequestApi,postTeacherRequestApi, getTeacherResubmitRequestApi } from "../authApi";

const initialState = {
  teacher:"null",
  postTeacher:"null",
  status: "idle",
  signErr: null,
  emailData: null,
  teacherReqLoading: '',
  success: false,
  resubmitData:null
};

export const teacherRequestAsync = createAsyncThunk("teacherlist/teacherData", async (data) => {
    const response = await teacherRequestApi(data);
    return response.data;
  });

  export const postTeacherRequestAsync = createAsyncThunk("teacherlist/postteacherData", async (data) => {
    const response = await postTeacherRequestApi(data);
    return response;
  });
  
  export const getTeacherResubmitRequestAsync = createAsyncThunk("teacherlist/getresubmitdata", async (data) => {
    const response = await getTeacherResubmitRequestApi(data);
    return response;
  });

export const teacherRequestSlice = createSlice({
    name: "teacherlist",
    initialState,
    reducers: {
      reset: initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(teacherRequestAsync.pending, (state) => {
          state.teacherReqLoading = true;
        })
        .addCase(teacherRequestAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.teacherReqLoading = false;
          state.teacher = action.payload;
        })
        .addCase(teacherRequestAsync.rejected, (state, action) => {
          state.status = "idle";
          state.teacherReqLoading = false;
          state.error1 = "invalid credential";
        })

        // Postteacher
        .addCase(postTeacherRequestAsync.pending, (state) => {
          state.teacherReqLoading = true;
        })
        .addCase(postTeacherRequestAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.teacherReqLoading = false;
          state.success = true;
          state.postTeacher = action.payload;
        })
        .addCase(postTeacherRequestAsync.rejected, (state, action) => {
          state.status = "idle";
          state.teacherReqLoading = false;
          state.error1 = "invalid credential";
        })
        // teacher resubmit assignment data
        .addCase(getTeacherResubmitRequestAsync.pending, (state) => {
          state.teacherReqLoading = true;
        })
        .addCase(getTeacherResubmitRequestAsync.fulfilled, (state, action) => {
          state.status = "idle";
          state.teacherReqLoading = false;
          state.success = true;
          state.resubmitData = action.payload;
        })
        .addCase(getTeacherResubmitRequestAsync.rejected, (state, action) => {
          state.status = "idle";
          state.teacherReqLoading = false;
          state.error1 = "invalid credential";
        })


  },
});

// export const selectAuthForgetPassword = (state) => state.auth;
// export const tableDatas = (state) => state.auth.user1;

export default teacherRequestSlice.reducer;
