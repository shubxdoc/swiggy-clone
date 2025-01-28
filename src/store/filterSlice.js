import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterValue: null,
};

export const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    setFilterValue: (state, action) => {
      state.filterValue = action.payload;
    },
  },
});

export const { setFilterValue } = filterSlice.actions;

export default filterSlice.reducer;
