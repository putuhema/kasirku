import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
  categoryId: number;
  imgUrl: string;
}

export interface ProductItem {
  id: number;
  product: Product;
  qty: number;
}

interface cartState {
  cart: ProductItem[];
}
const initialState: cartState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductItem>) => {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.cart = state.cart.filter((c) => c.id !== id);
    },
    plusQty: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].qty += 1;
      }
    },
    minQty: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].qty -= 1;
        if (state.cart[existingItemIndex].qty === 0) {
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
    changeQty: (state, action: PayloadAction<{ id: number; qty: number }>) => {
      const { id, qty } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.qty = qty;
      }
    },
    emptyCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addProduct,
  minQty,
  plusQty,
  deleteProduct,
  changeQty,
  emptyCart,
} = cartSlice.actions;
export const cartSelector = (state: RootState) => state.cartReducer;
export default cartSlice.reducer;
