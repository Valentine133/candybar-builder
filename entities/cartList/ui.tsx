'use client'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  removeItem,
  clearItems,
  updateSelectedItemOptions,
} from '@/shared/lib/redux/slices/cartSlice';
import { Button } from '@/shared/ui/buttons/simple-btn';
import { QuantityControl } from '@/features/quantityControl';
import { calcTotalPrice } from '@/shared/utils/calcTotalPrice';
import { generateUniqueCode } from '@/shared/utils/generateUniqueCode';
import Link from 'next/link';

import { HiOutlineTrash } from 'react-icons/hi';
import { setLocalStorage } from '@/shared/utils/localStorage';

export const CartList = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  // console.log(items);
  const total = calcTotalPrice(items);  

  useEffect(() => {
    setLocalStorage('cart', items);
  }, [items]);

  const handleRemoveItem = (uniqueCode: string) => {
    dispatch(removeItem(uniqueCode));
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
            key={item.uniqueCode}
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

                        const selectedValues = item.selectedOption
                          ? Object.entries(item.selectedOption).map(
                              ([selectedOptionKey, selectedOptionValue]) =>
                                selectedOptionValue,
                            )
                          : [];

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
                                      key={generateUniqueCode()}
                                      className="nested-option cursor-pointer"
                                      onChange={(e) => {
                                        const selectedOption = {
                                          ...item.selectedOption,
                                          [nestedKey]: e.target.selectedIndex,
                                        };
                                        dispatch(
                                          updateSelectedItemOptions({
                                            id: item.id,
                                            uniqueCode: item.uniqueCode,
                                            selectedOption,
                                          }),
                                        );
                                      }}
                                    >
                                      {nestedValue.map((item, i) => (
                                        <option
                                          key={item.id}
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
                <QuantityControl uniqueCode={item.uniqueCode} />
              </div>
              <div className="cart__item--price flex flex-col font-medium items-end">
                <div
                  className="w-4 h-4 mb-6 hover:text-red-500 rounded-full cursor-pointer text-red-300"
                  onClick={() => handleRemoveItem(item.uniqueCode)}
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
