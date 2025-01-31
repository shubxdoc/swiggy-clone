import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRestaurantsData, fetchMenuData } from "../services/api";

export const getRestaurantsData = createAsyncThunk(
  "restaurant/fetchRestaurants",
  async ({ lat, lng }, { rejectWithValue }) => {
    try {
      const data = await fetchRestaurantsData(lat, lng);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMenuData = createAsyncThunk(
  "restaurant/fetchMenu",
  async ({ restaurantId, lat, lng }, { rejectWithValue }) => {
    try {
      const data = await fetchMenuData(restaurantId, lat, lng);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  onYourMindData: [],
  topRestaurantsData: [],
  restaurantsWithOnlineDeliveryData: [],
  onYourMindTitle: "",
  topResTitle: "",
  onlineResTitle: "",
  serviceAvailability: "",

  menuData: [],
  restaurantInfo: {},
  discountData: [],

  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  menuStatus: "idle",
  error: null,
};

const restaurantSlice = createSlice({
  name: "restaurantSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRestaurantsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(getRestaurantsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getMenuData.pending, (state) => {
        state.menuStatus = "loading";
      })
      .addCase(getMenuData.fulfilled, (state, action) => {
        state.menuStatus = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(getMenuData.rejected, (state, action) => {
        state.menuStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;
