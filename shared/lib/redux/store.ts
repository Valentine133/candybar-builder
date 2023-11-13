import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cart from './slices/cartSlice';
import modal from './slices/modalSlice';

export const store = configureStore({
  reducer: { 
    cart,
    modal,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch;