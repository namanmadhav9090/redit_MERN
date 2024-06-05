import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "utilsData",
  initialState: {
   loading:false,
   message: '',
   alert: false
  },
  reducers: {
    requestSent: (state) => {
         state.loading = true;
    },
    requestFailed: (state) => {
          state.loading = false;
    },
    responseReceived: (state) => {
          state.loading = false;
    },
    successAlert: (state, action) => {
          state.alert = true;
          state.message = action.payload
    }
  },
});

export const {
   requestSent,
   requestFailed,
   responseReceived,
   successAlert
} = utilSlice.actions;

export default utilSlice.reducer;