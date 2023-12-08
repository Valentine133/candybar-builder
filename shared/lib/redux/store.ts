import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cart from './slices/cartSlice';
import modal from './slices/modalSlice';
import filter from './slices/filterSlice';

export const store = configureStore({
  reducer: { 
    cart,
    modal,
    filter,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;