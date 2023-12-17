import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import { setLocalStorage, getLocalStorage } from '@/shared/utils/localStorage';
import { Product } from '@/shared/lib/types/product';
import isEqual from 'lodash/isEqual';

interface CartSliceState {
  totalPrice: number;
  items: Product[];
}

interface UpdateSelectedItemOptionsPayload {
  id: string;
  uniqueCode: string;
  selectedOption: string;
  count?: number;
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
      const { id, selectedOption, ...items } = action.payload;
      const findItem = state.items.find((obj) => obj.id === id);

      if (findItem && isEqual(findItem.selectedOption, selectedOption)) {
        findItem.count++;
      } else {
        state.items.push({ id, selectedOption, ...items });
      }

      setLocalStorage('cart', state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    plusItem(state, action: PayloadAction<Product>) {
      const findItem = state.items.find((obj) => obj.uniqueCode === action.payload);

      if (findItem) {
         findItem.count++;

        setLocalStorage('cart', state.items);
        state.totalPrice = calcTotalPrice(state.items);
      }
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.uniqueCode === action.payload);

      if (findItem) {
        findItem.count--;
        if (findItem.count === 0) {
          state.items = state.items.filter((obj) => obj.uniqueCode !== action.payload);
        }

        setLocalStorage('cart', state.items);
        state.totalPrice = calcTotalPrice(state.items);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.uniqueCode !== action.payload);

      setLocalStorage('cart', state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
    clearItems(state) {
      state.items = [];

      // Clear the cart data from local storage
      setLocalStorage('cart', []);
      state.totalPrice = 0;
    },
    updateSelectedItemOptions: (state, action: PayloadAction<UpdateSelectedItemOptionsPayload>) => {
      const { id, uniqueCode, selectedOption, count } = action.payload;
      const selectedItem = state.items.find((item) => item.id === id && isEqual(item.selectedOption, selectedOption));

      state.items = state.items.map((item) => {
        if (item.id === id && item.uniqueCode === uniqueCode) {
          return {
            ...item,
            selectedOption,
            count: count !== undefined ? count : item.count,
          };
        } else if (selectedItem) {
          selectedItem.count = count !== undefined ? count : selectedItem.count;
          // selectedItem.selectedOption = selectedOption;

          // if (count !== undefined) {
          //   selectedItem.count = count;
          // }
        }
        return item;
      });

      setLocalStorage('cart', state.items);
      state.totalPrice = calcTotalPrice(state.items);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
export const selectCartMatchingItem = (id, selectedOption) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id && isEqual(item.selectedOption, selectedOption));
export const calculateTotalQuantityById = (id: string) => (state: RootState) => {
  return state.cart.items.reduce((totalQuantity, item) => {
    if (item.id === id) {
      totalQuantity += item.count || 0;
    }
    return totalQuantity;
  }, 0);
};

export const { addItem, removeItem, plusItem, minusItem, clearItems, updateSelectedItemOptions } = cartSlice.actions;

export default cartSlice.reducer;
