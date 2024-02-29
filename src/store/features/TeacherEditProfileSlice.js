import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postTeacherEditProfile } from '../authApi'

const initialState = {
  editTeacher: 'null',
  signErr: null,
  emailData: null,
  teacherProfileloading: false,
  success: null,
  successMsg: null,
  errorMsg: null,
  status1: null,
}

export const editTeacherProfileAsync = createAsyncThunk('Teacher/teacherData', async (data) => {
  const response = await postTeacherEditProfile(data)
  return response
})

export const editTeacherProfileSlice = createSlice({
  name: 'Teacher',
  initialState,
  reducers: {
    reset: initialState,
    clearAllStateProfile: (state) => {
      state.status1 = null
      state.successMsg = null
      state.errorMsg = null
      state.editTeacher = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editTeacherProfileAsync.pending, (state) => {
        state.teacherProfileloading = true
      })
      .addCase(editTeacherProfileAsync.fulfilled, (state, action) => {
        state.status1 = 200
        state.teacherProfileloading = false
        state.editTeacher = action.payload
      })
      .addCase(editTeacherProfileAsync.rejected, (state, action) => {
        state.status1 = 500
        state.teacherProfileloading = false
        state.error1 = 'invalid credential'
      })
     
  },
})

export default editTeacherProfileSlice.reducer
export const {clearAllStateProfile} = editTeacherProfileSlice.actions
