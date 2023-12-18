"use client"

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart, clearItems } from '@/shared/lib/redux/slices/cartSlice';
import { CartItem } from '@/entities/cartItem';
import { setLocalStorage } from '@/shared/utils/localStorage';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import Link from 'next/link';

export const CartPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const total = calcTotalPrice(items);

  useEffect(() => {
    setLocalStorage('cart', items);
  }, [items]);

  const handleClearItems = () => {
    dispatch(clearItems());
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold text-center mb-10">
          Shopping Cart
        </h1>
        <div className="flex flex-col items-center justify-center px-2 py-4">
          <p className="text-xl font-semibold mb-2">Cart is empty.</p>
          <p>Add items to your cart</p>
          <Button as={Link} href="/catalog" style="primary" customClass="mt-6">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-center mb-10">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-5 gap-4 lg:gap-20">
        <div className="col-span-5 md:col-span-3">
          {items?.map((item) => <CartItem item={item} />)}
          <div className="mt-6">
            <Button style="default" onClick={handleClearItems} customClass="">
              Clear Cart
            </Button>
          </div>
        </div>
        <div className="col-span-5 md:col-span-2">
          <div className="bg-white card-shadow p-4">
            <h3 className="text-xl font-semibold text-center mb-4">
              Order Summary
            </h3>
            <div className="cart__total flex justify-between p-2">
              <h4 className="font-semibold text-gray-500">Price</h4>
              <div className="font-medium text-lg">
                ${total.toFixed(2)}
              </div>
            </div>
            <div className="cart__total flex justify-between p-2">
              <h4 className="font-semibold text-gray-500">Delivery</h4>
              <div className="font-medium text-lg text-green-500">
                Free
              </div>
            </div>
            <div className="cart__total flex justify-between p-2">
              <h4 className="font-bold">Total</h4>
              <div className="font-medium text-xl text-red-500">
                ${total.toFixed(2)}
              </div>
            </div>
            <Button as="button" style="primary" customClass="w-full">
              Place order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
