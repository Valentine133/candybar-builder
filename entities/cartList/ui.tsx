'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  addItem, 
  minusItem,
  removeItem,
  clearItems,
} from '@/shared/lib/redux/slices/cartSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import Link from 'next/link';

import { HiOutlineTrash } from 'react-icons/hi';

export const CartList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);

  const total = calcTotalPrice(items);

  const onClickPlus = (id) => {
    dispatch(addItem({ id })); // Pass the item id as a payload
  };

  const onClickMinus = (id) => {
    const item = items.find((obj) => obj.id === id);
    if (item && item.count > 1) {
      dispatch(minusItem(id)); // Pass the item id as a payload
    }
  };

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
          className="cart__item p-2 flex bg-white border-b border-gray-100"
        >
          <div className="cart__item--image pr-2 w-32">
            <Link href="#">
              <img src={item.imgUrl} alt={item.title} />
            </Link>
          </div>
          <div className="cart__item--body flex justify-between w-full">
            <div className="cart__item--title flex flex-col w-full text-sm">
              <div className="font-bold">
                <Link href="#">{item.title}</Link>
              </div>
              <div className="cart__item-count mt-auto relative flex flex-row w-[7rem] h-8 bg-transparent border border-gray-300 rounded-lg overflow-hidden">
                <button
                  className="w-20 h-full text-gray-600 bg-white border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300"
                  disabled={item.count === 1}
                  onClick={() => onClickMinus(item.id)}
                >
                  <span className="m-auto text-2xl font-thin">-</span>
                </button>
                <input
                  type="number"
                  max="100"
                  className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-white outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                  placeholder={item.count}
                />
                <button
                  className="w-20 h-full text-gray-600 bg-white border-l rounded-r outline-none cursor-pointer dark:border-gray-700 hover:text-gray-700 hover:bg-gray-300"
                  onClick={() => onClickPlus(item.id)}
                >
                  <span className="m-auto text-2xl font-thin">+</span>
                </button>
              </div>
            </div>
            <div className="cart__item--price flex flex-col font-medium items-end">
              <div
                className="w-4 h-4 mb-6 hover:text-red-500 rounded-full cursor-pointer text-red-300"
                onClick={() => handleRemoveItem(item.id)}
              >
                <HiOutlineTrash size="20" />
              </div>
              <span className="mt-auto">${item.price * item.count}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="cart__total flex justify-between p-2">
        <h4 className="font-bold">Total</h4>
        <div className="font-medium text-xl text-red-500">
          ${total.toFixed(2)}
        </div>
      </div>
      <div className="p-2 justify-center flex">
        <Button href="/checkout" as={Link} customClass="min-w-full">
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
