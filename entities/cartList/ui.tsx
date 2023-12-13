'use client'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  addItem,
  minusItem,
  removeItem,
  clearItems,
  updateSelectedItemOptions,
} from '@/shared/lib/redux/slices/cartSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import Link from 'next/link';

import { HiOutlineTrash } from 'react-icons/hi';
import { getLocalStorage, setLocalStorage } from '@/shared/utils/localStorage';

export const CartList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);

  const total = calcTotalPrice(items);

  useEffect(() => {
    setLocalStorage('cart', items);
  }, [items]);

  const onClickPlus = (id: string) => {
    dispatch(addItem({ id }));
  };

  const onClickMinus = (id: string) => {
    const item = items.find((obj) => obj.id === id);
    if (item && item.count > 1) {
      dispatch(minusItem(id));
    }
  };

  const handleRemoveItem = (id: string) => {
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
      <div className="cart__list overflow-y-auto">
        {items?.map((item) => (
          <div
            key={item.id}
            className="cart__item p-2 flex bg-white border-b border-gray-100"
          >
            <div className="cart__item--image pr-2 w-32">
              <Link href="#">
                <img
                  className="rounded-lg object-cover aspect-square"
                  src={item?.thumbnail?.data?.attributes.url}
                  alt={item.title}
                />
              </Link>
            </div>
            <div className="cart__item--body flex justify-between w-full">
              <div className="cart__item--title flex flex-col w-full text-sm">
                <div className="font-bold">
                  <Link href="#">{item.title}</Link>
                </div>
                <div className="options">
                  {item?.options &&
                    Object.entries(item.options).map(
                      ([optionKey, optionValue]) => {
                        if (optionKey === 'id') {
                          return null;
                        }

                        const selectedValues = Object.entries(
                          item.selectedOption,
                        ).map(
                          ([selectedOptionKey, selectedOptionValue]) =>
                            selectedOptionValue,
                        );

                        console.log(selectedValues);

                        return (
                          optionValue != null && (
                            <div key={optionKey} className="option mb-1">
                              {/* Nested level */}
                              <label className="mb-1 mr-2 font-medium text-gray-500">
                                {optionValue?.title}:
                              </label>
                              {Object.entries(optionValue).map(
                                ([nestedKey, nestedValue]) =>
                                  Array.isArray(nestedValue) && (
                                    <select
                                      key={nestedKey}
                                      className="nested-option cursor-pointer"
                                      onChange={(e) => {
                                        const selectedOption = {
                                          ...item.selectedOption,
                                          [nestedKey]: e.target.selectedIndex,
                                        };
                                        dispatch(
                                          updateSelectedItemOptions({
                                            id: item.id,
                                            selectedOption,
                                          }),
                                        );
                                      }}
                                    >
                                      {nestedValue.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.name}
                                          selected={selectedValues.includes(i)}
                                        >
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  ),
                              )}
                            </div>
                          )
                        );
                      },
                    )}
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
                    placeholder={item.count.toString()}
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
      </div>
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
