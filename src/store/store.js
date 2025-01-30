import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import coordinateReducer from "./coordinateSlice";
import filterReducer from "./filterSlice";
import authReducer from "./authSlice";
import searchReducer from "./searchSlice";

const syncToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);

  if (action.type.startsWith("cartSlice/")) {
    const state = store.getState().cartSlice;
    localStorage.setItem("carItemInfo", JSON.stringify(state.cartData));
    localStorage.setItem("resData", JSON.stringify(state.resInfo));
  }

  if (action.type.startsWith("coordinateSlice/")) {
    const { coordinates } = store.getState().coordinateSlice;
    localStorage.setItem("coordinates", JSON.stringify(coordinates));
  }

  if (action.type.startsWith("authSlice/")) {
    const { userData } = store.getState().authSlice;
    localStorage.setItem("userData", JSON.stringify(userData));
  }

  return result;
};

export const store = configureStore({
  reducer: {
    cartSlice: cartReducer,
    coordinateSlice: coordinateReducer,
    filterSlice: filterReducer,
    authSlice: authReducer,
    searchSlice: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(syncToLocalStorage), // we are adding syncToLocalStorage to default middlewares (which we got by getDefaultMiddleware) provided by redux
});
