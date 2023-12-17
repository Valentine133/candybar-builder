import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCart,
  plusItem,
  minusItem,
  updateSelectedItemOptions,
} from '@/shared/lib/redux/slices/cartSlice';

export const QuantityControl = ({ uniqueCode }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const item = items.find((obj) => obj.uniqueCode === uniqueCode);

  const onClickPlus = (uniqueCode: string) => {
    dispatch(plusItem(uniqueCode));
  };

  const onClickMinus = (uniqueCode: string) => {
    const item = items.find((obj) => obj.uniqueCode === uniqueCode);
    if (item && item.count > 1) {
      dispatch(minusItem(uniqueCode));
    }
  };

  const handleChangeCount = (uniqueCode: string, value: string) => {
    const count = parseInt(value, 10);
    if (!isNaN(count)) {
      dispatch(updateSelectedItemOptions({ uniqueCode, count }));
    }
  };

  return (
    <div className="cart__item-count mt-auto relative flex flex-row w-[7rem] h-8 bg-transparent border border-gray-300 rounded-lg overflow-hidden">
      <button
        className="w-20 h-full text-gray-600 bg-white border-r rounded-l outline-none cursor-pointer dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-300"
        disabled={item.count === 1}
        onClick={() => onClickMinus(item.uniqueCode)}
      >
        <span className="m-auto text-2xl font-thin">-</span>
      </button>
      <input
        type="number"
        min="1"
        max="100"
        className="flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-white outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
        value={item.count || 1}
        onChange={(e) => handleChangeCount(item.uniqueCode, e.target.value)}
      />
      <button
        className="w-20 h-full text-gray-600 bg-white border-l rounded-r outline-none cursor-pointer dark:border-gray-700 hover:text-gray-700 hover:bg-gray-300"
        onClick={() => onClickPlus(item.uniqueCode)}
      >
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  );
};
