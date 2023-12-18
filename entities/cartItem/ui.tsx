import React from 'react';
import Link from 'next/link';

import { useDispatch } from 'react-redux';
import { removeItem } from '@/shared/lib/redux/slices/cartSlice';
import {
  updateSelectedItemOptions,
} from '@/shared/lib/redux/slices/cartSlice';

import { QuantityControl } from '@/features/quantityControl';
import { generateUniqueCode } from '@/shared/utils/generateUniqueCode';

import { HiOutlineTrash } from 'react-icons/hi';

export const CartItem = ({item}) => {
  const dispatch = useDispatch();

  const productLink = item?.categories
    ? `/catalog/${item.categories.data[0].attributes.slug}/${item?.slug}`
    : '#';

  const handleRemoveItem = (uniqueCode: string) => {
    dispatch(removeItem(uniqueCode));
  };

  return (
    <div
      key={item.uniqueCode}
      className="cart__item p-2 flex bg-white border-b border-gray-100"
    >
      <div className="cart__item--image pr-2 w-32">
        <Link href={productLink}>
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
            <Link href={productLink}>{item.title}</Link>
          </div>
          <div className="options">
            {item?.options &&
              Object.entries(item.options).map(([optionKey, optionValue]) => {
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
              })}
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
  );
}
