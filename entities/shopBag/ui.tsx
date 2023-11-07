import React, { useCallback, useState } from 'react';
import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from '@/shared/lib/redux/slices/cartSlice';

import { CartList } from '@/entities/cartList';
import { DropdownMenu } from '@/shared/ui/dropDownMenu';

import { PiShoppingCartSimple } from 'react-icons/pi';

export const ShopBag = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectCart);
  const [showCardBag, setShowCardBag] = useState(false);

  const totalItemCount = items.reduce((total, item) => total + item.count, 0);

  const toggleCardBag = useCallback(() => {
    setShowCardBag(!showCardBag);
  }, [showCardBag]);

  return (
    <div className="flex items-center relative md:order-2">
      <button
        type="button"
        className="relative flex mr-3"
        onClick={toggleCardBag}
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

      <DropdownMenu
        visible={showCardBag}
        onClose={() => setShowCardBag(false)}
        position="center"
      >
        <CartList />
      </DropdownMenu>
    </div>
  );
};
