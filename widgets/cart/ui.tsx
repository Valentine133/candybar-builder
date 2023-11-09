import React from 'react';

import { CartList } from '@/entities/cartList';

export const Cart = () => {
  return (
    <div className="w-full max-w-sm overflow-hidden flex flex-col bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
     <CartList/>
    </div>
  );
}
