import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMeetingsScheduleApi, meetingSheduleApi, getMeetingRequestTeacherApi } from '../authApi'
import { data } from 'jquery'

const initialState = {
    meetingLoading:null,
    status:null,
    meetingShedule:null,
    error1:null,
    getMeetingSchedule:null,
    getMeetingRequestTeacher:null
}

export const meetingSheduleAsync = createAsyncThunk(
  ' AcceptAssignmentStats/AcceptData',
  async (data) => {
    const response = await meetingSheduleApi(data)
    return response
  },
)
export const getMeetingsScheduleAsync = createAsyncThunk(
  ' getMeetingsSchedule/AcceptData',
  async (data) => {
    const response = await getMeetingsScheduleApi(data)
    return response
  },
)

export const getMeetingRequestTeach= createAsyncThunk(
  'getMeetingRequestTeacter/AcceptData',async(data)=>{
    const response =await getMeetingRequestTeacherApi(data)
    return response
  },
)


export const MeetingSheduleSlice = createSlice({
  name: 'MeetingSheduleSlice',
  initialState,
  reducers: {
    reset: initialState,
    clearMeetingState: (state) => {
      state.getMeetingSchedule = null
      state.meetingShedule = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(meetingSheduleAsync.pending, (state) => {
        state.meetingLoading = true
      })
      .addCase(meetingSheduleAsync.fulfilled, (state, action) => {
        state.status = 200
        state.meetingLoading = false
        state.meetingShedule = action.payload
      })
      .addCase(meetingSheduleAsync.rejected, (state, action) => {
        state.status = 500
        state.meetingLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getMeetingsScheduleAsync.pending, (state) => {
        state.meetingLoading = true
      })
      .addCase(getMeetingsScheduleAsync.fulfilled, (state, action) => {
        state.status = 200
        state.meetingLoading = false
        state.getMeetingSchedule = action.payload
      })
      .addCase(getMeetingsScheduleAsync.rejected, (state, action) => {
        state.status = 500
        state.meetingLoading = false
        state.error1 = 'invalid credential'
      })
      .addCase(getMeetingRequestTeach.pending, (state)=>{
        state.meetingLoading=true;
      })
      .addCase(getMeetingRequestTeach.fulfilled, (state, action)=>{
        state.status=200
        state.meetingLoading=false
        state.getMeetingRequestTeacher=action.payload
      })
      .addCase(getMeetingRequestTeach.rejected ,(state)=>{
        state.status = 500
        state.meetingLoading = false
        state.error1 = 'invalid credential'
      })
  },
})

export default MeetingSheduleSlice.reducer
export const { clearMeetingState } = MeetingSheduleSlice.actions
