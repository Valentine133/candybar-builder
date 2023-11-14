import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';
import { Product } from '@/shared/lib/types/product';

interface CartSliceState {
  totalPrice: number;
  items: Product[];
}

// Load cart data from local storage
const storedCart: Product[] = getLocalStorage('cart') || [];
const initialState: CartSliceState = {
  totalPrice: calcTotalPrice(storedCart),
  items: storedCart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Product>) {
      const { id, title, price, imgUrl, description, productImages } = action.payload;
      const findItem = state.items.find((obj) => obj.id === id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ id, title, price, imgUrl, description, count: 1, productImages });
      }

      // Save the updated cart data to local storage
      setLocalStorage('cart', state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
        if (findItem.count === 0) {
          // Remove the item from the cart if count becomes 0
          state.items = state.items.filter((obj) => obj.id !== action.payload);
        }

        // Save the updated cart data to local storage
        setLocalStorage('cart', state.items);
        state.totalPrice = calcTotalPrice(state.items);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      // Save the updated cart data to local storage
      setLocalStorage('cart', state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];

      // Clear the cart data from local storage
      setLocalStorage('cart', []);
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
