import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coordinates: JSON.parse(localStorage.getItem("coordinates")) || {
    lat: "18.9690247",
    lng: "72.8205292",
  },
};

export const coordinateSlice = createSlice({
  name: "coordinateSlice",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      const { lat, lng } = action.payload;
      state.coordinates = {
        lat: lat,
        lng: lng,
      };
    },
  },
});

export const { setCoordinates } = coordinateSlice.actions;

export default coordinateSlice.reducer;
