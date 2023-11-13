import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart } from '@/shared/lib/redux/slices/cartSlice';
import { toggleModal } from '@/shared/lib/redux/slices/modalSlice';
import { PiShoppingCartSimple } from 'react-icons/pi';

export const ShopBag = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);

  const totalItemCount = items.reduce((total, item) => total + item.count, 0);

  const handleToogleCartModal = () => {
    dispatch(toggleModal());
  };

  return (
    <div className="flex items-center relative md:order-2">
      <button
        type="button"
        className="relative flex mr-3"
        onClick={handleToogleCartModal}
      >
        <div className="top-0 absolute left-5 z-10">
          <p className="flex h-1 w-1 items-center justify-center rounded-full bg-red-500 p-2.5 text-xs text-white">
            {totalItemCount}
          </p>
        </div>
        <PiShoppingCartSimple
          size="40"
          className="hover:scale-110 z-0 transition"
        />
      </button>
    </div>
  );
};
