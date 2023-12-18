'use client'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  clearItems,
} from '@/shared/lib/redux/slices/cartSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { CartItem } from '@/entities/cartItem';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import Link from 'next/link';
import { setLocalStorage } from '@/shared/utils/localStorage';

export const CartList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  // console.log(items);
  const total = calcTotalPrice(items);  

  useEffect(() => {
    setLocalStorage('cart', items);
  }, [items]);

  const handleClearItems = () => {
    dispatch(clearItems());
  };

  if (items.length === 0) {
    return (
      <div className="px-2 py-4">
        <p className="text-xl font-semibold mb-2">Cart is empty.</p>
        <p>Add items to your cart</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__list overflow-y-auto">
        {items?.map((item) => (
         <CartItem item={item}/>
        ))}
      </div>
      <div className="cart__total flex justify-between p-2">
        <h4 className="font-bold">Total</h4>
        <div className="font-medium text-xl text-red-500">
          ${total.toFixed(2)}
        </div>
      </div>
      <div className="p-2 justify-center flex">
        <Button href="/cart" as={Link} customClass="min-w-full">
          Checkout
        </Button>
      </div>
      <div className="p-2 justify-center flex">
        <Button
          style="default"
          onClick={handleClearItems}
          customClass="min-w-full"
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
};
