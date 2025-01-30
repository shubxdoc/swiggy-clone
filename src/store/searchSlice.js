import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  similarResDish: {
    isSimilarResDishes: false,
    city: "",
    resLocation: "",
    resId: "",
    itemId: "",
  },
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    toggleSimilarResDishes: (state) => {
      state.similarResDish.isSimilarResDishes =
        !state.similarResDish.isSimilarResDishes;
    },
    setSimilarResDish: (state, action) => {
      state.similarResDish = action.payload;
    },
    resetSimilarResDish: (state) => {
      state.similarResDish = {
        isSimilarResDishes: false,
        city: "",
        resLocation: "",
        resId: "",
        itemId: "",
      };
    },
  },
});

export const {
  toggleSimilarResDishes,
  setSimilarResDish,
  resetSimilarResDish,
} = searchSlice.actions;

export default searchSlice.reducer;
