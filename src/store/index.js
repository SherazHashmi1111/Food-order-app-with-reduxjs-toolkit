import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], totalAmount: 0 },
  reducers: {
    addItem: (state, action) => {
      const updatedTotalAmount =
        state.totalAmount + action.payload.price * action.payload.amount;

      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.payload.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload);
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    },
    removeItem: (state, action) => {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.payload);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    },
    clearCart: (state) => {
      return { items: state.items, totalAmount: state.totalAmount };
    },
  },
});

const visibilitySlice = createSlice({
  name: "visibility",
  initialState: { showCart: false },
  reducers: {
    showCart: (state) => {
      state.showCart = true;
    },
    hideCart: (state) => {
      state.showCart = false;
    },
  },
});
export const visibilityActions = visibilitySlice.actions;
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    visibility: visibilitySlice.reducer,
  },
});
export const cartActions = cartSlice.actions;
export default store;
