import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resInfo: JSON.parse(localStorage.getItem("resData")) || "",
  cartData: JSON.parse(localStorage.getItem("carItemInfo")) || [],
  modalState: {
    isOpen: false,
    modalItem: null,
    modalRestaurant: null,
  },
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { info, restaurantInfo } = action.payload;

      if (state.resInfo && state.resInfo.id !== restaurantInfo.id) {
        state.modalState = {
          isOpen: true,
          modalItem: info,
          modalRestaurant: restaurantInfo,
        };
        return;
      }

      const itemAdded = state.cartData.find((data) => data.id == info.id);

      if (itemAdded) {
        console.log(info.id, "exists");
        return;
      }

      state.resInfo = restaurantInfo;
      state.cartData = [...state.cartData, info];
    },
    clearCart: (state) => {
      state.cartData = [];
      state.resInfo = "";
    },
    removeFromCart: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload
      );

      if (state.cartData.length === 0) {
        state.resInfo = "";
      }
    },
    confirmAddToCart: (state) => {
      const { modalItem, modalRestaurant } = state.modalState;

      state.cartData = [modalItem];
      state.resInfo = modalRestaurant;
      state.modalState = {
        isOpen: false,
        modalItem: null,
        modalRestaurant: null,
      };
    },
    closeModal: (state) => {
      state.modalState = {
        isOpen: false,
        modalItem: null,
        modalRestaurant: null,
      };
    },
  },
});

export const selectTotalPrice = (state) => {
  return state.cartSlice.cartData.reduce(
    (acc, val) => acc + (val.defaultPrice || val.price),
    0
  );
};

export const {
  addToCart,
  removeFromCart,
  clearCart,
  confirmAddToCart,
  closeModal,
} = cartSlice.actions;

export default cartSlice.reducer;
