'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  removeItem,
  clearItems,
} from '@/shared/lib/redux/slices/cartSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';

import { HiOutlineTrash } from 'react-icons/hi';

export const CartList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);

  const total = calcTotalPrice(items);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

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
      {items?.map((item) => (
        <div
          key={item.id}
          className="cart__item p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
        >
          <div className="cart__item--image pr-2 w-10">
            <img src={item.imgUrl} alt={item.title} />
          </div>
          <div className="cart__item--title flex-auto text-sm">
            <div className="font-bold">{item.title}</div>
            <div className="text-gray-400">Qt: {item.count}</div>
          </div>
          <div className="cart__item--price flex flex-col font-medium items-end">
            <div
              className="w-4 h-4 mb-6 hover:text-red-500 rounded-full cursor-pointer text-red-300"
              onClick={() => handleRemoveItem(item.id)}
            >
              <HiOutlineTrash size="20" />
            </div>
            ${item.price * item.count}
          </div>
        </div>
      ))}
      <div className="cart__total flex justify-between p-2">
        <h4 className="font-bold">Total</h4>
        <div className="font-medium text-red-500">${total.toFixed(2)}</div>
      </div>
      <div className="p-2 justify-center flex">
        <Button
          label="Checkout"
          href="#"
          as="button"
          customClass="min-w-full"
        />
      </div>
      <div className="p-2 justify-center flex">
        <Button
          label="Clear Cart"
          style="default"
          onClick={handleClearItems}
          customClass="min-w-full"
        />
      </div>
    </div>
  );
};
