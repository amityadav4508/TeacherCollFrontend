import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { downloadBulkUploadListApi, getContentBulkUploadList, getContentList, contentRequestList,getsingleContentID, contentAcceptorRejectApi, getDuplicateContentApi,deleteContentByIdApi } from "../authApi";

const initialState = {
    getcontent:"null",
    getSingleId:"null",
    status: "idle",
    signErr: null,
    emailData: null,
    contentLoading: "",
    successMessage: null,
    getcontentRequest:null,
    bulkdata:null,
    downloadBulk:null,
    contentAcceptorRejectStatus:null,
    duplicateContentList:null,
    deleteContent:null
  };

export const getContentlistAsync = createAsyncThunk("contentTable/contentData", async (data,thunkApi) => {
    const response = await getContentList(data);
    return response;
  });

export const getContentSingleIDAsync = createAsyncThunk("contentId/singleContentId", async (id,thunkApi) => {
    const response = await getsingleContentID(id);
    return response;
  });

  export const getContentRequestAsync = createAsyncThunk("contentRequest/contentReq", async (data,thunkApi) => {
    const response = await contentRequestList(data);
    return response;
  });
  export const getContentBulkUploadAsync = createAsyncThunk("contentBulk/contentBulkData", async (data,thunkApi) => {
    const response = await getContentBulkUploadList(data);
    return response;
  });
  export const downloadBulkUploadAsync = createAsyncThunk("contentBulk/downloadBulkData", async (data,thunkApi) => {
    const response = await downloadBulkUploadListApi(data);
    return response;
  });
  export const contentAcceptorReject = createAsyncThunk("contentBulk/contentAcceptorRejectStatus", async (data,thunkApi) => {
    const response = await contentAcceptorRejectApi(data);
    return response;
  });

  export const getDuplicateContentAsync = createAsyncThunk("contentBulk/getDulpcateContent", async (data,thunkApi) => {
    const response = await getDuplicateContentApi(data);
    return response.data;
  });

  export const deleteContentByIdAsync = createAsyncThunk("delete/deleteContent", async (data,thunkApi) => {
    const response = await deleteContentByIdApi(data);
    return response.data;
  });

  export const ContentListSlice = createSlice({
    name: "contentTable",
    initialState,
    reducers: {
      reset: initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(getContentlistAsync.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(getContentlistAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.getcontent = action.payload;
        })
        .addCase(getContentlistAsync.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })
        //singleid
        .addCase(getContentSingleIDAsync.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(getContentSingleIDAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.getSingleId = action.payload;
        })
        .addCase(getContentSingleIDAsync.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })
        //
        .addCase(getContentRequestAsync.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(getContentRequestAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.getcontentRequest = action.payload;
        })
        .addCase(getContentRequestAsync.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })
        //bulkupload
        .addCase(getContentBulkUploadAsync.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(getContentBulkUploadAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.bulkdata = action.payload;
        })
        .addCase(getContentBulkUploadAsync.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })
        //download bulk upload
        .addCase(downloadBulkUploadAsync.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(downloadBulkUploadAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.downloadBulk = action.payload;
        })
        .addCase(downloadBulkUploadAsync.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })
        .addCase(contentAcceptorReject.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(contentAcceptorReject.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.contentAcceptorRejectStatus = action.payload;
        })
        .addCase(contentAcceptorReject.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })
        .addCase(getDuplicateContentAsync.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(getDuplicateContentAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.duplicateContentList = action.payload;
        })
        .addCase(getDuplicateContentAsync.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })
        // delete Content
        .addCase(deleteContentByIdAsync.pending, (state) => {
          state.contentLoading = true;
        })
        .addCase(deleteContentByIdAsync.fulfilled, (state, action) => {
          state.status = "200";
          state.contentLoading = false;
          state.deleteContent = action.payload;
        })
        .addCase(deleteContentByIdAsync.rejected, (state, action) => {
          state.status = "idle";
          state.contentLoading = false;
          state.error1 = "invalid credential";
        })

        
  },
});







export default ContentListSlice.reducer;