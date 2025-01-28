import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
    removeUserData: (state, action) => {
      state.userData = null;
    },
  },
});

export const { addUserData, removeUserData } = authSlice.actions;

export default authSlice.reducer;
